using Microsoft.AspNetCore.Mvc;

namespace QadeerApp.Administration.Pages;

[PageAuthorize(typeof(TrainingCalendarNoteRow))]
public class TrainingCalendarNotePage : Controller
{
    [Route("Administration/TrainingCalendarNote")]
    public ActionResult Index()
    {
        return this.GridPage("@/Administration/TrainingCalendarNote/TrainingCalendarNotePage",
            TrainingCalendarNoteRow.Fields.PageTitle());
    }
}
