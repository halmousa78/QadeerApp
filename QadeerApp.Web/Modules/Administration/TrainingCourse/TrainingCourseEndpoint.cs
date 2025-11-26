using MyRow = QadeerApp.Administration.TrainingCourseRow;

namespace QadeerApp.Administration.Endpoints;

[Route("Services/Administration/TrainingCourse/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class TrainingCourseEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request, [FromServices] ITrainingCourseSaveHandler handler)
    {
        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request, [FromServices] ITrainingCourseSaveHandler handler)
    {
        return handler.Update(uow, request);
    }

    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request, [FromServices] ITrainingCourseDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request, [FromServices] ITrainingCourseRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request, [FromServices] ITrainingCourseListHandler handler)
    {
        return handler.List(connection, request);
    }

    [HttpPost, AuthorizeCreate(typeof(MyRow)), IgnoreAntiforgeryToken]
    public TrainingCourseImportResponse ImportExcel(IUnitOfWork uow, [FromForm] TrainingCourseImportRequest request, [FromServices] ITrainingCourseSaveHandler saveHandler)
    {
        if (request?.File == null || request.File.Length == 0)
            throw new ValidationError("NoFile", "file", "لم يتم اختيار ملف Excel.");

        System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

        using var stream = request.File.OpenReadStream();
        using var reader = ExcelDataReader.ExcelReaderFactory.CreateReader(stream);

        var response = new TrainingCourseImportResponse();

        if (!reader.Read())
            throw new ValidationError("HeaderMissing", "file", "الملف فارغ أو بدون رؤوس.");

        var headers = Enumerable.Range(0, reader.FieldCount).Select(i => reader.GetString(i)?.Trim()).ToList();
        var headerMap = BuildHeaderIndex(headers);

        string[] required = { HeaderName, HeaderCode, HeaderDepartment };
        var missing = required.Where(h => !headerMap.ContainsKey(h)).ToList();
        if (missing.Any())
            throw new ValidationError("MissingColumns", "file", $"الأعمدة المطلوبة: {string.Join(", ", missing)}");

        var departments = uow.Connection.List<DepartmentRow>();
        var departmentLookup = departments.ToDictionary(d => d.Name?.Trim().ToLowerInvariant() ?? "", d => d.DepartmentId);

        var specializations = uow.Connection.List<SpecializationRow>();
        var specializationLookup = specializations.ToDictionary(s => (s.DepartmentId, s.Name?.Trim().ToLowerInvariant() ?? ""), s => s.SpecializationId);

        var existingCodes = uow.Connection.List<TrainingCourseRow>()
            .Where(x => !string.IsNullOrWhiteSpace(x.Code))
            .ToDictionary(x => x.Code!.Trim().ToLowerInvariant(), x => x.TrainingCourseId);

        while (reader.Read())
        {
            response.Total++;
            var cells = headers.Select((_, idx) => reader.GetValue(idx)?.ToString()?.Trim() ?? "").ToList();

            var deptName = GetValue(cells, headerMap, HeaderDepartment);
            if (string.IsNullOrWhiteSpace(deptName) || !departmentLookup.TryGetValue(deptName.Trim().ToLowerInvariant(), out var deptId))
            {
                response.Failed++;
                response.Errors.Add($"السطر {response.Total}: قسم غير معروف ({deptName}).");
                continue;
            }

            int? specId = null;
            var specName = GetValue(cells, headerMap, HeaderSpecialization);
            if (!string.IsNullOrWhiteSpace(specName))
            {
                specializationLookup.TryGetValue((deptId, specName.Trim().ToLowerInvariant()), out specId);
                if (specId == null)
                {
                    response.Failed++;
                    response.Errors.Add($"السطر {response.Total}: التخصص ({specName}) غير موجود في القسم ({deptName}).");
                    continue;
                }
            }

            short isActive = 1;
            var activeVal = GetValue(cells, headerMap, HeaderIsActive);
            if (!string.IsNullOrWhiteSpace(activeVal))
                isActive = (activeVal == "0" || activeVal.Equals("false", StringComparison.OrdinalIgnoreCase)) ? (short)0 : (short)1;

            var code = GetValue(cells, headerMap, HeaderCode);
            if (string.IsNullOrWhiteSpace(code))
            {
                response.Failed++;
                response.Errors.Add($"السطر {response.Total}: رقم المقرر مفقود.");
                continue;
            }

            var normalizedCode = code.Trim().ToLowerInvariant();
            if (existingCodes.ContainsKey(normalizedCode))
            {
                // تجاهل التكرار والاستمرار
                continue;
            }

            var row = new MyRow
            {
                Name = GetValue(cells, headerMap, HeaderName),
                Code = code,
                DepartmentId = deptId,
                SpecializationId = specId,
                IsActive = isActive
            };

            try
            {
                saveHandler.Create(uow, new SaveRequest<MyRow> { Entity = row });
                response.Inserted++;
            }
            catch (Exception ex)
            {
                response.Failed++;
                if (response.Errors.Count < 20)
                    response.Errors.Add($"السطر {response.Total}: {ex.Message}");
            }
        }

        return response;
    }

    [HttpGet, AuthorizeList(typeof(MyRow))]
    public FileContentResult DownloadTemplate()
    {
        var headers = new[]
        {
            HeaderName, HeaderCode, HeaderDepartment, HeaderSpecialization, HeaderIsActive
        };
        var csv = string.Join(",", headers);
        var preamble = Encoding.UTF8.GetPreamble(); // BOM لضمان قراءة العربية
        var content = preamble.Concat(Encoding.UTF8.GetBytes(csv + Environment.NewLine)).ToArray();
        return File(content, "text/csv; charset=utf-8", "training-courses-template.csv");
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

    private const string HeaderName = "اسم المقرر";
    private const string HeaderCode = "رقم المقرر";
    private const string HeaderDepartment = "القسم";
    private const string HeaderSpecialization = "التخصص";
    private const string HeaderIsActive = "مفعل";
}
