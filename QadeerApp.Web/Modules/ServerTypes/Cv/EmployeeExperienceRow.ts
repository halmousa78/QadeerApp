import { fieldsProxy } from "@serenity-is/corelib";

export interface EmployeeExperienceRow {
    EmployeeExperienceId?: number;
    EmployeeCvId?: number;
    Name?: string;
    UserId?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
}

export abstract class EmployeeExperienceRow {
    static readonly idProperty = 'EmployeeExperienceId';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'Cv.EmployeeExperience';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<EmployeeExperienceRow>();
}
