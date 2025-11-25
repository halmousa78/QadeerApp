namespace QadeerApp.Cv.Forms;

[FormScript("Cv.EmployeeCv")]
[BasedOnRow(typeof(EmployeeCvRow), CheckNames = true)]
public class EmployeeCvForm
{
    [Tab("المعلومات الشخصية"), Category("المعلومات الشخصية")]
    [Required(true)]
    public string Mobile { get; set; }

    [Tab("المعلومات الشخصية"), Required(true)]
    [EnumEditor]
    public EnglishLevel EnglishLevel { get; set; }

    [Tab("المعلومات الشخصية"), TextAreaEditor(Rows = 2), Required(true)]
    public string Address { get; set; }

    [Tab("المعلومات الشخصية"), Required(true)]
    public string ExtensionNumber { get; set; }

    [Tab("المعلومات الشخصية"), Required(true)]
    public string OfficeNumber { get; set; }

    [Tab("المعلومات الشخصية"), Required(true)]
    public string BuildingNumber { get; set; }

    [Tab("المؤهلات")]
    [EmployeeQualificationEditor]
    public List<EmployeeQualificationRow> Qualifications { get; set; }

    [Tab("الخبرات")]
    [EmployeeExperienceEditor]
    public List<EmployeeExperienceRow> Experiences { get; set; }

    [Tab("الدورات")]
    [EmployeeCourseEditor]
    public List<EmployeeCourseRow> Courses { get; set; }
}
