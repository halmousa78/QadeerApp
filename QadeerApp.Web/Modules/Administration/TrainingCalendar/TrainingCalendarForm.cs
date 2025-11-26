namespace QadeerApp.Administration.Forms;

[FormScript("Administration.TrainingCalendar")]
[BasedOnRow(typeof(TrainingCalendarRow), CheckNames = true)]
public class TrainingCalendarForm
{
    public string Name { get; set; }
    public int TrainingTermId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool IsEnabled { get; set; }
    public bool IsActive { get; set; }
}
