using Microsoft.AspNetCore.Mvc;

namespace QadeerApp.Administration.Pages;

[PageAuthorize(typeof(TrainingGradeRow))]
public class TrainingGradePage : Controller
{
    [Route("Administration/TrainingGrade")]
    public ActionResult Index()
    {
        return this.GridPage("@/Administration/TrainingGrade/TrainingGradePage",
            TrainingGradeRow.Fields.PageTitle());
    }
}
