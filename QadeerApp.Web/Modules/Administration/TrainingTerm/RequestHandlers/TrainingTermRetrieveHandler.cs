using MyRow = QadeerApp.Administration.TrainingTermRow;

namespace QadeerApp.Administration;

public interface ITrainingTermRetrieveHandler : IRetrieveHandler<MyRow> { }

public class TrainingTermRetrieveHandler(IRequestContext context)
    : RetrieveRequestHandler<MyRow>(context), ITrainingTermRetrieveHandler
{
}
