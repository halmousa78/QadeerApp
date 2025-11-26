import { fieldsProxy } from "@serenity-is/corelib";

export interface TrainingGradeRow {
    TrainingGradeId?: number;
    Grade?: string;
    TrainerName?: string;
    TrainerNumber?: string;
    ReferenceNumber?: string;
    ScheduleType?: string;
    CourseName?: string;
    CourseCode?: string;
    Specialization?: string;
    Department?: string;
    TrainingLevel?: string;
    TrainingTerm?: string;
    RegistrationStatus?: string;
    TraineeStatus?: string;
    IsActive?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
}

export abstract class TrainingGradeRow {
    static readonly idProperty = 'TrainingGradeId';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'CourseName';
    static readonly localTextPrefix = 'Administration.TrainingGrade';
    static readonly deletePermission = 'Administration:TrainingGrades:Delete';
    static readonly insertPermission = 'Administration:TrainingGrades:Insert';
    static readonly readPermission = 'Administration:TrainingGrades:View';
    static readonly updatePermission = 'Administration:TrainingGrades:Update';

    static readonly Fields = fieldsProxy<TrainingGradeRow>();
}
