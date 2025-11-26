
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace QadeerApp.Common.Pages;

[Route("Dashboard/[action]")]
public class DashboardPage : Controller
{
    [AllowAnonymous, HttpGet, Route("~/")]
    public ActionResult Index()
    {
        if (User?.Identity?.IsAuthenticated == true)
            return View(MVC.Views.Common.Dashboard.DashboardIndex, new DashboardPageModel());

        return Redirect("~/Public/Portal");
    }
}
