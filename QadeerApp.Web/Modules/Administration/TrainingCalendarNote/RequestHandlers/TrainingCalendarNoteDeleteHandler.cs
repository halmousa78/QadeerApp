using MyRow = QadeerApp.Administration.TrainingCalendarNoteRow;

namespace QadeerApp.Administration;

public interface ITrainingCalendarNoteDeleteHandler : IDeleteHandler<MyRow> { }

public class TrainingCalendarNoteDeleteHandler(IRequestContext context)
    : DeleteRequestHandler<MyRow>(context), ITrainingCalendarNoteDeleteHandler
{
}
