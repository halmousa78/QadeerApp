using MyRow = QadeerApp.Administration.TrainingCourseRow;

namespace QadeerApp.Administration;

public interface ITrainingCourseListHandler : IListHandler<MyRow> { }

public class TrainingCourseListHandler(IRequestContext context)
    : ListRequestHandler<MyRow>(context), ITrainingCourseListHandler
{
}
