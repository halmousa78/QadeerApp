namespace QadeerApp.Administration.Forms;

[FormScript("Administration.TrainingCalendarBreak")]
[BasedOnRow(typeof(TrainingCalendarBreakRow), CheckNames = true)]
public class TrainingCalendarBreakForm
{
    public string Title { get; set; }
    public int TrainingCalendarId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool IsActive { get; set; }
}
