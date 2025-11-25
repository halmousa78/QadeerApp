namespace QadeerApp.Cv.Forms;

[FormScript("Cv.EmployeeQualification")]
[BasedOnRow(typeof(EmployeeQualificationRow), CheckNames = true)]
public class EmployeeQualificationForm
{
    public string Name { get; set; }
}
