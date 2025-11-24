using Microsoft.AspNetCore.Mvc;

namespace QadeerApp.Administration.Pages;

[PageAuthorize(typeof(DepartmentRow))]
public class DepartmentPage : Controller
{
    [Route("Administration/Department")]
    public ActionResult Index()
    {
        return this.GridPage("@/Administration/Department/DepartmentPage",
            DepartmentRow.Fields.PageTitle());
    }
}
