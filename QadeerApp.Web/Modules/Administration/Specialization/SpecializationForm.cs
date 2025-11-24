namespace QadeerApp.Administration.Forms;

[FormScript("Administration.Specialization")]
[BasedOnRow(typeof(SpecializationRow), CheckNames = true)]
public class SpecializationForm
{
    [HalfWidth]
    public int DepartmentId { get; set; }

    [HalfWidth]
    public string Name { get; set; }

    public bool IsActive { get; set; }
}
