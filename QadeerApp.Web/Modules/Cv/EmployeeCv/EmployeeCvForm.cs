namespace QadeerApp.Cv.Forms;

[FormScript("Cv.EmployeeCv")]
[BasedOnRow(typeof(EmployeeCvRow), CheckNames = true)]
public class EmployeeCvForm
{
    [Tab("Basic Info"), Category("Basic Info")]
    [Required(true)]
    public string Mobile { get; set; }

    [Tab("Basic Info")]
    [ReadOnly(true)]
    public string EmployeeNumber { get; set; }

    [Tab("Basic Info"), Required(true)]
    [EnumEditor]
    public EnglishLevel EnglishLevel { get; set; }

    [Tab("Basic Info"), TextAreaEditor(Rows = 2), Required(true)]
    public string Address { get; set; }

    [Tab("Basic Info"), Required(true)]
    public string ExtensionNumber { get; set; }

    [Tab("Basic Info"), Required(true)]
    public string OfficeNumber { get; set; }

    [Tab("Basic Info"), Required(true)]
    public string BuildingNumber { get; set; }

    [Tab("Qualifications")]
    [EmployeeQualificationEditor]
    public List<EmployeeQualificationRow> Qualifications { get; set; }

    [Tab("Experiences")]
    [EmployeeExperienceEditor]
    public List<EmployeeExperienceRow> Experiences { get; set; }

    [Tab("Courses")]
    [EmployeeCourseEditor]
    public List<EmployeeCourseRow> Courses { get; set; }
}
