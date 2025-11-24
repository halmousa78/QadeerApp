using MyRow = QadeerApp.Administration.UserRow;

namespace QadeerApp.Administration;
public interface IUserSaveHandler : ISaveHandler<MyRow> { }

public class UserSaveHandler(IRequestContext context, IOptions<EnvironmentSettings> environmentOptions)
    : SaveRequestHandler<MyRow>(context), IUserSaveHandler
{
    private static MyRow.RowFields Fld { get { return MyRow.Fields; } }

    private string password;
    private readonly IOptions<EnvironmentSettings> environmentOptions = environmentOptions ??
        throw new ArgumentNullException(nameof(environmentOptions));
    private static SpecializationRow.RowFields SpecFld { get; } = SpecializationRow.Fields;

    protected override void GetEditableFields(HashSet<Field> editable)
    {
        base.GetEditableFields(editable);

        if (!Permissions.HasPermission(PermissionKeys.Security))
        {
            editable.Remove(Fld.Source);
            editable.Remove(Fld.IsActive);
        }
    }

    public static string ValidateUsername(IDbConnection connection, string username, int? existingUserId,
        ITextLocalizer localizer)
    {
        username = username.TrimToNull();

        if (username == null)
            throw DataValidation.RequiredError(Fld.Username, localizer);

        if (!UserHelper.IsValidUsername(username))
            throw new ValidationError("InvalidUsername", "Username",
                "Usernames should start with letters, only contain letters and numbers!");

        var existing = UserHelper.GetUser(connection,
            new Criteria(Fld.Username) == username |
            new Criteria(Fld.Username) == username.Replace('I', 'İ'));

        if (existing != null && existingUserId != existing.UserId)
            throw new ValidationError("UniqueViolation", "Username",
                "A user with same name exists. Please choose another!");

        return username;
    }

    protected override void ValidateRequest()
    {
        base.ValidateRequest();

        if (IsUpdate)
        {
            environmentOptions.CheckPublicDemo(Row.UserId);

            if (Row.Username != Old.Username)
                Row.Username = ValidateUsername(Connection, Row.Username, Old.UserId.Value, Localizer);

            if (Row.DisplayName != Old.DisplayName)
                Row.DisplayName = UserHelper.ValidateDisplayName(Row.DisplayName, Localizer);
        }

        if (IsCreate)
        {
            Row.Username = ValidateUsername(Connection, Row.Username, null, Localizer);
            Row.DisplayName = UserHelper.ValidateDisplayName(Row.DisplayName, Localizer);
        }

        var departmentId = Row.DepartmentId ?? Old?.DepartmentId;
        if (departmentId == null)
            throw DataValidation.RequiredError(Fld.DepartmentId, Localizer);

        var department = Connection.TryById<DepartmentRow>(departmentId.Value);
        if (department == null || department.IsActive != 1)
            throw new ValidationError("InvalidDepartment", "DepartmentId",
                "Selected department is not available.");

        var specializationId = Row.IsAssigned(Fld.SpecializationId)
            ? Row.SpecializationId
            : (Row.DepartmentId == null || Row.DepartmentId == Old?.DepartmentId ? Old?.SpecializationId : null);
        if (specializationId != null)
        {
            var specialization = Connection.TryById<SpecializationRow>(specializationId.Value);
            if (specialization == null || specialization.DepartmentId != departmentId || specialization.IsActive != 1)
                throw new ValidationError("InvalidSpecialization", "SpecializationId",
                    "Selected specialization is not available for this department.");
        }
        else
        {
            var hasActiveSpecializations = Connection.Exists<SpecializationRow>(
                SpecFld.DepartmentId == departmentId.Value &
                SpecFld.IsActive == 1);

            if (hasActiveSpecializations)
                throw new ValidationError("SpecializationRequired", "SpecializationId",
                    "Please select a specialization for the chosen department.");
        }

        Row.DepartmentId = departmentId;
        Row.SpecializationId = specializationId;

        if (IsCreate || (Row.IsAssigned(Fld.Password) && !Row.Password.IsEmptyOrNull()))
        {
            if (Row.IsAssigned(Fld.PasswordConfirm) && !Row.PasswordConfirm.IsEmptyOrNull() &&
                Row.Password != Row.PasswordConfirm)
                throw new ValidationError("PasswordConfirmMismatch", "PasswordConfirm",
                    ChangePasswordValidationTexts.PasswordConfirmMismatch.ToString(Localizer));

            password = Row.Password = UserHelper.ValidatePassword(Row.Password, Localizer);
        }
    }

    protected override void SetInternalFields()
    {
        base.SetInternalFields();

        if (IsCreate)
        {
            Row.Source = "site";
            Row.IsActive = Row.IsActive ?? 1;
        }

        if (IsCreate || !Row.Password.IsEmptyOrNull())
        {
            string salt = null;
            Row.PasswordHash = UserHelper.GenerateHash(password, ref salt);
            Row.PasswordSalt = salt;
        }
    }

    protected override void AfterSave()
    {
        base.AfterSave();

        Cache.InvalidateOnCommit(UnitOfWork, Fld);
    }
}
