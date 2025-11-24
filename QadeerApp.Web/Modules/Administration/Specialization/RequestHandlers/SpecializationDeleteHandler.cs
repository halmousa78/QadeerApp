using MyRow = QadeerApp.Administration.SpecializationRow;

namespace QadeerApp.Administration;

public interface ISpecializationDeleteHandler : IDeleteHandler<MyRow> { }

public class SpecializationDeleteHandler(IRequestContext context)
    : DeleteRequestHandler<MyRow>(context), ISpecializationDeleteHandler
{
}
