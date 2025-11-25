import { EntityGrid } from "@serenity-is/corelib";
import { TrainingTermColumns, TrainingTermRow, TrainingTermService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";
import { TrainingTermDialog } from "./TrainingTermDialog";

export class TrainingTermGrid extends EntityGrid<TrainingTermRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getColumnsKey() { return TrainingTermColumns.columnsKey; }
    protected override getDialogType() { return TrainingTermDialog; }
    protected override getIdProperty() { return TrainingTermRow.idProperty; }
    protected override getIsActiveProperty() { return TrainingTermRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return TrainingTermRow.localTextPrefix; }
    protected override getService() { return TrainingTermService.baseUrl; }

    protected override getDefaultSortBy() {
        return [TrainingTermRow.Fields.Name];
    }
}
