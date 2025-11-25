namespace QadeerApp.Administration.Forms;

[FormScript("Administration.TrainingCourse")]
[BasedOnRow(typeof(TrainingCourseRow), CheckNames = true)]
public class TrainingCourseForm
{
    public int DepartmentId { get; set; }
    public int? SpecializationId { get; set; }
    public string Name { get; set; }
    public string Code { get; set; }
    public bool IsActive { get; set; }
}
