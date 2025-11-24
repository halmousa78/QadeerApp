using MyRow = QadeerApp.Administration.DepartmentRow;

namespace QadeerApp.Administration;

public interface IDepartmentListHandler : IListHandler<MyRow> { }

public class DepartmentListHandler(IRequestContext context)
    : ListRequestHandler<MyRow>(context), IDepartmentListHandler
{
}
