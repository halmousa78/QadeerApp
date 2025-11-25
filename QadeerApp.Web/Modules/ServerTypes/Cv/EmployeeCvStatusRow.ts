import { fieldsProxy } from "@serenity-is/corelib";

export interface EmployeeCvStatusRow {
    UserId?: number;
    Username?: string;
    DisplayName?: string;
    IsActive?: number;
    DepartmentName?: string;
    SpecializationName?: string;
    DepartmentId?: number;
    SpecializationId?: number;
    EmployeeCvId?: number;
    IsCompleted?: boolean;
    CvUpdatedOn?: string;
    QualificationCount?: number;
    ExperienceCount?: number;
    CourseCount?: number;
}

export abstract class EmployeeCvStatusRow {
    static readonly idProperty = 'UserId';
    static readonly nameProperty = 'DisplayName';
    static readonly localTextPrefix = 'Cv.EmployeeCvStatus';
    static readonly deletePermission = 'Cv:Report';
    static readonly insertPermission = 'Cv:Report';
    static readonly readPermission = 'Cv:Report';
    static readonly updatePermission = 'Cv:Report';

    static readonly Fields = fieldsProxy<EmployeeCvStatusRow>();
}