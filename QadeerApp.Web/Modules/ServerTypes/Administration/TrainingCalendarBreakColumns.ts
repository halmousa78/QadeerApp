import { ColumnsBase, fieldsProxy } from "@serenity-is/corelib";
import { Column } from "@serenity-is/sleekgrid";
import { TrainingCalendarBreakRow } from "./TrainingCalendarBreakRow";

export interface TrainingCalendarBreakColumns {
    TrainingCalendarBreakId: Column<TrainingCalendarBreakRow>;
    Title: Column<TrainingCalendarBreakRow>;
    TrainingCalendarName: Column<TrainingCalendarBreakRow>;
    StartDate: Column<TrainingCalendarBreakRow>;
    EndDate: Column<TrainingCalendarBreakRow>;
    IsActive: Column<TrainingCalendarBreakRow>;
}

export class TrainingCalendarBreakColumns extends ColumnsBase<TrainingCalendarBreakRow> {
    static readonly columnsKey = 'Administration.TrainingCalendarBreak';
    static readonly Fields = fieldsProxy<TrainingCalendarBreakColumns>();
}