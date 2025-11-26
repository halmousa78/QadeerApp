import { EntityGrid } from "@serenity-is/corelib";
import { TrainingCalendarBreakColumns, TrainingCalendarBreakRow, TrainingCalendarBreakService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";
import { TrainingCalendarBreakDialog } from "./TrainingCalendarBreakDialog";

export class TrainingCalendarBreakGrid extends EntityGrid<TrainingCalendarBreakRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getColumnsKey() { return TrainingCalendarBreakColumns.columnsKey; }
    protected override getDialogType() { return TrainingCalendarBreakDialog; }
    protected override getIdProperty() { return TrainingCalendarBreakRow.idProperty; }
    protected override getIsActiveProperty() { return TrainingCalendarBreakRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return TrainingCalendarBreakRow.localTextPrefix; }
    protected override getService() { return TrainingCalendarBreakService.baseUrl; }

    protected override getDefaultSortBy() {
        return [TrainingCalendarBreakRow.Fields.StartDate];
    }
}
