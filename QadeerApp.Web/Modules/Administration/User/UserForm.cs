namespace QadeerApp.Administration.Forms;

[FormScript("Administration.User")]
[BasedOnRow(typeof(UserRow), CheckNames = true)]
public class UserForm
{
    [LabelWidth(200, UntilNext = true)]
    public string Username { get; set; }
    public string DisplayName { get; set; }
    [LookupEditor(typeof(DepartmentRow), InplaceAdd = false)]
    [Required(true)]
    public int DepartmentId { get; set; }
    [LookupEditor(typeof(SpecializationRow), CascadeFrom = "DepartmentId", CascadeField = "DepartmentId", InplaceAdd = false)]
    public int? SpecializationId { get; set; }
    [EmailAddressEditor]
    public string Email { get; set; }
    [LookupEditor(typeof(RoleRow), Multiple = true)]
    public List<int> Roles { get; set; }
    public string UserImage { get; set; }
    [PasswordEditor, Required(true)]
    public string Password { get; set; }
    [PasswordEditor, Required(true)]
    public string PasswordConfirm { get; set; }
    [SkipOnSave]
    public string Source { get; set; }
    public bool IsActive { get; set; }
}
