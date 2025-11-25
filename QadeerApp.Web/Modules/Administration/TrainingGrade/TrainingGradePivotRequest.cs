namespace QadeerApp.Administration;

public class TrainingGradePivotRequest : ServiceRequest
{
    public string TrainingTerm { get; set; }
    public bool? IsActive { get; set; }
}
