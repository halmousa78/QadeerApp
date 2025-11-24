using QadeerApp.Administration;

namespace QadeerApp.Membership;

[FormScript("Membership.SignUp")]
public class SignUpForm
{
    [Required(true), Placeholder("full name")]
    public string DisplayName { get; set; }
    [LookupEditor(typeof(DepartmentRow), InplaceAdd = false)]
    [Required(true)]
    public int DepartmentId { get; set; }
    [LookupEditor(typeof(SpecializationRow), CascadeFrom = "DepartmentId", CascadeField = "DepartmentId", InplaceAdd = false)]
    public int? SpecializationId { get; set; }
    [EmailAddressEditor, Required(true), Placeholder("email")]
    public string Email { get; set; }
    [EmailAddressEditor, Required(true), Placeholder("confirm email")]
    public string ConfirmEmail { get; set; }
    [PasswordEditor, Required(true), Placeholder("password")]
    public string Password { get; set; }
    [PasswordEditor, Required(true), Placeholder("confirm password")]
    public string ConfirmPassword { get; set; }
}
