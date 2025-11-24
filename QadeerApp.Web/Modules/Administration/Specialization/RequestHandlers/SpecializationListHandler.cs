using MyRow = QadeerApp.Administration.SpecializationRow;

namespace QadeerApp.Administration;

public interface ISpecializationListHandler : IListHandler<MyRow> { }

public class SpecializationListHandler(IRequestContext context)
    : ListRequestHandler<MyRow>(context), ISpecializationListHandler
{
}
