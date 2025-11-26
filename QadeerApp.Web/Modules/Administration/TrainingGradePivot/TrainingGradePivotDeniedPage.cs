using Microsoft.AspNetCore.Mvc;

namespace QadeerApp.Administration.Pages;

[PageAuthorize(typeof(TrainingGradeRow))]
public class TrainingGradePivotDeniedPage : Controller
{
    [Route("Administration/TrainingGradePivotDenied")]
    public ActionResult Index()
    {
        return this.GridPage("@/Administration/TrainingGradePivot/TrainingGradePivotDeniedPage",
            "Training Grade Statistics");
    }
}
