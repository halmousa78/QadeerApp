using MyRow = QadeerApp.Administration.TrainingGradeRow;

namespace QadeerApp.Administration;

public interface ITrainingGradeListHandler : IListHandler<MyRow> { }

public class TrainingGradeListHandler(IRequestContext context)
    : ListRequestHandler<MyRow>(context), ITrainingGradeListHandler
{
}
