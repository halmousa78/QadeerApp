using Microsoft.AspNetCore.Mvc;

namespace QadeerApp.Cv.Pages;

[PageAuthorize(typeof(EmployeeCvRow))]
public class EmployeeCvPage : Controller
{
    [Route("Cv/EmployeeCv")]
    public ActionResult Index()
    {
        return this.GridPage("@/Cv/EmployeeCv/EmployeeCvPage",
            EmployeeCvRow.Fields.PageTitle() ?? "السيرة الذاتية");
    }
}
