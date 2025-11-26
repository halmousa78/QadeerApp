import { fieldsProxy } from "@serenity-is/corelib";

export interface EmployeeCourseRow {
    EmployeeCourseId?: number;
    EmployeeCvId?: number;
    Name?: string;
    UserId?: number;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
}

export abstract class EmployeeCourseRow {
    static readonly idProperty = 'EmployeeCourseId';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'Cv.EmployeeCourse';
    static readonly deletePermission = 'Cv:EmployeeCourse:Delete';
    static readonly insertPermission = 'Cv:EmployeeCourse:Insert';
    static readonly readPermission = 'Cv:EmployeeCourse:View';
    static readonly updatePermission = 'Cv:EmployeeCourse:Update';

    static readonly Fields = fieldsProxy<EmployeeCourseRow>();
}
