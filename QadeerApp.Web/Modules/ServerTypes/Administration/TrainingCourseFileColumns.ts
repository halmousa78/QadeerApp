import { ColumnsBase, fieldsProxy } from "@serenity-is/corelib";
import { Column } from "@serenity-is/sleekgrid";
import { TrainingCourseFileRow } from "./TrainingCourseFileRow";

export interface TrainingCourseFileColumns {
    TrainingCourseFileId: Column<TrainingCourseFileRow>;
    TrainingTerm: Column<TrainingCourseFileRow>;
    TrainingUnit: Column<TrainingCourseFileRow>;
    Department: Column<TrainingCourseFileRow>;
    TrainingType: Column<TrainingCourseFileRow>;
    TrainerNumber: Column<TrainingCourseFileRow>;
    TrainerName: Column<TrainingCourseFileRow>;
    Day: Column<TrainingCourseFileRow>;
    Time: Column<TrainingCourseFileRow>;
    LectureCount: Column<TrainingCourseFileRow>;
    Course: Column<TrainingCourseFileRow>;
    CourseDescription: Column<TrainingCourseFileRow>;
    LectureDescription: Column<TrainingCourseFileRow>;
    ReferenceNumber: Column<TrainingCourseFileRow>;
    FromText: Column<TrainingCourseFileRow>;
    ToText: Column<TrainingCourseFileRow>;
    Building: Column<TrainingCourseFileRow>;
    RoomNumber: Column<TrainingCourseFileRow>;
    RoomName: Column<TrainingCourseFileRow>;
    ContactHours: Column<TrainingCourseFileRow>;
    CourseCoordinator: Column<TrainingCourseFileRow>;
    IsActive: Column<TrainingCourseFileRow>;
}

export class TrainingCourseFileColumns extends ColumnsBase<TrainingCourseFileRow> {
    static readonly columnsKey = 'Administration.TrainingCourseFile';
    static readonly Fields = fieldsProxy<TrainingCourseFileColumns>();
}