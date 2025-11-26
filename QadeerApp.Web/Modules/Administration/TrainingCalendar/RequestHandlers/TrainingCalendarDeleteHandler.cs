using MyRow = QadeerApp.Administration.TrainingCalendarRow;

namespace QadeerApp.Administration;

public interface ITrainingCalendarDeleteHandler : IDeleteHandler<MyRow> { }

public class TrainingCalendarDeleteHandler(IRequestContext context)
    : DeleteRequestHandler<MyRow>(context), ITrainingCalendarDeleteHandler
{
}
