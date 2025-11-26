using System.Text.RegularExpressions;
using QadeerApp.Administration;
using MyRow = QadeerApp.Cv.EmployeeCvRow;

namespace QadeerApp.Cv;

public interface IEmployeeCvSaveHandler : ISaveHandler<MyRow> { }

public class EmployeeCvSaveHandler(IRequestContext context)
    : SaveRequestHandler<MyRow>(context), IEmployeeCvSaveHandler
{
    private static readonly Regex MobileRegex = new("^05\\d{8}$");
    private static readonly Regex ExtensionRegex = new("^\\d{4}$");

    private bool CanManageAll =>
        Permissions.HasPermission(CvPermissionKeys.EmployeeCv.Insert) ||
        Permissions.HasPermission(CvPermissionKeys.EmployeeCv.Update) ||
        Permissions.HasPermission(CvPermissionKeys.EmployeeCv.Delete) ||
        Permissions.HasPermission(CvPermissionKeys.Manage) ||
        Permissions.HasPermission(CvPermissionKeys.Report) ||
        Permissions.HasPermission(PermissionKeys.Security);

    private int? GetCurrentUserId()
    {
        var identifier = Context.User?.GetIdentifier();
        return int.TryParse(identifier, out var id) ? id : null;
    }

    protected override void ValidateRequest()
    {
        var currentUserId = GetCurrentUserId();

        if (!CanManageAll)
        {
            if (currentUserId == null)
                throw new ValidationError("UserId", "UserId", "لا يمكن تحديد المستخدم الحالي.");

            if (Row.UserId == null)
            Row.UserId = currentUserId;
        }
        else if (Row.UserId == null)
        {
            // للمدير، إن لم يحدد موظفاً نربطه بالمستخدم الحالي
            if (currentUserId != null)
                Row.UserId = currentUserId;
            else
                throw new ValidationError("UserId", "UserId", "يجب اختيار الموظف عند إنشاء السيرة الذاتية.");
        }

        base.ValidateRequest();

        Row.Mobile = NormalizeDigits(Row.Mobile);
        Row.ExtensionNumber = NormalizeDigits(Row.ExtensionNumber);
        Row.OfficeNumber = NormalizeDigits(Row.OfficeNumber);
        Row.BuildingNumber = NormalizeDigits(Row.BuildingNumber);

        if (string.IsNullOrWhiteSpace(Row.Mobile))
            throw new ValidationError("Mobile", "Mobile", "رقم الجوال إجباري.");

        if (!MobileRegex.IsMatch(Row.Mobile.Trim()))
            throw new ValidationError("Mobile", "Mobile", "رقم الجوال يجب أن يبدأ ب 05 وأن يكون مكوناً من 10 أرقام.");

        if (Row.EnglishLevel == null)
            throw new ValidationError("EnglishLevel", "EnglishLevel", "مستوى اللغة الإنجليزية إجباري.");

        if (string.IsNullOrWhiteSpace(Row.Address))
            throw new ValidationError("Address", "Address", "العنوان إجباري.");

        if (string.IsNullOrWhiteSpace(Row.ExtensionNumber))
            throw new ValidationError("ExtensionNumber", "ExtensionNumber", "رقم التحويلة إجباري.");

        if (!ExtensionRegex.IsMatch(Row.ExtensionNumber.Trim()))
            throw new ValidationError("ExtensionNumber", "ExtensionNumber", "رقم التحويلة يجب أن يتكون من 4 أرقام.");

        if (string.IsNullOrWhiteSpace(Row.OfficeNumber))
            throw new ValidationError("OfficeNumber", "OfficeNumber", "رقم المكتب إجباري.");

        if (!int.TryParse(Row.OfficeNumber.Trim(), out _))
            throw new ValidationError("OfficeNumber", "OfficeNumber", "رقم المكتب يجب أن يكون أرقاماً فقط.");

        if (string.IsNullOrWhiteSpace(Row.BuildingNumber))
            throw new ValidationError("BuildingNumber", "BuildingNumber", "رقم المبنى إجباري.");

        if (!int.TryParse(Row.BuildingNumber.Trim(), out _))
            throw new ValidationError("BuildingNumber", "BuildingNumber", "رقم المبنى يجب أن يكون أرقاماً فقط.");

        EnsureDetailList(Row.Qualifications, "Qualifications", "يجب إضافة مؤهل واحد على الأقل.");
        EnsureDetailList(Row.Experiences, "Experiences", "يجب إضافة خبرة واحدة على الأقل.");
        EnsureDetailList(Row.Courses, "Courses", "يجب إضافة دورة واحدة على الأقل.");
    }

    private static void EnsureDetailList<TDetail>(IList<TDetail> list, string field, string message)
    {
        if (list == null || list.Count == 0)
            throw new ValidationError(field, field, message);
    }

    private static string NormalizeDigits(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return value;

        var normalized = value.Trim();
        var arabicIndic = "٠١٢٣٤٥٦٧٨٩";
        var latin = "0123456789";

        var chars = normalized.ToCharArray();
        for (var i = 0; i < chars.Length; i++)
        {
            var idx = arabicIndic.IndexOf(chars[i]);
            if (idx >= 0)
                chars[i] = latin[idx];
        }

        return new string(chars);
    }

    protected override void BeforeSave()
    {
        base.BeforeSave();

        var currentUserId = GetCurrentUserId();

        if (!CanManageAll)
        {
            if (currentUserId == null)
                throw new ValidationError("User", "User", "لا يمكن تحديد المستخدم الحالي.");

            if (IsUpdate && Row.UserId != null && Row.UserId != currentUserId)
                throw new ValidationError("UserId", "UserId", "لا يمكنك تعديل سجل موظف آخر.");

            Row.UserId = currentUserId;
        }

        var userIdToUse = Row.UserId ?? currentUserId;
        if (userIdToUse == null)
            throw new ValidationError("UserId", "UserId", "يجب ربط السيرة الذاتية بمستخدم.");

        var existing = IsUpdate && Row.EmployeeCvId != null
            ? Connection.TryById<MyRow>(Row.EmployeeCvId.Value)
            : null;

        if (existing != null && !CanManageAll && existing.UserId != userIdToUse)
            throw new ValidationError("UserId", "UserId", "لا يمكنك تعديل سجل موظف آخر.");

        var duplicateExists = Connection.Exists<MyRow>(
            MyRow.Fields.UserId == userIdToUse.Value &
            new Criteria(MyRow.Fields.EmployeeCvId) != (Row.EmployeeCvId ?? 0));

        if (duplicateExists)
            throw new ValidationError("UserId", "UserId", "يوجد سيرة ذاتية مسجلة لهذا المستخدم.");
    }
}
