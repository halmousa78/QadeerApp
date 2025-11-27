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

    [Description("Training Calendars Management")]
    public const string TrainingCalendars = "Administration:TrainingCalendars";

    [Description("Portal Links Management")]
    public const string PortalLinks = "Administration:PortalLinks";

    [Description("Training Schedule Imports")]
    public const string TrainingScheduleImports = "Administration:TrainingScheduleImports";

    [Description("Training Course Files")]
    public const string TrainingCourseFiles = "Administration:TrainingCourseFiles";

    [NestedPermissionKeys, DisplayName("Departments")]
    public class Department
    {
        public const string View = "Administration:Departments:View";
        public const string Insert = "Administration:Departments:Insert";
        public const string Update = "Administration:Departments:Update";
        public const string Delete = "Administration:Departments:Delete";
    }

    [NestedPermissionKeys, DisplayName("Languages")]
    public class Language
    {
        public const string View = "Administration:Translation:View";
        public const string Insert = "Administration:Translation:Insert";
        public const string Update = "Administration:Translation:Update";
        public const string Delete = "Administration:Translation:Delete";
    }

    [NestedPermissionKeys, DisplayName("Specializations")]
    public class Specialization
    {
        public const string View = "Administration:Specializations:View";
        public const string Insert = "Administration:Specializations:Insert";
        public const string Update = "Administration:Specializations:Update";
        public const string Delete = "Administration:Specializations:Delete";
    }

    [NestedPermissionKeys, DisplayName("Training Terms")]
    public class TrainingTerm
    {
        public const string View = "Administration:TrainingTerms:View";
        public const string Insert = "Administration:TrainingTerms:Insert";
        public const string Update = "Administration:TrainingTerms:Update";
        public const string Delete = "Administration:TrainingTerms:Delete";
    }

    [NestedPermissionKeys, DisplayName("Training Courses")]
    public class TrainingCourse
    {
        public const string View = "Administration:TrainingCourses:View";
        public const string Insert = "Administration:TrainingCourses:Insert";
        public const string Update = "Administration:TrainingCourses:Update";
        public const string Delete = "Administration:TrainingCourses:Delete";
    }

    [NestedPermissionKeys, DisplayName("Training Grades")]
    public class TrainingGrade
    {
        public const string View = "Administration:TrainingGrades:View";
        public const string Insert = "Administration:TrainingGrades:Insert";
        public const string Update = "Administration:TrainingGrades:Update";
        public const string Delete = "Administration:TrainingGrades:Delete";
    }

    [NestedPermissionKeys, DisplayName("Training Calendars")]
    public class TrainingCalendar
    {
        public const string View = "Administration:TrainingCalendars:View";
        public const string Insert = "Administration:TrainingCalendars:Insert";
        public const string Update = "Administration:TrainingCalendars:Update";
        public const string Delete = "Administration:TrainingCalendars:Delete";
    }

    [NestedPermissionKeys, DisplayName("Portal Links")]
    public class PortalLink
    {
        public const string View = "Administration:PortalLinks:View";
        public const string Insert = "Administration:PortalLinks:Insert";
        public const string Update = "Administration:PortalLinks:Update";
        public const string Delete = "Administration:PortalLinks:Delete";
    }

    [NestedPermissionKeys, DisplayName("Training Schedule Imports")]
    public class TrainingScheduleImport
    {
        public const string View = "Administration:TrainingScheduleImports:View";
        public const string Insert = "Administration:TrainingScheduleImports:Insert";
        public const string Update = "Administration:TrainingScheduleImports:Update";
        public const string Delete = "Administration:TrainingScheduleImports:Delete";
    }

    [NestedPermissionKeys, DisplayName("Training Course Files")]
    public class TrainingCourseFile
    {
        public const string View = "Administration:TrainingCourseFiles:View";
        public const string Insert = "Administration:TrainingCourseFiles:Insert";
        public const string Update = "Administration:TrainingCourseFiles:Update";
        public const string Delete = "Administration:TrainingCourseFiles:Delete";
    }

    [NestedPermissionKeys, DisplayName("Users")]
    public class User
    {
        public const string View = "Administration:Security:Users:View";
        public const string Insert = "Administration:Security:Users:Insert";
        public const string Update = "Administration:Security:Users:Update";
        public const string Delete = "Administration:Security:Users:Delete";
    }

    [NestedPermissionKeys, DisplayName("Roles")]
    public class Role
    {
        public const string View = "Administration:Security:Roles:View";
        public const string Insert = "Administration:Security:Roles:Insert";
        public const string Update = "Administration:Security:Roles:Update";
        public const string Delete = "Administration:Security:Roles:Delete";
    }

    [NestedPermissionKeys, DisplayName("Role Permissions")]
    public class RolePermission
    {
        public const string View = "Administration:Security:RolePermissions:View";
        public const string Insert = "Administration:Security:RolePermissions:Insert";
        public const string Update = "Administration:Security:RolePermissions:Update";
        public const string Delete = "Administration:Security:RolePermissions:Delete";
    }

    [NestedPermissionKeys, DisplayName("User Permissions")]
    public class UserPermission
    {
        public const string View = "Administration:Security:UserPermissions:View";
        public const string Insert = "Administration:Security:UserPermissions:Insert";
        public const string Update = "Administration:Security:UserPermissions:Update";
        public const string Delete = "Administration:Security:UserPermissions:Delete";
    }

    [NestedPermissionKeys, DisplayName("User Roles")]
    public class UserRole
    {
        public const string View = "Administration:Security:UserRoles:View";
        public const string Insert = "Administration:Security:UserRoles:Insert";
        public const string Update = "Administration:Security:UserRoles:Update";
        public const string Delete = "Administration:Security:UserRoles:Delete";
    }
}
