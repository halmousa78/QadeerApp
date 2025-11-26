using MyRow = QadeerApp.Administration.TrainingCalendarBreakRow;

namespace QadeerApp.Administration;

public interface ITrainingCalendarBreakSaveHandler : ISaveHandler<MyRow> { }

public class TrainingCalendarBreakSaveHandler(IRequestContext context)
    : SaveRequestHandler<MyRow>(context), ITrainingCalendarBreakSaveHandler
{
}
