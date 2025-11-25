namespace QadeerApp.Cv.Columns;

[ColumnsScript("Cv.EmployeeQualification")]
[BasedOnRow(typeof(EmployeeQualificationRow), CheckNames = true)]
public class EmployeeQualificationColumns
{
    [EditLink, Width(250)]
    public string Name { get; set; }
}
