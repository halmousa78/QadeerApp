using MyRow = QadeerApp.Administration.DepartmentRow;

namespace QadeerApp.Administration;

public interface IDepartmentRetrieveHandler : IRetrieveHandler<MyRow> { }

public class DepartmentRetrieveHandler(IRequestContext context)
    : RetrieveRequestHandler<MyRow>(context), IDepartmentRetrieveHandler
{
}
