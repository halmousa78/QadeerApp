namespace QadeerApp.Administration.Columns;

[ColumnsScript("Administration.TrainingCalendarNote")]
[BasedOnRow(typeof(TrainingCalendarNoteRow), CheckNames = true)]
public class TrainingCalendarNoteColumns
{
    [EditLink, AlignRight]
    public int TrainingCalendarNoteId { get; set; }

    [EditLink, Width(220)]
    public string Title { get; set; }

    [Width(220)]
    public string TrainingCalendarName { get; set; }

    [Width(140)]
    public DateTime NoteDate { get; set; }

    [Width(90)]
    public bool IsActive { get; set; }
}
