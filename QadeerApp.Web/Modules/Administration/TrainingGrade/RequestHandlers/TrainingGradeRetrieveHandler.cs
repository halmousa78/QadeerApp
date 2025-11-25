using MyRow = QadeerApp.Administration.TrainingGradeRow;

namespace QadeerApp.Administration;

public interface ITrainingGradeRetrieveHandler : IRetrieveHandler<MyRow> { }

public class TrainingGradeRetrieveHandler(IRequestContext context)
    : RetrieveRequestHandler<MyRow>(context), ITrainingGradeRetrieveHandler
{
}
