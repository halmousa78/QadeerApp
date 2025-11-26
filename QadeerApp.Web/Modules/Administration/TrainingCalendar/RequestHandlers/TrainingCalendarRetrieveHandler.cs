using MyRow = QadeerApp.Administration.TrainingCalendarRow;

namespace QadeerApp.Administration;

public interface ITrainingCalendarRetrieveHandler : IRetrieveHandler<MyRow> { }

public class TrainingCalendarRetrieveHandler(IRequestContext context)
    : RetrieveRequestHandler<MyRow>(context), ITrainingCalendarRetrieveHandler
{
}
