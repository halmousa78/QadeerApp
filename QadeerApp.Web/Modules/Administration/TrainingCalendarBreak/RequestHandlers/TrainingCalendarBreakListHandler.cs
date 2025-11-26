using MyRow = QadeerApp.Administration.TrainingCalendarBreakRow;

namespace QadeerApp.Administration;

public interface ITrainingCalendarBreakListHandler : IListHandler<MyRow> { }

public class TrainingCalendarBreakListHandler(IRequestContext context)
    : ListRequestHandler<MyRow>(context), ITrainingCalendarBreakListHandler
{
}
