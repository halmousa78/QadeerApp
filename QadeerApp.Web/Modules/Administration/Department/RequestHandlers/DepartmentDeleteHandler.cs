using MyRow = QadeerApp.Administration.DepartmentRow;

namespace QadeerApp.Administration;

public interface IDepartmentDeleteHandler : IDeleteHandler<MyRow> { }

public class DepartmentDeleteHandler(IRequestContext context)
    : DeleteRequestHandler<MyRow>(context), IDepartmentDeleteHandler
{
}
