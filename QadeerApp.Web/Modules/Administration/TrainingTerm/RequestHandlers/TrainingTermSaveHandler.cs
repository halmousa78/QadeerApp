using MyRow = QadeerApp.Administration.TrainingTermRow;

namespace QadeerApp.Administration;

public interface ITrainingTermSaveHandler : ISaveHandler<MyRow> { }

public class TrainingTermSaveHandler(IRequestContext context)
    : SaveRequestHandler<MyRow>(context), ITrainingTermSaveHandler
{
}
