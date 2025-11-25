using MyRow = QadeerApp.Administration.TrainingCourseRow;

namespace QadeerApp.Administration;

public interface ITrainingCourseDeleteHandler : IDeleteHandler<MyRow> { }

public class TrainingCourseDeleteHandler(IRequestContext context)
    : DeleteRequestHandler<MyRow>(context), ITrainingCourseDeleteHandler
{
}
