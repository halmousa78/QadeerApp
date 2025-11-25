namespace QadeerApp.Cv.Columns;

[ColumnsScript("Cv.EmployeeExperience")]
[BasedOnRow(typeof(EmployeeExperienceRow), CheckNames = true)]
public class EmployeeExperienceColumns
{
    [EditLink, Width(250)]
    public string Name { get; set; }
}
