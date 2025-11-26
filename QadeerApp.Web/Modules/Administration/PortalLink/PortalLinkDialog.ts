import { EntityDialog } from "@serenity-is/corelib";
import { PortalLinkForm, PortalLinkRow, PortalLinkService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";

export class PortalLinkDialog extends EntityDialog<PortalLinkRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getFormKey() { return PortalLinkForm.formKey; }
    protected override getIdProperty() { return PortalLinkRow.idProperty; }
    protected override getIsActiveProperty() { return PortalLinkRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return PortalLinkRow.localTextPrefix; }
    protected override getNameProperty() { return PortalLinkRow.nameProperty; }
    protected override getService() { return PortalLinkService.baseUrl; }

    protected form = new PortalLinkForm(this.idPrefix);
}
