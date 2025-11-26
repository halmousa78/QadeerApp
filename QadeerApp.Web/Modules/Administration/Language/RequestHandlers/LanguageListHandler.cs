using MyRow = QadeerApp.Administration.LanguageRow;

namespace QadeerApp.Administration;
public interface ILanguageListHandler : IListHandler<MyRow> { }

public class LanguageListHandler(IRequestContext context)
    : ListRequestHandler<MyRow>(context), ILanguageListHandler
{
    protected override void ApplyFilters(SqlQuery query)
    {
        base.ApplyFilters(query);
        var fld = MyRow.Fields;
        query.Where(fld.LanguageId.In("en", "ar"));
    }
}
