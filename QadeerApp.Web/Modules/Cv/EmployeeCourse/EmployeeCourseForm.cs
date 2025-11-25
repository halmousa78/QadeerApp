namespace QadeerApp.Cv.Forms;

[FormScript("Cv.EmployeeCourse")]
[BasedOnRow(typeof(EmployeeCourseRow), CheckNames = true)]
public class EmployeeCourseForm
{
    public string Name { get; set; }
}
