namespace QadeerApp.MVC;

public static partial class ESM
{
    public const string DepartmentPage = "~/esm/Modules/Administration/Department/DepartmentPage.js";
    public const string EmployeeCvPage = "~/esm/Modules/Cv/EmployeeCv/EmployeeCvPage.js";
    public const string EmployeeCvStatusPage = "~/esm/Modules/Cv/EmployeeCvStatus/EmployeeCvStatusPage.js";
    public const string LanguagePage = "~/esm/Modules/Administration/Language/LanguagePage.js";
    public const string LoginPage = "~/esm/Modules/Membership/Account/Login/LoginPage.js";
    public const string RolePage = "~/esm/Modules/Administration/Role/RolePage.js";
    public const string ScriptInit = "~/esm/Modules/Common/ScriptInit.js";
    public const string SignUpPage = "~/esm/Modules/Membership/Account/SignUp/SignUpPage.js";
    public const string SpecializationPage = "~/esm/Modules/Administration/Specialization/SpecializationPage.js";
    public const string TranslationPage = "~/esm/Modules/Administration/Translation/TranslationPage.js";
    public const string UserPage = "~/esm/Modules/Administration/User/UserPage.js";

    public static partial class Modules
    {
        public static partial class Administration
        {
            public static partial class Department
            {
                public const string DepartmentPage = "~/esm/Modules/Administration/Department/DepartmentPage.js";
            }

            public static partial class Language
            {
                public const string LanguagePage = "~/esm/Modules/Administration/Language/LanguagePage.js";
            }

            public static partial class Role
            {
                public const string RolePage = "~/esm/Modules/Administration/Role/RolePage.js";
            }

            public static partial class Specialization
            {
                public const string SpecializationPage = "~/esm/Modules/Administration/Specialization/SpecializationPage.js";
            }

            public static partial class Translation
            {
                public const string TranslationPage = "~/esm/Modules/Administration/Translation/TranslationPage.js";
            }

            public static partial class User
            {
                public const string UserPage = "~/esm/Modules/Administration/User/UserPage.js";
            }
        }

        public static partial class Common
        {
            public const string ScriptInit = "~/esm/Modules/Common/ScriptInit.js";
        }

        public static partial class Cv
        {
            public static partial class EmployeeCv
            {
                public const string EmployeeCvPage = "~/esm/Modules/Cv/EmployeeCv/EmployeeCvPage.js";
            }

            public static partial class EmployeeCvStatus
            {
                public const string EmployeeCvStatusPage = "~/esm/Modules/Cv/EmployeeCvStatus/EmployeeCvStatusPage.js";
            }
        }

        public static partial class Membership
        {
            public static partial class Account
            {
                public static partial class Login
                {
                    public const string LoginPage = "~/esm/Modules/Membership/Account/Login/LoginPage.js";
                }

                public static partial class SignUp
                {
                    public const string SignUpPage = "~/esm/Modules/Membership/Account/SignUp/SignUpPage.js";
                }
            }
        }
    }
}