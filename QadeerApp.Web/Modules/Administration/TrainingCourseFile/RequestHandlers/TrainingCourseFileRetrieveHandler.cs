using MyRow = QadeerApp.Administration.TrainingCourseFileRow;

namespace QadeerApp.Administration;

public interface ITrainingCourseFileRetrieveHandler : IRetrieveHandler<MyRow> { }

public class TrainingCourseFileRetrieveHandler(IRequestContext context)
    : RetrieveRequestHandler<MyRow>(context), ITrainingCourseFileRetrieveHandler
{
}
