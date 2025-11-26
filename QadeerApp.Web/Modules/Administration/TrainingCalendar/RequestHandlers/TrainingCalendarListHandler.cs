using MyRow = QadeerApp.Administration.TrainingCalendarRow;

namespace QadeerApp.Administration;

public interface ITrainingCalendarListHandler : IListHandler<MyRow> { }

public class TrainingCalendarListHandler(IRequestContext context)
    : ListRequestHandler<MyRow>(context), ITrainingCalendarListHandler
{
}
