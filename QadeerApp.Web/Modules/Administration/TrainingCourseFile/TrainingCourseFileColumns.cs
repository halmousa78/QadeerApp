namespace QadeerApp.Administration;

[ColumnsScript("Administration.TrainingCourseFile")]
[BasedOnRow(typeof(TrainingCourseFileRow), CheckNames = true)]
public class TrainingCourseFileColumns
{
    [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight]
    public int TrainingCourseFileId { get; set; }
    [EditLink, Width(200)]
    public string TrainingTerm { get; set; }
    [Width(150)]
    public string TrainingUnit { get; set; }
    [Width(150)]
    public string Department { get; set; }
    [Width(150)]
    public string TrainingType { get; set; }
    [Width(120)]
    public int TrainerNumber { get; set; }
    [Width(180)]
    public string TrainerName { get; set; }
    [Width(100)]
    public string Day { get; set; }
    [Width(100)]
    public string Time { get; set; }
    [Width(120)]
    public int LectureCount { get; set; }
    [Width(180)]
    public string Course { get; set; }
    [Width(200)]
    public string CourseDescription { get; set; }
    [Width(200)]
    public string LectureDescription { get; set; }
    [Width(120)]
    public int ReferenceNumber { get; set; }
    [Width(120)]
    public string FromText { get; set; }
    [Width(120)]
    public string ToText { get; set; }
    [Width(100)]
    public int Building { get; set; }
    [Width(120)]
    public int RoomNumber { get; set; }
    [Width(150)]
    public string RoomName { get; set; }
    [Width(120)]
    public int ContactHours { get; set; }
    [Width(180)]
    public string CourseCoordinator { get; set; }
    [Width(80)]
    public short IsActive { get; set; }
}
