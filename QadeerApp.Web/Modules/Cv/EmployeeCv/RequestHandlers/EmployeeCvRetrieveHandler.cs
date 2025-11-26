using MyRow = QadeerApp.Cv.EmployeeCvRow;
using QadeerApp.Administration;

namespace QadeerApp.Cv;

public interface IEmployeeCvRetrieveHandler : IRetrieveHandler<MyRow, RetrieveRequest, RetrieveResponse<MyRow>> { }

public class EmployeeCvRetrieveHandler(IRequestContext context)
    : RetrieveRequestHandler<MyRow>(context), IEmployeeCvRetrieveHandler
{
    protected override void OnReturn()
    {
        base.OnReturn();

        if (HasFullAccess())
            return;

        var identifier = Context.User?.GetIdentifier();
        if (!int.TryParse(identifier, out var userId) || Response?.Entity?.UserId != userId)
            throw new ValidationError("Authorization", "UserId", "لا يمكنك عرض سيرة موظف آخر.");
    }

    private bool HasFullAccess()
    {
        return Permissions.HasPermission(CvPermissionKeys.EmployeeCv.View) ||
            Permissions.HasPermission(CvPermissionKeys.EmployeeCv.Update) ||
            Permissions.HasPermission(CvPermissionKeys.EmployeeCv.Insert) ||
            Permissions.HasPermission(CvPermissionKeys.EmployeeCv.Delete) ||
            Permissions.HasPermission(CvPermissionKeys.Manage) ||
            Permissions.HasPermission(CvPermissionKeys.Report) ||
            Permissions.HasPermission(PermissionKeys.Security);
    }
}
