namespace QadeerApp.Administration.Columns;

[ColumnsScript("Administration.TrainingGrade")]
[BasedOnRow(typeof(TrainingGradeRow), CheckNames = true)]
public class TrainingGradeColumns
{
    [EditLink, AlignRight, Width(60)]
    public int TrainingGradeId { get; set; }

    [Width(100)]
    public string Grade { get; set; }

    [Width(150)]
    public string TrainerName { get; set; }

    [Width(120)]
    public string TrainerNumber { get; set; }

    [Width(120)]
    public string ReferenceNumber { get; set; }

    [Width(120)]
    public string ScheduleType { get; set; }

    [EditLink, Width(200)]
    public string CourseName { get; set; }

    [Width(120)]
    public string CourseCode { get; set; }

    [Width(160)]
    public string Department { get; set; }

    [Width(160)]
    public string Specialization { get; set; }

    [Width(120)]
    public string TrainingLevel { get; set; }

    [Width(160)]
    public string TrainingTerm { get; set; }

    [Width(80), QuickFilter]
    public short IsActive { get; set; }
}
