using Microsoft.AspNetCore.Mvc;

namespace QadeerApp.Administration.Pages;

[PageAuthorize(typeof(TrainingCourseFileRow))]
public class TrainingCourseFilePage : Controller
{
    [Route("Administration/TrainingCourseFile")]
    public ActionResult Index()
    {
        return this.GridPage("@/Administration/TrainingCourseFile/TrainingCourseFilePage",
            TrainingCourseFileRow.Fields.PageTitle());
    }
}
