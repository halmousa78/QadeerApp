using MyRow = QadeerApp.Cv.EmployeeCvRow;

namespace QadeerApp.Cv.Endpoints;

[Route("Services/Cv/EmployeeCv/[action]")] 
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class EmployeeCvEndpoint : ServiceEndpoint
{
    [HttpPost, AuthorizeCreate(typeof(MyRow))]
    public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request, [FromServices] IEmployeeCvSaveHandler handler)
    {
        return handler.Create(uow, request);
    }

    [HttpPost, AuthorizeUpdate(typeof(MyRow))]
    public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request, [FromServices] IEmployeeCvSaveHandler handler)
    {
        return handler.Update(uow, request);
    }

    [HttpPost, AuthorizeDelete(typeof(MyRow))]
    public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request, [FromServices] IEmployeeCvDeleteHandler handler)
    {
        return handler.Delete(uow, request);
    }

    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request, [FromServices] IEmployeeCvRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }

    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request, [FromServices] IEmployeeCvListHandler handler)
    {
        return handler.List(connection, request);
    }

    public CvStatusResponse CheckStatus(IDbConnection connection)
    {
        var response = new CvStatusResponse();

        if (!int.TryParse(User?.GetIdentifier(), out var userId) || userId <= 0)
            return response;

        var cv = connection.TryFirst<MyRow>(MyRow.Fields.UserId == userId);
        if (cv == null)
        {
            response.NeedsCompletion = true;
            response.Message = "يجب تعبئة السيرة الذاتية مع إدخال البيانات الشخصية وإضافة مؤهل وخبرة ودورة واحدة على الأقل.";
            return response;
        }

        var hasAllDetails =
            connection.Exists<EmployeeQualificationRow>(EmployeeQualificationRow.Fields.EmployeeCvId == cv.EmployeeCvId.Value) &&
            connection.Exists<EmployeeExperienceRow>(EmployeeExperienceRow.Fields.EmployeeCvId == cv.EmployeeCvId.Value) &&
            connection.Exists<EmployeeCourseRow>(EmployeeCourseRow.Fields.EmployeeCvId == cv.EmployeeCvId.Value);

        response.EmployeeCvId = cv.EmployeeCvId;
        response.NeedsCompletion = !hasAllDetails;
        if (response.NeedsCompletion)
            response.Message = "يجب التأكد من إضافة مؤهل وخبرة ودورة واحدة على الأقل لإتمام السيرة الذاتية.";

        return response;
    }
}

public class CvStatusResponse : ServiceResponse
{
    public bool NeedsCompletion { get; set; }
    public int? EmployeeCvId { get; set; }
    public string Message { get; set; }
}
