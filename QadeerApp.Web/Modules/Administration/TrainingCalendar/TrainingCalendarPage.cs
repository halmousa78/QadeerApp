using Microsoft.AspNetCore.Mvc;

namespace QadeerApp.Administration.Pages;

[PageAuthorize(typeof(TrainingCalendarRow))]
public class TrainingCalendarPage : Controller
{
    [Route("Administration/TrainingCalendar")]
    public ActionResult Index()
    {
        return this.GridPage("@/Administration/TrainingCalendar/TrainingCalendarPage",
            TrainingCalendarRow.Fields.PageTitle());
    }
}
