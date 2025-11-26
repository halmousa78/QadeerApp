using Microsoft.AspNetCore.Http;

namespace QadeerApp.Administration;

public class TrainingCourseImportRequest : ServiceRequest
{
    public IFormFile File { get; set; }
}
