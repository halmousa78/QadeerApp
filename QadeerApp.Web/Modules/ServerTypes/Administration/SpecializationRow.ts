import { fieldsProxy, getLookup, getLookupAsync } from "@serenity-is/corelib";

export interface SpecializationRow {
    SpecializationId?: number;
    DepartmentId?: number;
    DepartmentName?: string;
    Name?: string;
    IsActive?: number;
    DeleteUserId?: number;
    DeleteDate?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
}

export abstract class SpecializationRow {
    static readonly idProperty = 'SpecializationId';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'Administration.Specialization';
    static readonly lookupKey = 'Administration.Specialization';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<SpecializationRow>('Administration.Specialization') }
    static async getLookupAsync() { return getLookupAsync<SpecializationRow>('Administration.Specialization') }

    static readonly deletePermission = 'Administration:Specializations';
    static readonly insertPermission = 'Administration:Specializations';
    static readonly readPermission = 'Administration:Specializations';
    static readonly updatePermission = 'Administration:Specializations';

    static readonly Fields = fieldsProxy<SpecializationRow>();
}