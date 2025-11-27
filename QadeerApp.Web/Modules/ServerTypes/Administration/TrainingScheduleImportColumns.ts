import { ColumnsBase, fieldsProxy } from "@serenity-is/corelib";
import { Column } from "@serenity-is/sleekgrid";
import { TrainingScheduleImportRow } from "./TrainingScheduleImportRow";

export interface TrainingScheduleImportColumns {
    TrainingScheduleImportId: Column<TrainingScheduleImportRow>;
    TrainingTerm: Column<TrainingScheduleImportRow>;
    TrainingUnit: Column<TrainingScheduleImportRow>;
    Department: Column<TrainingScheduleImportRow>;
    TrainingType: Column<TrainingScheduleImportRow>;
    TrainerName: Column<TrainingScheduleImportRow>;
    TrainerNumber: Column<TrainingScheduleImportRow>;
    Day: Column<TrainingScheduleImportRow>;
    Time: Column<TrainingScheduleImportRow>;
    LectureCount: Column<TrainingScheduleImportRow>;
    Course: Column<TrainingScheduleImportRow>;
    IsActive: Column<TrainingScheduleImportRow>;
}

export class TrainingScheduleImportColumns extends ColumnsBase<TrainingScheduleImportRow> {
    static readonly columnsKey = 'Administration.TrainingScheduleImport';
    static readonly Fields = fieldsProxy<TrainingScheduleImportColumns>();
}