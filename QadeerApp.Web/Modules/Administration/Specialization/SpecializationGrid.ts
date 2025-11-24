import { EntityGrid } from "@serenity-is/corelib";
import { SpecializationColumns, SpecializationRow, SpecializationService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";
import { SpecializationDialog } from "./SpecializationDialog";

export class SpecializationGrid extends EntityGrid<SpecializationRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getColumnsKey() { return SpecializationColumns.columnsKey; }
    protected override getDialogType() { return SpecializationDialog; }
    protected override getIdProperty() { return SpecializationRow.idProperty; }
    protected override getIsActiveProperty() { return SpecializationRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return SpecializationRow.localTextPrefix; }
    protected override getService() { return SpecializationService.baseUrl; }

    protected override getDefaultSortBy() {
        return [SpecializationRow.Fields.Name];
    }
}
