import { EntityGrid } from "@serenity-is/corelib";
import { TrainingCalendarNoteColumns, TrainingCalendarNoteRow, TrainingCalendarNoteService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";
import { TrainingCalendarNoteDialog } from "./TrainingCalendarNoteDialog";

export class TrainingCalendarNoteGrid extends EntityGrid<TrainingCalendarNoteRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getColumnsKey() { return TrainingCalendarNoteColumns.columnsKey; }
    protected override getDialogType() { return TrainingCalendarNoteDialog; }
    protected override getIdProperty() { return TrainingCalendarNoteRow.idProperty; }
    protected override getIsActiveProperty() { return TrainingCalendarNoteRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return TrainingCalendarNoteRow.localTextPrefix; }
    protected override getService() { return TrainingCalendarNoteService.baseUrl; }

    protected override getDefaultSortBy() {
        return [TrainingCalendarNoteRow.Fields.NoteDate];
    }
}
