import { ColumnsBase, fieldsProxy } from "@serenity-is/corelib";
import { Column } from "@serenity-is/sleekgrid";
import { PortalLinkRow } from "./PortalLinkRow";

export interface PortalLinkColumns {
    PortalLinkId: Column<PortalLinkRow>;
    DepartmentName: Column<PortalLinkRow>;
    SpecializationName: Column<PortalLinkRow>;
    Title: Column<PortalLinkRow>;
    Url: Column<PortalLinkRow>;
    DisplayOrder: Column<PortalLinkRow>;
    IsActive: Column<PortalLinkRow>;
}

export class PortalLinkColumns extends ColumnsBase<PortalLinkRow> {
    static readonly columnsKey = 'Administration.PortalLink';
    static readonly Fields = fieldsProxy<PortalLinkColumns>();
}