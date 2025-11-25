import { ColumnsBase, fieldsProxy } from "@serenity-is/corelib";
import { Column } from "@serenity-is/sleekgrid";
import { TrainingGradeRow } from "./TrainingGradeRow";

export interface TrainingGradeColumns {
    TrainingGradeId: Column<TrainingGradeRow>;
    Grade: Column<TrainingGradeRow>;
    TrainerName: Column<TrainingGradeRow>;
    TrainerNumber: Column<TrainingGradeRow>;
    ReferenceNumber: Column<TrainingGradeRow>;
    ScheduleType: Column<TrainingGradeRow>;
    CourseName: Column<TrainingGradeRow>;
    CourseCode: Column<TrainingGradeRow>;
    Department: Column<TrainingGradeRow>;
    Specialization: Column<TrainingGradeRow>;
    TrainingLevel: Column<TrainingGradeRow>;
    TrainingTerm: Column<TrainingGradeRow>;
    IsActive: Column<TrainingGradeRow>;
}

export class TrainingGradeColumns extends ColumnsBase<TrainingGradeRow> {
    static readonly columnsKey = 'Administration.TrainingGrade';
    static readonly Fields = fieldsProxy<TrainingGradeColumns>();
}
