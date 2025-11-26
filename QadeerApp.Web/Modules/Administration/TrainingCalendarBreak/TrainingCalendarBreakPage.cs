using Microsoft.AspNetCore.Mvc;

namespace QadeerApp.Administration.Pages;

[PageAuthorize(typeof(TrainingCalendarBreakRow))]
public class TrainingCalendarBreakPage : Controller
{
    [Route("Administration/TrainingCalendarBreak")]
    public ActionResult Index()
    {
        return this.GridPage("@/Administration/TrainingCalendarBreak/TrainingCalendarBreakPage",
            TrainingCalendarBreakRow.Fields.PageTitle());
    }
}
