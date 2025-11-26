using MyRow = QadeerApp.Administration.LanguageRow;

namespace QadeerApp.Administration;
public interface ILanguageDeleteHandler : IDeleteHandler<MyRow> { }

public class LanguageDeleteHandler(IRequestContext context)
    : DeleteRequestHandler<MyRow>(context), ILanguageDeleteHandler
{
    protected override void ValidateRequest()
    {
        base.ValidateRequest();
        if (Request?.EntityId != null)
        {
            var id = Convert.ToString(Request.EntityId);
            if (id == "en" || id == "ar")
                throw new ValidationError("LanguageProtected", "LanguageId", "لا يمكن حذف اللغات الأساسية (en, ar).");
        }
    }
}
