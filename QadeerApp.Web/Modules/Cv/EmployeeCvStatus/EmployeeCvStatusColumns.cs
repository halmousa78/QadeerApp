namespace QadeerApp.Cv.Columns;

[ColumnsScript("Cv.EmployeeCvStatus")]
[BasedOnRow(typeof(EmployeeCvStatusRow), CheckNames = true)]
public class EmployeeCvStatusColumns
{
    [Width(200)]
    public string DisplayName { get; set; }

    [Width(140)]
    public string DepartmentName { get; set; }

    [Width(140)]
    public string SpecializationName { get; set; }

    [Width(110)]
    public bool IsCompleted { get; set; }

    [Width(130)]
    public DateTime CvUpdatedOn { get; set; }

    [Width(120)]
    public int QualificationCount { get; set; }

    [Width(120)]
    public int ExperienceCount { get; set; }

    [Width(120)]
    public int CourseCount { get; set; }
}
