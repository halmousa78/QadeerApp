using Microsoft.AspNetCore.Mvc;

namespace QadeerApp.Administration.Pages;

[PageAuthorize(typeof(TrainingTermRow))]
public class TrainingTermPage : Controller
{
    [Route("Administration/TrainingTerm")]
    public ActionResult Index()
    {
        return this.GridPage("@/Administration/TrainingTerm/TrainingTermPage",
            TrainingTermRow.Fields.PageTitle());
    }
}
