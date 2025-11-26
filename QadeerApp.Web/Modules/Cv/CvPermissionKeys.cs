namespace QadeerApp.Cv;

[NestedPermissionKeys]
[DisplayName("CV")]
public class CvPermissionKeys
{
    [Description("Manage CV")]
    public const string Manage = "Cv:Manage";

    [Description("CV Reports")]
    public const string Report = "Cv:Report";

    [NestedPermissionKeys, DisplayName("Employee CV")]
    public class EmployeeCv
    {
        [Description("View CV")]
        public const string View = "Cv:EmployeeCv:View";
        public const string Insert = "Cv:EmployeeCv:Insert";
        public const string Update = "Cv:EmployeeCv:Update";
        public const string Delete = "Cv:EmployeeCv:Delete";
    }

    [NestedPermissionKeys, DisplayName("Employee Courses")]
    public class EmployeeCourse
    {
        [Description("View courses")]
        public const string View = "Cv:EmployeeCourse:View";
        public const string Insert = "Cv:EmployeeCourse:Insert";
        public const string Update = "Cv:EmployeeCourse:Update";
        public const string Delete = "Cv:EmployeeCourse:Delete";
    }

    [NestedPermissionKeys, DisplayName("Employee Experiences")]
    public class EmployeeExperience
    {
        [Description("View experiences")]
        public const string View = "Cv:EmployeeExperience:View";
        public const string Insert = "Cv:EmployeeExperience:Insert";
        public const string Update = "Cv:EmployeeExperience:Update";
        public const string Delete = "Cv:EmployeeExperience:Delete";
    }

    [NestedPermissionKeys, DisplayName("Employee Qualifications")]
    public class EmployeeQualification
    {
        [Description("View qualifications")]
        public const string View = "Cv:EmployeeQualification:View";
        public const string Insert = "Cv:EmployeeQualification:Insert";
        public const string Update = "Cv:EmployeeQualification:Update";
        public const string Delete = "Cv:EmployeeQualification:Delete";
    }
}
