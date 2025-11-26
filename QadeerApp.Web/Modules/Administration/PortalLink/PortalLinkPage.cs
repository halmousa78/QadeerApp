using Microsoft.AspNetCore.Mvc;

namespace QadeerApp.Administration.Pages;

[PageAuthorize(typeof(PortalLinkRow))]
public class PortalLinkPage : Controller
{
    [Route("Administration/PortalLink")]
    public ActionResult Index()
    {
        return this.GridPage("@/Administration/PortalLink/PortalLinkPage",
            PortalLinkRow.Fields.PageTitle());
    }
}
