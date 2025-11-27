using MyRow = QadeerApp.Administration.TrainingCourseFileRow;

namespace QadeerApp.Administration;

public interface ITrainingCourseFileSaveHandler : ISaveHandler<MyRow> { }

public class TrainingCourseFileSaveHandler(IRequestContext context)
    : SaveRequestHandler<MyRow>(context), ITrainingCourseFileSaveHandler
{
}
