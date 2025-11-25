using MyRow = QadeerApp.Administration.TrainingTermRow;

namespace QadeerApp.Administration;

public interface ITrainingTermListHandler : IListHandler<MyRow> { }

public class TrainingTermListHandler(IRequestContext context)
    : ListRequestHandler<MyRow>(context), ITrainingTermListHandler
{
}
