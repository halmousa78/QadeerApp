using Microsoft.AspNetCore.Mvc;

namespace QadeerApp.Administration.Pages;

[PageAuthorize(typeof(TrainingGradeRow))]
public class TrainingGradePivotPage : Controller
{
    [Route("Administration/TrainingGradePivot")]
    public ActionResult Index()
    {
        return this.GridPage("@/Administration/TrainingGradePivot/TrainingGradePivotPage",
            "إحصائية التقديرات");
    }
}
