namespace QadeerApp.Membership;

public class SignUpRequest : ServiceRequest
{
    public string DisplayName { get; set; }
    public int DepartmentId { get; set; }
    public int? SpecializationId { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}
