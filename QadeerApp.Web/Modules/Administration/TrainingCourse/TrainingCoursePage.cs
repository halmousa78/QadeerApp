using Microsoft.AspNetCore.Mvc;

namespace QadeerApp.Administration.Pages;

[PageAuthorize(typeof(TrainingCourseRow))]
public class TrainingCoursePage : Controller
{
    [Route("Administration/TrainingCourse")]
    public ActionResult Index()
    {
        return this.GridPage("@/Administration/TrainingCourse/TrainingCoursePage",
            TrainingCourseRow.Fields.PageTitle());
    }
}
