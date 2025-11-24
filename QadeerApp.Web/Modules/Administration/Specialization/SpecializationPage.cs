using Microsoft.AspNetCore.Mvc;

namespace QadeerApp.Administration.Pages;

[PageAuthorize(typeof(SpecializationRow))]
public class SpecializationPage : Controller
{
    [Route("Administration/Specialization")]
    public ActionResult Index()
    {
        return this.GridPage("@/Administration/Specialization/SpecializationPage",
            SpecializationRow.Fields.PageTitle());
    }
}
