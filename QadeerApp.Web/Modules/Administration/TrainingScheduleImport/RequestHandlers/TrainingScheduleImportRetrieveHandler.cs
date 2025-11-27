using MyRow = QadeerApp.Administration.TrainingScheduleImportRow;

namespace QadeerApp.Administration;

public interface ITrainingScheduleImportRetrieveHandler : IRetrieveHandler<MyRow> { }

public class TrainingScheduleImportRetrieveHandler(IRequestContext context)
    : RetrieveRequestHandler<MyRow>(context), ITrainingScheduleImportRetrieveHandler
{
}
