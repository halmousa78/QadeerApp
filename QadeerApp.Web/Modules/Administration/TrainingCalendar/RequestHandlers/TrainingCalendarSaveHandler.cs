using MyRow = QadeerApp.Administration.TrainingCalendarRow;

namespace QadeerApp.Administration;

public interface ITrainingCalendarSaveHandler : ISaveHandler<MyRow> { }

public class TrainingCalendarSaveHandler(IRequestContext context)
    : SaveRequestHandler<MyRow>(context), ITrainingCalendarSaveHandler
{
}
