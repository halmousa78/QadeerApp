namespace QadeerApp.Administration;

[NestedPermissionKeys]
[DisplayName("Administration")]
public class PermissionKeys
{
    [Description("User, Role Management and Permissions")]
    public const string Security = "Administration:Security";

    [Description("Languages and Translations")]
    public const string Translation = "Administration:Translation";

    [Description("Departments Management")]
    public const string Departments = "Administration:Departments";

    [Description("Specializations Management")]
    public const string Specializations = "Administration:Specializations";

    [Description("Training Terms Management")]
    public const string TrainingTerms = "Administration:TrainingTerms";

    [Description("Training Courses Management")]
    public const string TrainingCourses = "Administration:TrainingCourses";

    [Description("Training Grades Import")]
    public const string TrainingGrades = "Administration:TrainingGrades";
}
