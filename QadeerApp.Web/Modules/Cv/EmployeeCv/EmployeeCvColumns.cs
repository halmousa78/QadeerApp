using Serenity.ComponentModel;

namespace QadeerApp.Cv.Columns;

[ColumnsScript("Cv.EmployeeCv")]
[BasedOnRow(typeof(EmployeeCvRow), CheckNames = true)]
public class EmployeeCvColumns
{
    [EditLink, Width(200)]
    public string UserDisplayName { get; set; }

    [Width(140)]
    public string EmployeeNumber { get; set; }

    [Width(140)]
    public string Mobile { get; set; }

    [Width(160)]
    public EnglishLevel EnglishLevel { get; set; }

    [Width(120)]
    public string ExtensionNumber { get; set; }

    [Width(120)]
    public string OfficeNumber { get; set; }

    [Width(120)]
    public string BuildingNumber { get; set; }

    [DisplayName("Last Updated"), Width(150)]
    public DateTime CvUpdatedOn { get; set; }
}
