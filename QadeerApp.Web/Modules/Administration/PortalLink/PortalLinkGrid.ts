import { EntityGrid } from "@serenity-is/corelib";
import { PortalLinkColumns, PortalLinkRow, PortalLinkService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";
import { PortalLinkDialog } from "./PortalLinkDialog";

export class PortalLinkGrid extends EntityGrid<PortalLinkRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getColumnsKey() { return PortalLinkColumns.columnsKey; }
    protected override getDialogType() { return PortalLinkDialog; }
    protected override getIdProperty() { return PortalLinkRow.idProperty; }
    protected override getIsActiveProperty() { return PortalLinkRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return PortalLinkRow.localTextPrefix; }
    protected override getService() { return PortalLinkService.baseUrl; }

    protected override getDefaultSortBy() {
        return [PortalLinkRow.Fields.DepartmentName, PortalLinkRow.Fields.SpecializationName, PortalLinkRow.Fields.DisplayOrder];
    }
}
