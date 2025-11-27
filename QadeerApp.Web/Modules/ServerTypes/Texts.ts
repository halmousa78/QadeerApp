import { proxyTexts } from "@serenity-is/corelib";

namespace texts {
    export declare namespace Db {
        export function asKey(): typeof Db;
        export function asTry(): typeof Db;
        namespace Administration {
            export function asKey(): typeof Administration;
            export function asTry(): typeof Administration;
            namespace Department {
                export function asKey(): typeof Department;
                export function asTry(): typeof Department;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentId: string;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Name: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
            namespace Language {
                export function asKey(): typeof Language;
                export function asTry(): typeof Language;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const LanguageId: string;
                export const LanguageName: string;
            }
            namespace PortalLink {
                export function asKey(): typeof PortalLink;
                export function asTry(): typeof PortalLink;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentId: string;
                export const DepartmentName: string;
                export const DisplayOrder: string;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const PortalLinkId: string;
                export const Section: string;
                export const SpecializationId: string;
                export const SpecializationName: string;
                export const Title: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const Url: string;
            }
            namespace Role {
                export function asKey(): typeof Role;
                export function asTry(): typeof Role;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const RoleId: string;
                export const RoleName: string;
            }
            namespace RolePermission {
                export function asKey(): typeof RolePermission;
                export function asTry(): typeof RolePermission;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const PermissionKey: string;
                export const RoleId: string;
                export const RoleName: string;
                export const RolePermissionId: string;
            }
            namespace Specialization {
                export function asKey(): typeof Specialization;
                export function asTry(): typeof Specialization;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentId: string;
                export const DepartmentName: string;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Name: string;
                export const SpecializationId: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
            namespace TrainingCalendar {
                export function asKey(): typeof TrainingCalendar;
                export function asTry(): typeof TrainingCalendar;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EndDate: string;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const IsEnabled: string;
                export const Name: string;
                export const StartDate: string;
                export const TrainingCalendarId: string;
                export const TrainingTermId: string;
                export const TrainingTermName: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
            namespace TrainingCalendarBreak {
                export function asKey(): typeof TrainingCalendarBreak;
                export function asTry(): typeof TrainingCalendarBreak;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EndDate: string;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const StartDate: string;
                export const Title: string;
                export const TrainingCalendarBreakId: string;
                export const TrainingCalendarId: string;
                export const TrainingCalendarName: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
            namespace TrainingCalendarNote {
                export function asKey(): typeof TrainingCalendarNote;
                export function asTry(): typeof TrainingCalendarNote;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const NoteDate: string;
                export const NoteText: string;
                export const Title: string;
                export const TrainingCalendarId: string;
                export const TrainingCalendarName: string;
                export const TrainingCalendarNoteId: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
            namespace TrainingCourse {
                export function asKey(): typeof TrainingCourse;
                export function asTry(): typeof TrainingCourse;
                export const Code: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const DepartmentId: string;
                export const DepartmentName: string;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Name: string;
                export const SpecializationId: string;
                export const SpecializationName: string;
                export const TrainingCourseId: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
            namespace TrainingCourseFile {
                export function asKey(): typeof TrainingCourseFile;
                export function asTry(): typeof TrainingCourseFile;
                export const Building: string;
                export const ContactHours: string;
                export const Course: string;
                export const CourseCoordinator: string;
                export const CourseDescription: string;
                export const Day: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Department: string;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const FromText: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const LectureCount: string;
                export const LectureDescription: string;
                export const ReferenceNumber: string;
                export const RoomName: string;
                export const RoomNumber: string;
                export const Time: string;
                export const ToText: string;
                export const TrainerName: string;
                export const TrainerNumber: string;
                export const TrainingCourseFileId: string;
                export const TrainingTerm: string;
                export const TrainingType: string;
                export const TrainingUnit: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
            namespace TrainingGrade {
                export function asKey(): typeof TrainingGrade;
                export function asTry(): typeof TrainingGrade;
                export const CourseCode: string;
                export const CourseName: string;
                export const Department: string;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const Grade: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const ReferenceNumber: string;
                export const RegistrationStatus: string;
                export const ScheduleType: string;
                export const Specialization: string;
                export const TraineeStatus: string;
                export const TrainerName: string;
                export const TrainerNumber: string;
                export const TrainingGradeId: string;
                export const TrainingLevel: string;
                export const TrainingTerm: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
            namespace TrainingScheduleImport {
                export function asKey(): typeof TrainingScheduleImport;
                export function asTry(): typeof TrainingScheduleImport;
                export const Building: string;
                export const ContactHours: string;
                export const Course: string;
                export const CourseDescription: string;
                export const Day: string;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const Department: string;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const FromText: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const LectureCount: string;
                export const LectureDescription: string;
                export const ReferenceNumber: string;
                export const RoomName: string;
                export const RoomNumber: string;
                export const Time: string;
                export const ToText: string;
                export const TrainerName: string;
                export const TrainerNumber: string;
                export const TrainingScheduleImportId: string;
                export const TrainingTerm: string;
                export const TrainingType: string;
                export const TrainingUnit: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
            namespace TrainingTerm {
                export function asKey(): typeof TrainingTerm;
                export function asTry(): typeof TrainingTerm;
                export const DeleteDate: string;
                export const DeleteUserId: string;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const Name: string;
                export const TrainingTermId: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
            }
            namespace User {
                export function asKey(): typeof User;
                export function asTry(): typeof User;
                export const DepartmentId: string;
                export const DepartmentName: string;
                export const DisplayName: string;
                export const Email: string;
                export const EmployeeNumber: string;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const IsActive: string;
                export const LastDirectoryUpdate: string;
                export const Password: string;
                export const PasswordConfirm: string;
                export const PasswordHash: string;
                export const PasswordSalt: string;
                export const Roles: string;
                export const Source: string;
                export const SpecializationId: string;
                export const SpecializationName: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const UserId: string;
                export const UserImage: string;
                export const Username: string;
            }
            namespace UserPermission {
                export function asKey(): typeof UserPermission;
                export function asTry(): typeof UserPermission;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const Granted: string;
                export const PermissionKey: string;
                export const User: string;
                export const UserId: string;
                export const UserPermissionId: string;
                export const Username: string;
            }
            namespace UserRole {
                export function asKey(): typeof UserRole;
                export function asTry(): typeof UserRole;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const RoleId: string;
                export const RoleName: string;
                export const User: string;
                export const UserId: string;
                export const UserRoleId: string;
                export const Username: string;
            }
        }
        namespace Cv {
            export function asKey(): typeof Cv;
            export function asTry(): typeof Cv;
            namespace EmployeeCourse {
                export function asKey(): typeof EmployeeCourse;
                export function asTry(): typeof EmployeeCourse;
                export const EmployeeCourseId: string;
                export const EmployeeCvId: string;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const Name: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const UserId: string;
            }
            namespace EmployeeCv {
                export function asKey(): typeof EmployeeCv;
                export function asTry(): typeof EmployeeCv;
                export const Address: string;
                export const BuildingNumber: string;
                export const Courses: string;
                export const CvUpdatedOn: string;
                export const EmployeeCvId: string;
                export const EmployeeNumber: string;
                export const EnglishLevel: string;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const Experiences: string;
                export const ExtensionNumber: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const Mobile: string;
                export const OfficeNumber: string;
                export const Qualifications: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const UserDisplayName: string;
                export const UserId: string;
                export const Username: string;
            }
            namespace EmployeeCvStatus {
                export function asKey(): typeof EmployeeCvStatus;
                export function asTry(): typeof EmployeeCvStatus;
                export const CourseCount: string;
                export const CvUpdatedOn: string;
                export const DepartmentId: string;
                export const DepartmentName: string;
                export const DisplayName: string;
                export const EmployeeCvId: string;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const ExperienceCount: string;
                export const IsActive: string;
                export const IsCompleted: string;
                export const QualificationCount: string;
                export const SpecializationId: string;
                export const SpecializationName: string;
                export const UserId: string;
                export const Username: string;
            }
            namespace EmployeeExperience {
                export function asKey(): typeof EmployeeExperience;
                export function asTry(): typeof EmployeeExperience;
                export const EmployeeCvId: string;
                export const EmployeeExperienceId: string;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const Name: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const UserId: string;
            }
            namespace EmployeeQualification {
                export function asKey(): typeof EmployeeQualification;
                export function asTry(): typeof EmployeeQualification;
                export const EmployeeCvId: string;
                export const EmployeeQualificationId: string;
                export const EntityPlural: string;
                export const EntitySingular: string;
                export const InsertDate: string;
                export const InsertUserId: string;
                export const Name: string;
                export const UpdateDate: string;
                export const UpdateUserId: string;
                export const UserId: string;
            }
        }
    }
    export declare namespace Forms {
        export function asKey(): typeof Forms;
        export function asTry(): typeof Forms;
        namespace Membership {
            export function asKey(): typeof Membership;
            export function asTry(): typeof Membership;
            namespace Login {
                export function asKey(): typeof Login;
                export function asTry(): typeof Login;
                export const ForgotPassword: string;
                export const LoginToYourAccount: string;
                export const RememberMe: string;
                export const SignInButton: string;
                export const SignUpButton: string;
            }
            namespace SignUp {
                export function asKey(): typeof SignUp;
                export function asTry(): typeof SignUp;
                export const ActivateEmailSubject: string;
                export const ActivationCompleteMessage: string;
                export const ConfirmEmail: string;
                export const ConfirmPassword: string;
                export const DisplayName: string;
                export const Email: string;
                export const FormInfo: string;
                export const FormTitle: string;
                export const Password: string;
                export const SubmitButton: string;
                export const Success: string;
            }
        }
        export const SiteTitle: string;
    }
    export declare namespace Site {
        export function asKey(): typeof Site;
        export function asTry(): typeof Site;
        namespace AccessDenied {
            export function asKey(): typeof AccessDenied;
            export function asTry(): typeof AccessDenied;
            export const ClickToChangeUser: string;
            export const ClickToLogin: string;
            export const LackPermissions: string;
            export const NotLoggedIn: string;
            export const PageTitle: string;
        }
        namespace Layout {
            export function asKey(): typeof Layout;
            export function asTry(): typeof Layout;
            export const Language: string;
            export const Theme: string;
        }
        namespace RolePermissionDialog {
            export function asKey(): typeof RolePermissionDialog;
            export function asTry(): typeof RolePermissionDialog;
            export const DialogTitle: string;
            export const EditButton: string;
            export const SaveSuccess: string;
        }
        namespace UserDialog {
            export function asKey(): typeof UserDialog;
            export function asTry(): typeof UserDialog;
            export const EditPermissionsButton: string;
            export const EditRolesButton: string;
        }
        namespace UserPermissionDialog {
            export function asKey(): typeof UserPermissionDialog;
            export function asTry(): typeof UserPermissionDialog;
            export const DialogTitle: string;
            export const Grant: string;
            export const Permission: string;
            export const Revoke: string;
            export const SaveSuccess: string;
        }
        namespace ValidationError {
            export function asKey(): typeof ValidationError;
            export function asTry(): typeof ValidationError;
            export const Title: string;
        }
    }
    export declare namespace Validation {
        export function asKey(): typeof Validation;
        export function asTry(): typeof Validation;
        export const AuthenticationError: string;
        export const CurrentPasswordMismatch: string;
        export const DeleteForeignKeyError: string;
        export const EmailConfirm: string;
        export const EmailInUse: string;
        export const InvalidActivateToken: string;
        export const InvalidResetToken: string;
        export const MinRequiredPasswordLength: string;
        export const PasswordConfirmMismatch: string;
        export const SavePrimaryKeyError: string;
    }

}

const Texts: typeof texts = proxyTexts({}, '', {
    Db: {
        Administration: {
            Department: {},
            Language: {},
            PortalLink: {},
            Role: {},
            RolePermission: {},
            Specialization: {},
            TrainingCalendar: {},
            TrainingCalendarBreak: {},
            TrainingCalendarNote: {},
            TrainingCourse: {},
            TrainingCourseFile: {},
            TrainingGrade: {},
            TrainingScheduleImport: {},
            TrainingTerm: {},
            User: {},
            UserPermission: {},
            UserRole: {}
        },
        Cv: {
            EmployeeCourse: {},
            EmployeeCv: {},
            EmployeeCvStatus: {},
            EmployeeExperience: {},
            EmployeeQualification: {}
        }
    },
    Forms: {
        Membership: {
            Login: {},
            SignUp: {}
        }
    },
    Site: {
        AccessDenied: {},
        Layout: {},
        RolePermissionDialog: {},
        UserDialog: {},
        UserPermissionDialog: {},
        ValidationError: {}
    },
    Validation: {}
}) as any;

export const AccessDeniedViewTexts = Texts.Site.AccessDenied;
export const LoginFormTexts = Texts.Forms.Membership.Login;
export const MembershipValidationTexts = Texts.Validation;
export const RolePermissionDialogTexts = Texts.Site.RolePermissionDialog;
export const SignUpFormTexts = Texts.Forms.Membership.SignUp;
export const SiteFormTexts = Texts.Forms;
export const SiteLayoutTexts = Texts.Site.Layout;
export const SqlExceptionHelperTexts = Texts.Validation;
export const UserDialogTexts = Texts.Site.UserDialog;
export const UserPermissionDialogTexts = Texts.Site.UserPermissionDialog;
export const ValidationErrorViewTexts = Texts.Site.ValidationError;