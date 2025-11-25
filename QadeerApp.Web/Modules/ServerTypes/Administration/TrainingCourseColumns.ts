import { ColumnsBase, fieldsProxy } from "@serenity-is/corelib";
import { Column } from "@serenity-is/sleekgrid";
import { TrainingCourseRow } from "./TrainingCourseRow";

export interface TrainingCourseColumns {
    TrainingCourseId: Column<TrainingCourseRow>;
    Name: Column<TrainingCourseRow>;
    Code: Column<TrainingCourseRow>;
    DepartmentName: Column<TrainingCourseRow>;
    SpecializationName: Column<TrainingCourseRow>;
    IsActive: Column<TrainingCourseRow>;
}

export class TrainingCourseColumns extends ColumnsBase<TrainingCourseRow> {
    static readonly columnsKey = 'Administration.TrainingCourse';
    static readonly Fields = fieldsProxy<TrainingCourseColumns>();
}
