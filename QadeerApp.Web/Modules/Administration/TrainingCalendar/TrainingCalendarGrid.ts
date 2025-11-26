import { EntityGrid } from "@serenity-is/corelib";
import { TrainingCalendarColumns, TrainingCalendarRow, TrainingCalendarService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";
import { TrainingCalendarDialog } from "./TrainingCalendarDialog";

export class TrainingCalendarGrid extends EntityGrid<TrainingCalendarRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getColumnsKey() { return TrainingCalendarColumns.columnsKey; }
    protected override getDialogType() { return TrainingCalendarDialog; }
    protected override getIdProperty() { return TrainingCalendarRow.idProperty; }
    protected override getIsActiveProperty() { return TrainingCalendarRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return TrainingCalendarRow.localTextPrefix; }
    protected override getService() { return TrainingCalendarService.baseUrl; }

    protected override getDefaultSortBy() {
        return [TrainingCalendarRow.Fields.StartDate];
    }
}
