using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serenity.Data;
using Serenity.Services;
using QadeerApp.Administration;
using SD = Serenity.Data.SqlMapper;
using DD = Dapper.SqlMapper;
using MyRow = QadeerApp.Administration.TrainingGradeRow;

namespace QadeerApp.Administration.Endpoints;

[Route("Services/Administration/TrainingGrade/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class TrainingGradeEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request, [FromServices] ITrainingGradeSaveHandler handler)
    {
        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request, [FromServices] ITrainingGradeSaveHandler handler)
    {
        return handler.Update(uow, request);
    }

    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request, [FromServices] ITrainingGradeDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request, [FromServices] ITrainingGradeRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request, [FromServices] ITrainingGradeListHandler handler)
    {
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeCreate(typeof(MyRow)), IgnoreAntiforgeryToken]
    public TrainingGradeImportResponse Import(IUnitOfWork uow, [FromForm] TrainingGradeImportRequest request, [FromServices] ITrainingGradeSaveHandler saveHandler)
    {
        if (request?.File == null || request.File.Length == 0)
            throw new ValidationError("NoFile", "file", "No CSV file was provided.");

        var response = new TrainingGradeImportResponse();
        using var reader = new StreamReader(request.File.OpenReadStream(), Encoding.UTF8);
        var fileText = reader.ReadToEnd();

        if (string.IsNullOrWhiteSpace(fileText))
            throw new ValidationError("EmptyFile", "file", "The file is empty.");

        var lines = fileText.Split(new[] { "\r\n", "\n" }, StringSplitOptions.None)
            .Where(x => x != null)
            .ToList();

        if (lines.Count == 0)
            throw new ValidationError("HeaderMissing", "file", "Header row is missing.");

        var headerLine = lines[0];
        if (string.IsNullOrWhiteSpace(headerLine))
            throw new ValidationError("HeaderMissing", "file", "Header row is missing.");

        var dataLines = lines.Skip(1).Where(l => !string.IsNullOrWhiteSpace(l)).ToList();
        response.TotalRecords = dataLines.Count;

        var delimiter = DetectDelimiter(headerLine);
        var headers = ParseCsvLine(headerLine, delimiter);
        var headerMap = BuildHeaderIndex(headers);

        var missingHeaders = RequiredHeaders.Where(h => !headerMap.ContainsKey(h)).ToList();
        if (missingHeaders.Count > 0)
            throw new ValidationError("MissingColumns", "file", $"Required columns: {string.Join(", ", missingHeaders)}");

        var firstTerm = dataLines.Select(line => ParseCsvLine(line, delimiter))
            .Select(cells => GetValue(cells, headerMap, HeaderTrainingTerm))
            .FirstOrDefault(x => !string.IsNullOrWhiteSpace(x));

        if (string.IsNullOrWhiteSpace(firstTerm))
            throw new ValidationError("MissingTrainingTerm", "TrainingTerm", "لم يتم العثور على قيمة الفصل التدريبي في الملف.");

        var fld = MyRow.Fields;
        if (uow.Connection.Exists<MyRow>(fld.TrainingTerm == firstTerm))
        {
            response.AlreadyImported = true;
            response.Message = $"تم تحميل درجات الفصل التدريبي ({firstTerm}) سابقاً، لن يتم التحميل.";
            return response;
        }

        var courseByCode = SD.Query<CourseCodeDept>(uow.Connection, @"
                select c.Code, d.Name as DepartmentName
                from TrainingCourses c
                left join Departments d on d.DepartmentId = c.DepartmentId
                where c.Code is not null")
            .Where(x => !string.IsNullOrWhiteSpace(x.Code))
            .GroupBy(x => x.Code!.Trim().ToLowerInvariant())
            .ToDictionary(g => g.Key, g => g.First());

        foreach (var line in dataLines)
        {
            var cells = ParseCsvLine(line, delimiter);
            var row = new MyRow
            {
                Grade = GetValue(cells, headerMap, HeaderGrade),
                TrainerName = GetValue(cells, headerMap, HeaderTrainerName),
                TrainerNumber = GetValue(cells, headerMap, HeaderTrainerNumber),
                ReferenceNumber = GetValue(cells, headerMap, HeaderReferenceNumber),
                ScheduleType = GetValue(cells, headerMap, HeaderScheduleType),
                CourseName = GetValue(cells, headerMap, HeaderCourseName),
                CourseCode = GetValue(cells, headerMap, HeaderCourseCode),
                Specialization = GetValue(cells, headerMap, HeaderSpecialization),
                Department = GetValue(cells, headerMap, HeaderDepartment),
                TrainingLevel = GetValue(cells, headerMap, HeaderTrainingLevel),
                TrainingTerm = GetValue(cells, headerMap, HeaderTrainingTerm),
                IsActive = 1
            };

            if (!string.IsNullOrWhiteSpace(row.CourseCode))
            {
                var normalizedCode = row.CourseCode.Trim().ToLowerInvariant();
                if (courseByCode.TryGetValue(normalizedCode, out var course))
                {
                    if (!string.IsNullOrWhiteSpace(course.DepartmentName) &&
                        string.Equals(course.DepartmentName.Trim(), "الدراسات العامة", StringComparison.OrdinalIgnoreCase))
                    {
                        row.Department = course.DepartmentName;
                        row.Specialization = null;
                    }
                }
            }

            try
            {
                saveHandler.Create(uow, new SaveRequest<MyRow>
                {
                    Entity = row
                });
                response.Inserted++;
            }
            catch (Exception ex)
            {
                response.Failed++;
                if (response.Errors.Count < 20)
                    response.Errors.Add($"Row {response.Inserted + response.Failed}: {ex.Message}");
            }
        }

        response.Message = $"تم تحميل درجات الفصل التدريبي ({firstTerm}) بنجاح.";
        return response;
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public BulkStatusResponse BulkUpdateStatus(IUnitOfWork uow, BulkStatusRequest request)
    {
        if (request == null || string.IsNullOrWhiteSpace(request.TrainingTerm))
            throw new ValidationError("TrainingTermRequired", "TrainingTerm", "Training term is required.");

        var fld = MyRow.Fields;
        var rows = uow.Connection.List<MyRow>(q => q
            .SelectTableFields()
            .Where(fld.TrainingTerm == request.TrainingTerm));

        foreach (var row in rows)
        {
            row.IsActive = request.IsActive ? (short)1 : (short)0;
            uow.Connection.UpdateById(row);
        }

        return new BulkStatusResponse
        {
            Updated = rows.Count
        };
    }

    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public BulkDeleteResponse BulkDeleteByTerm(IUnitOfWork uow, BulkStatusRequest request)
    {
        if (request == null || string.IsNullOrWhiteSpace(request.TrainingTerm))
            throw new ValidationError("TrainingTermRequired", "TrainingTerm", "Training term is required.");

        const string sql = "delete from TrainingGrades where TrainingTerm = @Term";
        var deleted = DD.Execute(uow.Connection, sql, new { Term = request.TrainingTerm });

        return new BulkDeleteResponse
        {
            Deleted = deleted
        };
    }

    [HttpPost, HttpGet, AuthorizeList(typeof(MyRow))]
    public TrainingTermListResponse ListTerms(IDbConnection connection, ServiceRequest request)
    {
        const string hasActiveSql = @"
            select count(*) 
            from INFORMATION_SCHEMA.COLUMNS 
            where TABLE_NAME = 'TrainingGrades' and COLUMN_NAME = 'IsActive'";

        var hasIsActive = SD.Query<int>(connection, hasActiveSql).FirstOrDefault() > 0;

        var sql = hasIsActive
            ? @"
                select
                    TrainingTerm,
                    count(1) as Total,
                    sum(case when IsActive = 1 then 1 else 0 end) as ActiveCount
                from TrainingGrades
                where TrainingTerm is not null
                group by TrainingTerm
                order by TrainingTerm"
            : @"
                select
                    TrainingTerm,
                    count(1) as Total,
                    cast(0 as int) as ActiveCount
                from TrainingGrades
                where TrainingTerm is not null
                group by TrainingTerm
                order by TrainingTerm";

        var terms = SD.Query<TrainingTermSummary>(connection, sql).ToList();
        return new TrainingTermListResponse
        {
            Terms = terms
        };
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public TrainingGradePivotResponse PivotData(IDbConnection connection, TrainingGradePivotRequest request)
    {
        var fld = MyRow.Fields;
        var query = new SqlQuery()
            .From(fld)
            .Select(fld.Grade)
            .Select(fld.TrainingTerm)
            .Select(fld.Department)
            .Select(fld.Specialization)
            .Select(fld.CourseName)
            .Select(fld.CourseCode)
            .Select(fld.ScheduleType)
            .Select(fld.TrainerName)
            .Select(fld.TrainingLevel)
            .Select(fld.IsActive);

        if (!string.IsNullOrWhiteSpace(request?.TrainingTerm))
            query.Where(fld.TrainingTerm == request.TrainingTerm);

        if (request?.IsActive != null)
            query.Where(fld.IsActive == (request.IsActive.Value ? 1 : 0));

        var rows = connection.Query<TrainingGradePivotRow>(query).ToList();

        return new TrainingGradePivotResponse
        {
            Items = rows
        };
    }

    private static Dictionary<string, int> BuildHeaderIndex(IList<string> headers)
    {
        var map = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);
        for (var i = 0; i < headers.Count; i++)
        {
            var key = headers[i]?.Trim();
            if (!string.IsNullOrEmpty(key) && !map.ContainsKey(key))
                map[key] = i;
        }
        return map;
    }

    private static string GetValue(IList<string> cells, Dictionary<string, int> map, string headerKey)
    {
        if (map.TryGetValue(headerKey, out var idx) && idx >= 0 && idx < cells.Count)
            return cells[idx]?.Trim();
        return null;
    }

    private static char DetectDelimiter(string line)
    {
        if (string.IsNullOrEmpty(line))
            return ',';

        var commaCount = line.Count(c => c == ',');
        var semicolonCount = line.Count(c => c == ';');
        return semicolonCount > commaCount ? ';' : ',';
    }

    private static List<string> ParseCsvLine(string line, char delimiter)
    {
        var result = new List<string>();
        if (line == null)
            return result;

        var current = new StringBuilder();
        var inQuotes = false;

        for (int i = 0; i < line.Length; i++)
        {
            var c = line[i];
            if (c == '"')
            {
                if (inQuotes && i + 1 < line.Length && line[i + 1] == '"')
                {
                    current.Append('"');
                    i++;
                }
                else
                {
                    inQuotes = !inQuotes;
                }
            }
            else if (c == delimiter && !inQuotes)
            {
                result.Add(current.ToString());
                current.Clear();
            }
            else
            {
                current.Append(c);
            }
        }
        result.Add(current.ToString());
        return result;
    }

    private const string HeaderGrade = "التقدير";
    private const string HeaderTrainerName = "اسم المدرب";
    private const string HeaderTrainerNumber = "رقم المدرب";
    private const string HeaderReferenceNumber = "الرقم المرجعي";
    private const string HeaderScheduleType = "نوع الجدولة";
    private const string HeaderCourseName = "اسم المقرر";
    private const string HeaderCourseCode = "المقرر";
    private const string HeaderSpecialization = "التخصص";
    private const string HeaderDepartment = "القسم";
    private const string HeaderTrainingLevel = "المستوى التدريبي";
    private const string HeaderTrainingTerm = "الفصل التدريبي";

    private static readonly string[] RequiredHeaders =
    {
        HeaderGrade,
        HeaderCourseName,
        HeaderCourseCode,
        HeaderDepartment,
        HeaderTrainingLevel,
        HeaderTrainingTerm
    };
}

public class TrainingGradeImportRequest : ServiceRequest
{
    public IFormFile File { get; set; }
}

public class TrainingGradeImportResponse : ServiceResponse
{
    public int Inserted { get; set; }
    public int Failed { get; set; }
    public int TotalRecords { get; set; }
    public List<string> Errors { get; set; } = new();
    public bool AlreadyImported { get; set; }
    public string Message { get; set; }
}

public class TrainingTermSummary
{
    public string TrainingTerm { get; set; }
    public int Total { get; set; }
    public int ActiveCount { get; set; }
}

public class TrainingTermListResponse : ServiceResponse
{
    public List<TrainingTermSummary> Terms { get; set; }
}

public class BulkDeleteResponse : ServiceResponse
{
    public int Deleted { get; set; }
}

public class CourseCodeDept
{
    public string Code { get; set; }
    public string DepartmentName { get; set; }
}
