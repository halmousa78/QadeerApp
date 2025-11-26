import { fieldsProxy, getLookup, getLookupAsync } from "@serenity-is/corelib";

export interface DepartmentRow {
    DepartmentId?: number;
    Name?: string;
    IsActive?: number;
    DeleteUserId?: number;
    DeleteDate?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
}

export abstract class DepartmentRow {
    static readonly idProperty = 'DepartmentId';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'Administration.Department';
    static readonly lookupKey = 'Administration.Department';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<DepartmentRow>('Administration.Department') }
    static async getLookupAsync() { return getLookupAsync<DepartmentRow>('Administration.Department') }

    static readonly deletePermission = 'Administration:Departments:Delete';
    static readonly insertPermission = 'Administration:Departments:Insert';
    static readonly readPermission = 'Administration:Departments:View';
    static readonly updatePermission = 'Administration:Departments:Update';

    static readonly Fields = fieldsProxy<DepartmentRow>();
}
