using MyRow = QadeerApp.Administration.TrainingCourseFileRow;

namespace QadeerApp.Administration;

public interface ITrainingCourseFileDeleteHandler : IDeleteHandler<MyRow> { }

public class TrainingCourseFileDeleteHandler(IRequestContext context)
    : DeleteRequestHandler<MyRow>(context), ITrainingCourseFileDeleteHandler
{
}
