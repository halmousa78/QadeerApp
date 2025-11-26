using MyRow = QadeerApp.Administration.PortalLinkRow;

namespace QadeerApp.Administration;

public interface IPortalLinkListHandler : IListHandler<MyRow> { }

public class PortalLinkListHandler(IRequestContext context)
    : ListRequestHandler<MyRow>(context), IPortalLinkListHandler
{
}
