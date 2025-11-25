using MyRow = QadeerApp.Cv.EmployeeCvRow;
using QadeerApp.Administration;

namespace QadeerApp.Cv;

public interface IEmployeeCvDeleteHandler : IDeleteHandler<MyRow> { }

public class EmployeeCvDeleteHandler(IRequestContext context)
    : DeleteRequestHandler<MyRow>(context), IEmployeeCvDeleteHandler
{
    protected override void OnBeforeDelete()
    {
        base.OnBeforeDelete();

        if (!HasFullAccess())
        {
            throw new ValidationError("DeleteNotAllowed", "EmployeeCvId",
                "حذف السيرة الذاتية متاح للمدير فقط.");
        }
    }

    private bool HasFullAccess()
    {
        return Permissions.HasPermission(CvPermissionKeys.Manage) ||
            Permissions.HasPermission(CvPermissionKeys.Report) ||
            Permissions.HasPermission(PermissionKeys.Security);
    }
}
