import { EntityGrid } from "@serenity-is/corelib";
import { DepartmentColumns, DepartmentRow, DepartmentService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";
import { DepartmentDialog } from "./DepartmentDialog";

export class DepartmentGrid extends EntityGrid<DepartmentRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getColumnsKey() { return DepartmentColumns.columnsKey; }
    protected override getDialogType() { return DepartmentDialog; }
    protected override getIdProperty() { return DepartmentRow.idProperty; }
    protected override getIsActiveProperty() { return DepartmentRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return DepartmentRow.localTextPrefix; }
    protected override getService() { return DepartmentService.baseUrl; }

    protected override getDefaultSortBy() {
        return [DepartmentRow.Fields.Name];
    }
}
