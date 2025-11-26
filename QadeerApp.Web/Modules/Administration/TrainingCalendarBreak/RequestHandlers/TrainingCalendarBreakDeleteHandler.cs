using MyRow = QadeerApp.Administration.TrainingCalendarBreakRow;

namespace QadeerApp.Administration;

public interface ITrainingCalendarBreakDeleteHandler : IDeleteHandler<MyRow> { }

public class TrainingCalendarBreakDeleteHandler(IRequestContext context)
    : DeleteRequestHandler<MyRow>(context), ITrainingCalendarBreakDeleteHandler
{
}
