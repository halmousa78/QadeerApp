using Microsoft.AspNetCore.Mvc;

namespace QadeerApp.Cv.Pages;

[PageAuthorize(typeof(EmployeeCvStatusRow))]
public class EmployeeCvStatusPage : Controller
{
    [Route("Cv/EmployeeCvStatus")]
    public ActionResult Index()
    {
        return this.GridPage("@/Cv/EmployeeCvStatus/EmployeeCvStatusPage",
            "CV Completion Report");
    }
}
