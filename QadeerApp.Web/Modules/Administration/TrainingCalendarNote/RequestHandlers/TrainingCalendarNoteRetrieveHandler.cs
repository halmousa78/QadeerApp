using MyRow = QadeerApp.Administration.TrainingCalendarNoteRow;

namespace QadeerApp.Administration;

public interface ITrainingCalendarNoteRetrieveHandler : IRetrieveHandler<MyRow> { }

public class TrainingCalendarNoteRetrieveHandler(IRequestContext context)
    : RetrieveRequestHandler<MyRow>(context), ITrainingCalendarNoteRetrieveHandler
{
}
