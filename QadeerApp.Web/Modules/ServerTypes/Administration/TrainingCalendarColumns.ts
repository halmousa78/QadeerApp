import { ColumnsBase, fieldsProxy } from "@serenity-is/corelib";
import { Column } from "@serenity-is/sleekgrid";
import { TrainingCalendarRow } from "./TrainingCalendarRow";

export interface TrainingCalendarColumns {
    TrainingCalendarId: Column<TrainingCalendarRow>;
    Name: Column<TrainingCalendarRow>;
    TrainingTermName: Column<TrainingCalendarRow>;
    StartDate: Column<TrainingCalendarRow>;
    EndDate: Column<TrainingCalendarRow>;
    IsEnabled: Column<TrainingCalendarRow>;
    IsActive: Column<TrainingCalendarRow>;
}

export class TrainingCalendarColumns extends ColumnsBase<TrainingCalendarRow> {
    static readonly columnsKey = 'Administration.TrainingCalendar';
    static readonly Fields = fieldsProxy<TrainingCalendarColumns>();
}