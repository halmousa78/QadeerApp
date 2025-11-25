namespace QadeerApp.Administration;

public class BulkStatusRequest : ServiceRequest
{
    public string TrainingTerm { get; set; }
    public bool IsActive { get; set; }
}
