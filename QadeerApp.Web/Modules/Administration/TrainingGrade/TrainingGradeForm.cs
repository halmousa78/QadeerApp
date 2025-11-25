namespace QadeerApp.Administration.Forms;

[FormScript("Administration.TrainingGrade")]
[BasedOnRow(typeof(TrainingGradeRow), CheckNames = true)]
public class TrainingGradeForm
{
    public string Grade { get; set; }
    public string TrainerName { get; set; }
    public string TrainerNumber { get; set; }
    public string ReferenceNumber { get; set; }
    public string ScheduleType { get; set; }
    public string CourseName { get; set; }
    public string CourseCode { get; set; }
    public string Department { get; set; }
    public string Specialization { get; set; }
    public string TrainingLevel { get; set; }
    public string TrainingTerm { get; set; }
    public bool IsActive { get; set; }
}
