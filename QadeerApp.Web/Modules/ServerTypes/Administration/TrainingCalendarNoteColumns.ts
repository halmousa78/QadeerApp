import { ColumnsBase, fieldsProxy } from "@serenity-is/corelib";
import { Column } from "@serenity-is/sleekgrid";
import { TrainingCalendarNoteRow } from "./TrainingCalendarNoteRow";

export interface TrainingCalendarNoteColumns {
    TrainingCalendarNoteId: Column<TrainingCalendarNoteRow>;
    Title: Column<TrainingCalendarNoteRow>;
    TrainingCalendarName: Column<TrainingCalendarNoteRow>;
    NoteDate: Column<TrainingCalendarNoteRow>;
    IsActive: Column<TrainingCalendarNoteRow>;
}

export class TrainingCalendarNoteColumns extends ColumnsBase<TrainingCalendarNoteRow> {
    static readonly columnsKey = 'Administration.TrainingCalendarNote';
    static readonly Fields = fieldsProxy<TrainingCalendarNoteColumns>();
}