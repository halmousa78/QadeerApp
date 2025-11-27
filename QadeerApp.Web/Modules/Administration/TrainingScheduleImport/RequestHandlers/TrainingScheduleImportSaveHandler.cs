using MyRow = QadeerApp.Administration.TrainingScheduleImportRow;

namespace QadeerApp.Administration;

public interface ITrainingScheduleImportSaveHandler : ISaveHandler<MyRow> { }

public class TrainingScheduleImportSaveHandler(IRequestContext context)
    : SaveRequestHandler<MyRow>(context), ITrainingScheduleImportSaveHandler
{
}
