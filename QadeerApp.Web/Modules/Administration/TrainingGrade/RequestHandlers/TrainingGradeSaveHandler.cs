using MyRow = QadeerApp.Administration.TrainingGradeRow;

namespace QadeerApp.Administration;

public interface ITrainingGradeSaveHandler : ISaveHandler<MyRow> { }

public class TrainingGradeSaveHandler(IRequestContext context)
    : SaveRequestHandler<MyRow>(context), ITrainingGradeSaveHandler
{
}
