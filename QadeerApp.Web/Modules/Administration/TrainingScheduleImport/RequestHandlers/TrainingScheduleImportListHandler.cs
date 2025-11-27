using MyRow = QadeerApp.Administration.TrainingScheduleImportRow;

namespace QadeerApp.Administration;

public interface ITrainingScheduleImportListHandler : IListHandler<MyRow> { }

public class TrainingScheduleImportListHandler(IRequestContext context)
    : ListRequestHandler<MyRow>(context), ITrainingScheduleImportListHandler
{
}
