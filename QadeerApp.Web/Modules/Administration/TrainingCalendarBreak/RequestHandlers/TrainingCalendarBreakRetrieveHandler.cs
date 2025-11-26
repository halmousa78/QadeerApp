using MyRow = QadeerApp.Administration.TrainingCalendarBreakRow;

namespace QadeerApp.Administration;

public interface ITrainingCalendarBreakRetrieveHandler : IRetrieveHandler<MyRow> { }

public class TrainingCalendarBreakRetrieveHandler(IRequestContext context)
    : RetrieveRequestHandler<MyRow>(context), ITrainingCalendarBreakRetrieveHandler
{
}
