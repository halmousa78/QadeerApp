using MyRow = QadeerApp.Administration.PortalLinkRow;

namespace QadeerApp.Administration;

public interface IPortalLinkSaveHandler : ISaveHandler<MyRow> { }

public class PortalLinkSaveHandler(IRequestContext context)
    : SaveRequestHandler<MyRow>(context), IPortalLinkSaveHandler
{
}
