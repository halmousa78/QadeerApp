using MyRow = QadeerApp.Administration.TrainingTermRow;

namespace QadeerApp.Administration;

public interface ITrainingTermDeleteHandler : IDeleteHandler<MyRow> { }

public class TrainingTermDeleteHandler(IRequestContext context)
    : DeleteRequestHandler<MyRow>(context), ITrainingTermDeleteHandler
{
}
