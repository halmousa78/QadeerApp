using MyRow = QadeerApp.Administration.PortalLinkRow;

namespace QadeerApp.Administration;

public interface IPortalLinkRetrieveHandler : IRetrieveHandler<MyRow> { }

public class PortalLinkRetrieveHandler(IRequestContext context)
    : RetrieveRequestHandler<MyRow>(context), IPortalLinkRetrieveHandler
{
}
