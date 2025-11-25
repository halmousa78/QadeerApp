using MyRow = QadeerApp.Cv.EmployeeCvStatusRow;

namespace QadeerApp.Cv;

public interface IEmployeeCvStatusRetrieveHandler : IRetrieveHandler<MyRow, RetrieveRequest, RetrieveResponse<MyRow>> { }

public class EmployeeCvStatusRetrieveHandler(IRequestContext context)
    : RetrieveRequestHandler<MyRow>(context), IEmployeeCvStatusRetrieveHandler
{
}
