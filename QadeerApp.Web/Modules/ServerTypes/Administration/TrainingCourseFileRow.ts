import { fieldsProxy } from "@serenity-is/corelib";

export interface TrainingCourseFileRow {
    TrainingCourseFileId?: number;
    TrainingTerm?: string;
    TrainingUnit?: string;
    Department?: string;
    TrainingType?: string;
    TrainerNumber?: number;
    TrainerName?: string;
    Day?: string;
    Time?: string;
    LectureCount?: number;
    Course?: string;
    CourseDescription?: string;
    LectureDescription?: string;
    ReferenceNumber?: number;
    FromText?: string;
    ToText?: string;
    Building?: number;
    RoomNumber?: number;
    RoomName?: string;
    ContactHours?: number;
    CourseCoordinator?: string;
    IsActive?: number;
    DeleteUserId?: number;
    DeleteDate?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
}

export abstract class TrainingCourseFileRow {
    static readonly idProperty = 'TrainingCourseFileId';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'TrainingTerm';
    static readonly localTextPrefix = 'Administration.TrainingCourseFile';
    static readonly deletePermission = 'Administration:TrainingCourseFiles:Delete';
    static readonly insertPermission = 'Administration:TrainingCourseFiles:Insert';
    static readonly readPermission = 'Administration:TrainingCourseFiles:View';
    static readonly updatePermission = 'Administration:TrainingCourseFiles:Update';

    static readonly Fields = fieldsProxy<TrainingCourseFileRow>();
}