namespace QadeerApp.Administration.Columns;

[ColumnsScript("Administration.Specialization")]
[BasedOnRow(typeof(SpecializationRow), CheckNames = true)]
public class SpecializationColumns
{
    [EditLink, AlignRight, Width(60)]
    public int SpecializationId { get; set; }

    [EditLink, Width(200)]
    public string Name { get; set; }

    [Width(200)]
    public string DepartmentName { get; set; }

    [Width(80), QuickFilter]
    public short IsActive { get; set; }
}
