using MyRow = QadeerApp.Administration.PortalLinkRow;

namespace QadeerApp.Administration;

public interface IPortalLinkDeleteHandler : IDeleteHandler<MyRow> { }

public class PortalLinkDeleteHandler(IRequestContext context)
    : DeleteRequestHandler<MyRow>(context), IPortalLinkDeleteHandler
{
}
