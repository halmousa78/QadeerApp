using MyRow = QadeerApp.Administration.LanguageRow;

namespace QadeerApp.Administration;
public interface ILanguageSaveHandler : ISaveHandler<MyRow> { }

public class LanguageSaveHandler(IRequestContext context)
    : SaveRequestHandler<MyRow>(context), ILanguageSaveHandler
{
    protected override void BeforeSave()
    {
        base.BeforeSave();
        var id = Row.LanguageId?.Trim();
        if (id != "en" && id != "ar")
            throw new ValidationError("LanguageNotAllowed", "LanguageId", "مسموح فقط باللغات: en, ar.");
    }
}
