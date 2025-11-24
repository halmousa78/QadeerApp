namespace QadeerApp.Administration.Forms;

[FormScript("Administration.Department")]
[BasedOnRow(typeof(DepartmentRow), CheckNames = true)]
public class DepartmentForm
{
    public string Name { get; set; }
    public bool IsActive { get; set; }
}
