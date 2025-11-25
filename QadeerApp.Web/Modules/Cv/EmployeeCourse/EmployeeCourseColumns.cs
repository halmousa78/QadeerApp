namespace QadeerApp.Cv.Columns;

[ColumnsScript("Cv.EmployeeCourse")]
[BasedOnRow(typeof(EmployeeCourseRow), CheckNames = true)]
public class EmployeeCourseColumns
{
    [EditLink, Width(250)]
    public string Name { get; set; }
}
