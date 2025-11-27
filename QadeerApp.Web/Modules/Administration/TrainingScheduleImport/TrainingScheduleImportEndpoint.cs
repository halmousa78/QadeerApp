using System.Text;
using Serenity.Services;
using Microsoft.AspNetCore.Http;
using System.Text.Json;
using System.IO;
using Dapper;
using MyRow = QadeerApp.Administration.TrainingScheduleImportRow;

namespace QadeerApp.Administration.Endpoints;

[Route("Services/Administration/TrainingScheduleImport/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class TrainingScheduleImportEndpoint : ServiceEndpoint
{
    public class TermRequest : ServiceRequest
    {
        public string TrainingTerm { get; set; }
    }

    public class TrainingScheduleSummaryResponse : ServiceResponse
    {
        public int Total { get; set; }
        public int Active { get; set; }
        public int Inactive { get; set; }
        public List<string> Terms { get; set; } = new();
    }

    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request, [FromServices] ITrainingScheduleImportSaveHandler handler)
    {
        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request, [FromServices] ITrainingScheduleImportSaveHandler handler)
    {
        return handler.Update(uow, request);
    }

    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request, [FromServices] ITrainingScheduleImportDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request, [FromServices] ITrainingScheduleImportRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request, [FromServices] ITrainingScheduleImportListHandler handler)
    {
        return handler.List(connection, request);
    }

    public class TrainingScheduleImportRequest : ServiceRequest
    {
        public string CsvContent { get; set; }
        public bool ReplaceExisting { get; set; }
    }

    public class TrainingScheduleImportResponse : ServiceResponse
    {
        public int Inserted { get; set; }
        public int Failed { get; set; }
        public int SkippedExisting { get; set; }
        public int TotalRecords { get; set; }
        public List<string> Errors { get; set; } = new();
    }

    [HttpPost, AuthorizeCreate(typeof(MyRow)), IgnoreAntiforgeryToken]
    public TrainingScheduleImportResponse Import(IUnitOfWork uow, TrainingScheduleImportRequest request, [FromServices] ITrainingScheduleImportSaveHandler handler)
    {
        var csvContent = request?.CsvContent;
        var replaceExisting = request?.ReplaceExisting ?? false;

        // Accept both JSON and multipart/form-data
        var httpRequest = HttpContext?.Request;
        if (string.IsNullOrWhiteSpace(csvContent) && httpRequest != null)
        {
            if (httpRequest.HasFormContentType)
            {
                var form = httpRequest.Form;
                csvContent = form["CsvContent"].FirstOrDefault();
                if (bool.TryParse(form["ReplaceExisting"].FirstOrDefault(), out var repl))
                    replaceExisting = repl;
            }
            else if (httpRequest.Body != null && httpRequest.ContentLength.GetValueOrDefault() > 0)
            {
                httpRequest.EnableBuffering();
                using var reader = new StreamReader(httpRequest.Body, Encoding.UTF8, detectEncodingFromByteOrderMarks: true, leaveOpen: true);
                var bodyText = reader.ReadToEnd();
                httpRequest.Body.Position = 0;
                if (!string.IsNullOrWhiteSpace(bodyText))
                {
                    try
                    {
                        var deserialized = JsonSerializer.Deserialize<TrainingScheduleImportRequest>(bodyText);
                        if (deserialized != null)
                        {
                            csvContent = deserialized.CsvContent;
                            replaceExisting = deserialized.ReplaceExisting;
                        }
                    }
                    catch
                    {
                        // ignore parse errors and fall back to validation below
                    }
                }
            }
        }

        if (string.IsNullOrWhiteSpace(csvContent))
            throw new ValidationError("NoFile", "file", "No CSV file was provided.");

        var lines = csvContent.Split(new[] { "\r\n", "\n" }, StringSplitOptions.None)
            .Where(x => x != null)
            .ToList();

        if (lines.Count == 0)
            throw new ValidationError("HeaderMissing", "file", "Header row is missing.");

        var headerLine = lines[0];
        var delimiter = DetectDelimiter(headerLine);
        var headers = ParseCsvLine(headerLine, delimiter);
        var headerMap = BuildHeaderIndex(headers);

        var missingHeaders = RequiredHeaders.Where(h => !headerMap.ContainsKey(h)).ToList();
        if (missingHeaders.Count > 0)
            throw new ValidationError("MissingColumns", "file", $"Required columns: {string.Join(", ", missingHeaders)}");

        var response = new TrainingScheduleImportResponse();
        var dataLines = lines.Skip(1).Where(l => !string.IsNullOrWhiteSpace(l)).ToList();
        response.TotalRecords = dataLines.Count;

        var firstTerm = dataLines.Select(line => ParseCsvLine(line, delimiter))
            .Select(cells => GetValue(cells, headerMap, HeaderTrainingTerm))
            .FirstOrDefault(x => !string.IsNullOrWhiteSpace(x));

        var existingKeys = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        if (!string.IsNullOrWhiteSpace(firstTerm))
        {
            if (replaceExisting)
                Dapper.SqlMapper.Execute(uow.Connection, "delete from TrainingScheduleImports where TrainingTerm = @Term", new { Term = firstTerm });
            else
            {
                var fld = MyRow.Fields;
                var rows = uow.Connection.List<MyRow>(q => q
                    .Select(fld.TrainingTerm)
                    .Select(fld.TrainerNumber)
                    .Select(fld.Course)
                    .Select(fld.Day)
                    .Select(fld.Time)
                    .Where(fld.TrainingTerm == firstTerm));
                foreach (var r in rows)
                    existingKeys.Add(KeyFor(r.TrainingTerm, r.TrainerNumber, r.Course, r.Day, r.Time));
            }
        }

        foreach (var line in dataLines)
        {
            var cells = ParseCsvLine(line, delimiter);
            var row = new MyRow
            {
                TrainingTerm = GetValue(cells, headerMap, HeaderTrainingTerm),
                TrainingUnit = GetValue(cells, headerMap, HeaderTrainingUnit),
                Department = GetValue(cells, headerMap, HeaderDepartment),
                TrainingType = GetValue(cells, headerMap, HeaderTrainingType),
                TrainerNumber = ToInt(GetValue(cells, headerMap, HeaderTrainerNumber)),
                TrainerName = GetValue(cells, headerMap, HeaderTrainerName),
                Day = GetValue(cells, headerMap, HeaderDay),
                Time = GetValue(cells, headerMap, HeaderTime),
                LectureCount = ToInt(GetValue(cells, headerMap, HeaderLectureCount)),
                Course = GetValue(cells, headerMap, HeaderCourse),
                CourseDescription = GetValue(cells, headerMap, HeaderCourseDescription),
                LectureDescription = GetValue(cells, headerMap, HeaderLectureDescription),
                ReferenceNumber = ToInt(GetValue(cells, headerMap, HeaderReferenceNumber)),
                FromText = GetValue(cells, headerMap, HeaderFrom),
                ToText = GetValue(cells, headerMap, HeaderTo),
                Building = ToInt(GetValue(cells, headerMap, HeaderBuilding)),
                RoomNumber = ToInt(GetValue(cells, headerMap, HeaderRoomNumber)),
                RoomName = GetValue(cells, headerMap, HeaderRoomName),
                ContactHours = ToInt(GetValue(cells, headerMap, HeaderContactHours)),
                IsActive = 1
            };

            var key = KeyFor(row.TrainingTerm, row.TrainerNumber, row.Course, row.Day, row.Time);
            if (!string.IsNullOrWhiteSpace(key) && existingKeys.Contains(key))
            {
                response.SkippedExisting++;
                continue;
            }

            try
            {
                handler.Create(uow, new SaveRequest<MyRow> { Entity = row });
                response.Inserted++;
                if (!string.IsNullOrWhiteSpace(key))
                    existingKeys.Add(key);
            }
            catch (Exception ex)
            {
                response.Failed++;
                if (response.Errors.Count < 20)
                    response.Errors.Add($"Row {response.Inserted + response.Failed}: {ex.Message}");
            }
        }

        return response;
    }

    [HttpPost, AuthorizeDelete(typeof(MyRow)), IgnoreAntiforgeryToken]
    public ServiceResponse DeleteTermData(IUnitOfWork uow, TermRequest request)
    {
        if (string.IsNullOrWhiteSpace(request?.TrainingTerm))
            throw new ValidationError("TermMissing", "TrainingTerm", "Training term is required.");

        Dapper.SqlMapper.Execute(uow.Connection, "delete from TrainingScheduleImports where TrainingTerm = @Term", new { Term = request.TrainingTerm });
        return new ServiceResponse();
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow)), IgnoreAntiforgeryToken]
    public ServiceResponse DeactivateTerm(IUnitOfWork uow, TermRequest request)
    {
        if (string.IsNullOrWhiteSpace(request?.TrainingTerm))
            throw new ValidationError("TermMissing", "TrainingTerm", "Training term is required.");

        Dapper.SqlMapper.Execute(uow.Connection, "update TrainingScheduleImports set IsActive = 0 where TrainingTerm = @Term", new { Term = request.TrainingTerm });
        return new ServiceResponse();
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow)), IgnoreAntiforgeryToken]
    public ServiceResponse ActivateAll(IUnitOfWork uow)
    {
        Dapper.SqlMapper.Execute(uow.Connection, "update TrainingScheduleImports set IsActive = 1");
        return new ServiceResponse();
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow)), IgnoreAntiforgeryToken]
    public ServiceResponse DeactivateAll(IUnitOfWork uow)
    {
        Dapper.SqlMapper.Execute(uow.Connection, "update TrainingScheduleImports set IsActive = 0");
        return new ServiceResponse();
    }

    [HttpPost, AuthorizeDelete(typeof(MyRow)), IgnoreAntiforgeryToken]
    public ServiceResponse DeleteAll(IUnitOfWork uow)
    {
        Dapper.SqlMapper.Execute(uow.Connection, "delete from TrainingScheduleImports");
        return new ServiceResponse();
    }

    [HttpPost, AuthorizeList(typeof(MyRow))]
    public TrainingScheduleSummaryResponse Summary(IDbConnection connection)
    {
        var counts = Dapper.SqlMapper.QuerySingle<(int Total, int Active, int Inactive)>(
            connection,
            "select count(*) as Total, sum(case when IsActive = 1 then 1 else 0 end) as Active, " +
            "sum(case when IsActive <> 1 then 1 else 0 end) as Inactive from TrainingScheduleImports");

        var terms = Dapper.SqlMapper.Query<string>(
            connection,
            "select distinct TrainingTerm from TrainingScheduleImports where TrainingTerm is not null order by TrainingTerm").ToList();

        return new TrainingScheduleSummaryResponse
        {
            Total = counts.Total,
            Active = counts.Active,
            Inactive = counts.Inactive,
            Terms = terms
        };
    }

    private static int? ToInt(string value)
    {
        return int.TryParse(value, out var n) ? n : null;
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

    private static string KeyFor(string term, int? trainerNumber, string course, string day, string time)
    {
        return string.Join("|", term?.Trim(), trainerNumber?.ToString(), course?.Trim(), day?.Trim(), time?.Trim());
    }

    private const string HeaderTrainingTerm = "الفصل التدريبي";
    private const string HeaderTrainingUnit = "الوحدة التدريبية";
    private const string HeaderDepartment = "القسم";
    private const string HeaderTrainingType = "نوع التدريب";
    private const string HeaderTrainerNumber = "رقم المدرب";
    private const string HeaderTrainerName = "اسم المدرب";
    private const string HeaderDay = "اليوم";
    private const string HeaderTime = "الوقت";
    private const string HeaderLectureCount = "عدد المحاضرات";
    private const string HeaderCourse = "المقرر";
    private const string HeaderCourseDescription = "وصف المقرر";
    private const string HeaderLectureDescription = "وصف المحاضرة";
    private const string HeaderReferenceNumber = "ر.مرجعي";
    private const string HeaderFrom = "من";
    private const string HeaderTo = "إلى";
    private const string HeaderBuilding = "المبنى";
    private const string HeaderRoomNumber = "رقم القاعة";
    private const string HeaderRoomName = "اسم القاعة";
    private const string HeaderContactHours = "ساعات الاتصال";

    private static readonly string[] RequiredHeaders =
    {
        HeaderTrainingTerm, HeaderTrainingUnit, HeaderDepartment, HeaderTrainingType,
        HeaderTrainerNumber, HeaderTrainerName, HeaderDay, HeaderTime, HeaderLectureCount,
        HeaderCourse
    };
}
