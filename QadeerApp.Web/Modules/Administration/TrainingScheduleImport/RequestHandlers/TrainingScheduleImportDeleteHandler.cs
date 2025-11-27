using MyRow = QadeerApp.Administration.TrainingScheduleImportRow;

namespace QadeerApp.Administration;

public interface ITrainingScheduleImportDeleteHandler : IDeleteHandler<MyRow> { }

public class TrainingScheduleImportDeleteHandler(IRequestContext context)
    : DeleteRequestHandler<MyRow>(context), ITrainingScheduleImportDeleteHandler
{
}
