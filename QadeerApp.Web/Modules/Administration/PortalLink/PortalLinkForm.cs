namespace QadeerApp.Administration.Forms;

[FormScript("Administration.PortalLink")]
[BasedOnRow(typeof(PortalLinkRow), CheckNames = true)]
public class PortalLinkForm
{
    public int DepartmentId { get; set; }
    public int? SpecializationId { get; set; }
    public string Title { get; set; }
    public string Url { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; }
}
