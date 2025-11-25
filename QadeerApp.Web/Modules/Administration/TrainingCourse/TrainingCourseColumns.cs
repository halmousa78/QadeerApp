namespace QadeerApp.Administration.Columns;

[ColumnsScript("Administration.TrainingCourse")]
[BasedOnRow(typeof(TrainingCourseRow), CheckNames = true)]
public class TrainingCourseColumns
{
    [EditLink, AlignRight, Width(60)]
    public int TrainingCourseId { get; set; }

    [EditLink, Width(220)]
    public string Name { get; set; }

    [Width(120)]
    public string Code { get; set; }

    [Width(180), QuickFilter]
    public string DepartmentName { get; set; }

    [Width(180), QuickFilter]
    public string SpecializationName { get; set; }

    [Width(80), QuickFilter]
    public short IsActive { get; set; }
}
