using MyRow = QadeerApp.Cv.EmployeeCvRow;
using QadeerApp.Administration;

namespace QadeerApp.Cv;

public interface IEmployeeCvListHandler : IListHandler<MyRow, ListRequest, ListResponse<MyRow>> { }

public class EmployeeCvListHandler(IRequestContext context)
    : ListRequestHandler<MyRow>(context), IEmployeeCvListHandler
{
    protected override void ApplyFilters(SqlQuery query)
    {
        base.ApplyFilters(query);

        if (HasFullAccess())
            return;

        var identifier = Context.User?.GetIdentifier();
        if (int.TryParse(identifier, out var userId))
            query.Where(MyRow.Fields.UserId == userId);
        else
            query.Where(new Criteria("1") == 0);
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
