using Serenity.Services;
using System.Collections.Generic;
using System.Linq;
using MyRow = QadeerApp.Administration.TrainingCourseFileRow;
using SqlMapper = Dapper.SqlMapper;

namespace QadeerApp.Administration.Endpoints;

[Route("Services/Administration/TrainingCourseFile/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class TrainingCourseFileEndpoint : ServiceEndpoint
{
    public class TrainingCourseFileSummaryResponse : ServiceResponse
    {
        public int Total { get; set; }
        public int Active { get; set; }
        public int Inactive { get; set; }
        public List<string> Terms { get; set; } = new();
    }

    public class CourseTrainerInfo
    {
        public int TrainerNumber { get; set; }
        public string TrainerName { get; set; }
    }

    public class CourseCoordinatorItem
    {
        public string CourseKey { get; set; }
        public string Course { get; set; }
        public string CourseDescription { get; set; }
        public string TrainingTerm { get; set; }
        public string TrainingUnit { get; set; }
        public string TrainingType { get; set; }
        public string Department { get; set; }
        public List<string> Departments { get; set; } = new();
        public int? ReferenceNumber { get; set; }
        public int? SelectedCoordinatorNumber { get; set; }
        public List<CourseTrainerInfo> Trainers { get; set; } = new();
    }

    public class CourseCoordinatorListResponse : ServiceResponse
    {
        public List<CourseCoordinatorItem> Items { get; set; } = new();
    }

    public class SetCoordinatorRequest : ServiceRequest
    {
        public string Course { get; set; }
        public string TrainingTerm { get; set; }
        public int TrainerNumber { get; set; }
    }

    private class CoordinatorSource
    {
        public string Course { get; set; }
        public string CourseDescription { get; set; }
        public string TrainingTerm { get; set; }
        public string TrainingUnit { get; set; }
        public string TrainingType { get; set; }
        public string Department { get; set; }
        public int? ReferenceNumber { get; set; }
        public int TrainerNumber { get; set; }
        public string TrainerName { get; set; }
        public string CourseCoordinator { get; set; }
    }

    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request, [FromServices] ITrainingCourseFileSaveHandler handler)
    {
        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request, [FromServices] ITrainingCourseFileSaveHandler handler)
    {
        return handler.Update(uow, request);
    }

    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request, [FromServices] ITrainingCourseFileDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request, [FromServices] ITrainingCourseFileRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request, [FromServices] ITrainingCourseFileListHandler handler)
    {
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public TrainingCourseFileSummaryResponse Summary(IDbConnection connection)
    {
        var rows = SqlMapper.Query<CoordinatorSource>(
            connection,
            @"select Course, CourseDescription, TrainingTerm, TrainingUnit, TrainingType, Department, ReferenceNumber,
                     TrainerNumber, TrainerName, CourseCoordinator
              from TrainingCourseFiles
              where IsActive = 1").ToList();

        var distinctKeys = rows
            .Select(BuildCourseKey)
            .Where(k => !string.IsNullOrWhiteSpace(k))
            .Distinct()
            .Count();

        var terms = rows
            .Select(x => x.TrainingTerm)
            .Where(x => !string.IsNullOrWhiteSpace(x))
            .Distinct()
            .OrderBy(x => x)
            .ToList();

        return new TrainingCourseFileSummaryResponse
        {
            Total = distinctKeys,
            Active = distinctKeys,
            Inactive = 0,
            Terms = terms
        };
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public CourseCoordinatorListResponse CourseCoordinators(IDbConnection connection)
    {
        var data = SqlMapper.Query<CoordinatorSource>(
            connection,
            @"select Course, CourseDescription, TrainingTerm, TrainingUnit, TrainingType, Department, ReferenceNumber,
                     TrainerNumber, TrainerName, CourseCoordinator
              from TrainingCourseFiles
              where IsActive = 1
              order by Course, TrainerName");

        var items = data
            .GroupBy(BuildCourseKey)
            .Select(g =>
            {
                var departments = g.Select(x => (x.Department ?? "").Trim())
                    .Where(x => !string.IsNullOrWhiteSpace(x))
                    .Distinct()
                    .ToList();

                if (!departments.Any())
                    departments.Add("قسم غير محدد");

                return new CourseCoordinatorItem
                {
                    CourseKey = g.Key,
                    Course = g.Select(x => (x.Course ?? "").Trim()).FirstOrDefault(x => !string.IsNullOrWhiteSpace(x)),
                    CourseDescription = g.Select(x => x.CourseDescription).FirstOrDefault(x => !string.IsNullOrWhiteSpace(x)),
                    TrainingTerm = string.Join(" | ", g.Select(x => x.TrainingTerm).Where(x => !string.IsNullOrWhiteSpace(x)).Distinct()),
                    TrainingUnit = g.Select(x => x.TrainingUnit).FirstOrDefault(x => !string.IsNullOrWhiteSpace(x)),
                    TrainingType = g.Select(x => x.TrainingType).FirstOrDefault(x => !string.IsNullOrWhiteSpace(x)),
                    Departments = departments,
                    Department = departments.FirstOrDefault() ?? "قسم غير محدد",
                    ReferenceNumber = g.Select(x => x.ReferenceNumber).FirstOrDefault(),
                    SelectedCoordinatorNumber = ParseCoordinator(g.Select(x => x.CourseCoordinator)),
                    Trainers = g.GroupBy(x => new { x.TrainerNumber, x.TrainerName })
                        .Select(t => new CourseTrainerInfo
                        {
                            TrainerNumber = t.Key.TrainerNumber,
                            TrainerName = t.Key.TrainerName
                        })
                        .OrderBy(t => t.TrainerName)
                        .ToList()
                };
            })
            .OrderBy(x => x.Course)
            .ToList();

        return new CourseCoordinatorListResponse { Items = items };
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow)), IgnoreAntiforgeryToken]
    public ServiceResponse ActivateAll(IUnitOfWork uow)
    {
        SqlMapper.Execute(uow.Connection, "update TrainingCourseFiles set IsActive = 1");
        return new ServiceResponse();
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow)), IgnoreAntiforgeryToken]
    public ServiceResponse DeactivateAll(IUnitOfWork uow)
    {
        SqlMapper.Execute(uow.Connection, "update TrainingCourseFiles set IsActive = 0");
        return new ServiceResponse();
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow)), IgnoreAntiforgeryToken]
    public ServiceResponse SetCoordinator(IUnitOfWork uow, SetCoordinatorRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Course))
            throw new ValidationError("CourseRequired", "Course is required.");

        if (request.TrainerNumber <= 0)
            throw new ValidationError("TrainerRequired", "A trainer selection is required.");

        var exists = SqlMapper.QueryFirstOrDefault<int>(
            uow.Connection,
            @"select top 1 1
              from TrainingCourseFiles
              where Course = @Course and TrainerNumber = @TrainerNumber" +
            (string.IsNullOrWhiteSpace(request.TrainingTerm) ? "" : " and TrainingTerm = @TrainingTerm"),
            request);

        if (exists != 1)
            throw new ValidationError("TrainerNotFound", "Trainer is not linked to this course.");

        var sql = @"update TrainingCourseFiles
                    set CourseCoordinator = @TrainerNumber
                    where Course = @Course";

        if (!string.IsNullOrWhiteSpace(request.TrainingTerm))
            sql += " and TrainingTerm = @TrainingTerm";

        SqlMapper.Execute(uow.Connection, sql, request);

        return new ServiceResponse();
    }

    private static int? ParseCoordinator(IEnumerable<string> values)
    {
        foreach (var value in values)
        {
            if (string.IsNullOrWhiteSpace(value))
                continue;

            if (int.TryParse(value.Trim(), out var number))
                return number;
        }

        return null;
    }

    private static string BuildCourseKey(CoordinatorSource x)
    {
        var course = (x.Course ?? "").Trim();
        return string.IsNullOrWhiteSpace(course)
            ? null
            : $"NAME#{course}";
    }
}
