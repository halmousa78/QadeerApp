using MyRow = QadeerApp.Administration.TrainingCourseRow;

namespace QadeerApp.Administration;

public interface ITrainingCourseRetrieveHandler : IRetrieveHandler<MyRow> { }

public class TrainingCourseRetrieveHandler(IRequestContext context)
    : RetrieveRequestHandler<MyRow>(context), ITrainingCourseRetrieveHandler
{
}
