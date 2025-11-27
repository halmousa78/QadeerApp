using MyRow = QadeerApp.Administration.TrainingCourseFileRow;

namespace QadeerApp.Administration;

public interface ITrainingCourseFileListHandler : IListHandler<MyRow> { }

public class TrainingCourseFileListHandler(IRequestContext context)
    : ListRequestHandler<MyRow>(context), ITrainingCourseFileListHandler
{
}
