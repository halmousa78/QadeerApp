namespace QadeerApp.Cv.Forms;

[FormScript("Cv.EmployeeExperience")]
[BasedOnRow(typeof(EmployeeExperienceRow), CheckNames = true)]
public class EmployeeExperienceForm
{
    public string Name { get; set; }
}
