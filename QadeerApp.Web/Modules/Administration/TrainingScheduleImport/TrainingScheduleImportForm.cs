namespace QadeerApp.Administration.Forms;

[FormScript("Administration.TrainingScheduleImport")]
[BasedOnRow(typeof(TrainingScheduleImportRow), CheckNames = true)]
public class TrainingScheduleImportForm
{
    public string TrainingTerm { get; set; }
    public string TrainingUnit { get; set; }
    public string Department { get; set; }
    public string TrainingType { get; set; }
    public int TrainerNumber { get; set; }
    public string TrainerName { get; set; }
    public string Day { get; set; }
    public string Time { get; set; }
    public int LectureCount { get; set; }
    public string Course { get; set; }
    public string CourseDescription { get; set; }
    public string LectureDescription { get; set; }
    public int ReferenceNumber { get; set; }
    public string FromText { get; set; }
    public string ToText { get; set; }
    public int Building { get; set; }
    public int RoomNumber { get; set; }
    public string RoomName { get; set; }
    public int ContactHours { get; set; }
    public bool IsActive { get; set; }
}
