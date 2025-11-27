import { fieldsProxy } from "@serenity-is/corelib";

export interface TrainingScheduleImportRow {
    TrainingScheduleImportId?: number;
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
    IsActive?: number;
    DeleteUserId?: number;
    DeleteDate?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
}

export abstract class TrainingScheduleImportRow {
    static readonly idProperty = 'TrainingScheduleImportId';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'TrainingTerm';
    static readonly localTextPrefix = 'Administration.TrainingScheduleImport';
    static readonly deletePermission = 'Administration:TrainingScheduleImports:Delete';
    static readonly insertPermission = 'Administration:TrainingScheduleImports:Insert';
    static readonly readPermission = 'Administration:TrainingScheduleImports:View';
    static readonly updatePermission = 'Administration:TrainingScheduleImports:Update';

    static readonly Fields = fieldsProxy<TrainingScheduleImportRow>();
}