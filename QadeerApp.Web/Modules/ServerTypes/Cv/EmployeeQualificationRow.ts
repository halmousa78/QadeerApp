import { fieldsProxy } from "@serenity-is/corelib";

export interface EmployeeQualificationRow {
    EmployeeQualificationId?: number;
    EmployeeCvId?: number;
    Name?: string;
    UserId?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
}

export abstract class EmployeeQualificationRow {
    static readonly idProperty = 'EmployeeQualificationId';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'Cv.EmployeeQualification';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<EmployeeQualificationRow>();
}
