using MyRow = QadeerApp.Cv.EmployeeCvStatusRow;

namespace QadeerApp.Cv.Endpoints;

[Route("Services/Cv/EmployeeCvStatus/[action]")]
[ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
public class EmployeeCvStatusEndpoint : ServiceEndpoint
{
    public ListResponse<MyRow> List(IDbConnection connection, ListRequest request, [FromServices] IEmployeeCvStatusListHandler handler)
    {
        return handler.List(connection, request);
    }

    public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request, [FromServices] IEmployeeCvStatusRetrieveHandler handler)
    {
        return handler.Retrieve(connection, request);
    }
}
