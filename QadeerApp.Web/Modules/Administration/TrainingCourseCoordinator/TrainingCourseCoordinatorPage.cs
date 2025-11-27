using Microsoft.AspNetCore.Mvc;

namespace QadeerApp.Administration.Pages;

[PageAuthorize(typeof(TrainingCourseFileRow))]
public class TrainingCourseCoordinatorPage : Controller
{
    [Route("Administration/TrainingCourseCoordinators")]
    public ActionResult Index()
    {
        return this.GridPage("@/Administration/TrainingCourseCoordinator/TrainingCourseCoordinatorPage",
            "Course Coordinators");
    }
}
