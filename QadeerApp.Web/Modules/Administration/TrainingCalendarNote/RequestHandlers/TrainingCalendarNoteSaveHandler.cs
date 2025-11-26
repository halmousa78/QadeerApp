using MyRow = QadeerApp.Administration.TrainingCalendarNoteRow;

namespace QadeerApp.Administration;

public interface ITrainingCalendarNoteSaveHandler : ISaveHandler<MyRow> { }

public class TrainingCalendarNoteSaveHandler(IRequestContext context)
    : SaveRequestHandler<MyRow>(context), ITrainingCalendarNoteSaveHandler
{
}
