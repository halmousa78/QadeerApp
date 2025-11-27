using Microsoft.AspNetCore.Mvc;

namespace QadeerApp.Administration.Pages;

[PageAuthorize(typeof(TrainingScheduleImportRow))]
public class TrainingScheduleImportPage : Controller
{
    [Route("Administration/TrainingScheduleImport")]
    public ActionResult Index()
    {
        return this.GridPage("@/Administration/TrainingScheduleImport/TrainingScheduleImportPage",
            TrainingScheduleImportRow.Fields.PageTitle());
    }
}
