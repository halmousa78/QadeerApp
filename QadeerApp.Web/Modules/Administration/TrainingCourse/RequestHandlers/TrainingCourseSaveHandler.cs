using MyRow = QadeerApp.Administration.TrainingCourseRow;

namespace QadeerApp.Administration;

public interface ITrainingCourseSaveHandler : ISaveHandler<MyRow> { }

public class TrainingCourseSaveHandler(IRequestContext context)
    : SaveRequestHandler<MyRow>(context), ITrainingCourseSaveHandler
{
}
