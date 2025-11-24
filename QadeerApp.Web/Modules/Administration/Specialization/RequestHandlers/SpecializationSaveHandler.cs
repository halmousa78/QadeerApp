using MyRow = QadeerApp.Administration.SpecializationRow;

namespace QadeerApp.Administration;

public interface ISpecializationSaveHandler : ISaveHandler<MyRow> { }

public class SpecializationSaveHandler(IRequestContext context)
    : SaveRequestHandler<MyRow>(context), ISpecializationSaveHandler
{
}
