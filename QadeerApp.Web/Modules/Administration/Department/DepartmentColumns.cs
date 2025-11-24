namespace QadeerApp.Administration.Columns;

[ColumnsScript("Administration.Department")]
[BasedOnRow(typeof(DepartmentRow), CheckNames = true)]
public class DepartmentColumns
{
    [EditLink, AlignRight, Width(60)]
    public int DepartmentId { get; set; }

    [EditLink, Width(200)]
    public string Name { get; set; }

    [Width(80), QuickFilter]
    public short IsActive { get; set; }
}
