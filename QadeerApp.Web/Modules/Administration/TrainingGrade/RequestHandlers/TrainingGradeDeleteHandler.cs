using MyRow = QadeerApp.Administration.TrainingGradeRow;

namespace QadeerApp.Administration;

public interface ITrainingGradeDeleteHandler : IDeleteHandler<MyRow> { }

public class TrainingGradeDeleteHandler(IRequestContext context)
    : DeleteRequestHandler<MyRow>(context), ITrainingGradeDeleteHandler
{
}
