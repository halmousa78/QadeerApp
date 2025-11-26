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
    static readonly deletePermission = 'Cv:EmployeeExperience:Delete';
    static readonly insertPermission = 'Cv:EmployeeExperience:Insert';
    static readonly readPermission = 'Cv:EmployeeExperience:View';
    static readonly updatePermission = 'Cv:EmployeeExperience:Update';

    static readonly Fields = fieldsProxy<EmployeeExperienceRow>();
}
