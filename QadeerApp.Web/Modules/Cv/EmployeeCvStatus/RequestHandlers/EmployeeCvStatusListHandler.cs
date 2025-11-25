using MyRow = QadeerApp.Cv.EmployeeCvStatusRow;

namespace QadeerApp.Cv;

public interface IEmployeeCvStatusListHandler : IListHandler<MyRow, ListRequest, ListResponse<MyRow>> { }

public class EmployeeCvStatusListHandler(IRequestContext context)
    : ListRequestHandler<MyRow>(context), IEmployeeCvStatusListHandler
{
    protected override void ApplyFilters(SqlQuery query)
    {
        base.ApplyFilters(query);

        query.Where(MyRow.Fields.IsActive == 1);
    }
}
