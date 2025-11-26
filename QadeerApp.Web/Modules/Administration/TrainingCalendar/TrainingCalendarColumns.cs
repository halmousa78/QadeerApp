namespace QadeerApp.Administration.Columns;

[ColumnsScript("Administration.TrainingCalendar")]
[BasedOnRow(typeof(TrainingCalendarRow), CheckNames = true)]
public class TrainingCalendarColumns
{
    [EditLink, AlignRight]
    public int TrainingCalendarId { get; set; }

    [EditLink, Width(200)]
    public string Name { get; set; }

    [Width(180)]
    public string TrainingTermName { get; set; }

    [Width(120), Sortable(true)]
    public DateTime StartDate { get; set; }

    [Width(120), Sortable(true)]
    public DateTime EndDate { get; set; }

    [Width(90)]
    public bool IsEnabled { get; set; }

    [Width(90)]
    public bool IsActive { get; set; }
}
