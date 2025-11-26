namespace QadeerApp.Administration.Columns;

[ColumnsScript("Administration.PortalLink")]
[BasedOnRow(typeof(PortalLinkRow), CheckNames = true)]
public class PortalLinkColumns
{
    [EditLink, AlignRight]
    public int PortalLinkId { get; set; }

    [Width(160)]
    public string DepartmentName { get; set; }

    [Width(180)]
    public string SpecializationName { get; set; }

    [EditLink, Width(220)]
    public string Title { get; set; }

    [Width(280)]
    public string Url { get; set; }

    [Width(80)]
    public int DisplayOrder { get; set; }

    [Width(80)]
    public bool IsActive { get; set; }
}
