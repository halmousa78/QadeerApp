namespace QadeerApp.Administration;

public class TrainingCourseImportResponse : ServiceResponse
{
    public int Inserted { get; set; }
    public int Failed { get; set; }
    public int Total { get; set; }
    public List<string> Errors { get; set; } = new();
}
