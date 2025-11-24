using MyRow = QadeerApp.Administration.SpecializationRow;

namespace QadeerApp.Administration;

public interface ISpecializationRetrieveHandler : IRetrieveHandler<MyRow> { }

public class SpecializationRetrieveHandler(IRequestContext context)
    : RetrieveRequestHandler<MyRow>(context), ISpecializationRetrieveHandler
{
}
