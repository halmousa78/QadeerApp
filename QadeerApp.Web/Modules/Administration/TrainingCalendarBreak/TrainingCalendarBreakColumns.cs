namespace QadeerApp.Administration.Columns;

[ColumnsScript("Administration.TrainingCalendarBreak")]
[BasedOnRow(typeof(TrainingCalendarBreakRow), CheckNames = true)]
public class TrainingCalendarBreakColumns
{
    [EditLink, AlignRight]
    public int TrainingCalendarBreakId { get; set; }

    [EditLink, Width(200)]
    public string Title { get; set; }

    [Width(200)]
    public string TrainingCalendarName { get; set; }

    [Width(120)]
    public DateTime StartDate { get; set; }

    [Width(120)]
    public DateTime EndDate { get; set; }

    [Width(90)]
    public bool IsActive { get; set; }
}
