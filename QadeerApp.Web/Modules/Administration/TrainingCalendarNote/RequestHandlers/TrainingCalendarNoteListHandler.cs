using MyRow = QadeerApp.Administration.TrainingCalendarNoteRow;

namespace QadeerApp.Administration;

public interface ITrainingCalendarNoteListHandler : IListHandler<MyRow> { }

public class TrainingCalendarNoteListHandler(IRequestContext context)
    : ListRequestHandler<MyRow>(context), ITrainingCalendarNoteListHandler
{
}
