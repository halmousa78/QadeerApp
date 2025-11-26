namespace QadeerApp.Administration.Forms;

[FormScript("Administration.TrainingCalendarNote")]
[BasedOnRow(typeof(TrainingCalendarNoteRow), CheckNames = true)]
public class TrainingCalendarNoteForm
{
    public string Title { get; set; }
    public string NoteText { get; set; }
    public int TrainingCalendarId { get; set; }
    public DateTime NoteDate { get; set; }
    public bool IsActive { get; set; }
}
