using MyRow = QadeerApp.Administration.DepartmentRow;

namespace QadeerApp.Administration;

public interface IDepartmentSaveHandler : ISaveHandler<MyRow> { }

public class DepartmentSaveHandler(IRequestContext context)
    : SaveRequestHandler<MyRow>(context), IDepartmentSaveHandler
{
}
