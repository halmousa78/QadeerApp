import { fieldsProxy, getLookup, getLookupAsync } from "@serenity-is/corelib";

export interface RoleRow {
    RoleId?: number;
    RoleName?: string;
}

export abstract class RoleRow {
    static readonly idProperty = 'RoleId';
    static readonly nameProperty = 'RoleName';
    static readonly localTextPrefix = 'Administration.Role';
    static readonly lookupKey = 'Administration.Role';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<RoleRow>('Administration.Role') }
    static async getLookupAsync() { return getLookupAsync<RoleRow>('Administration.Role') }

    static readonly deletePermission = 'Administration:Security:Roles:Delete';
    static readonly insertPermission = 'Administration:Security:Roles:Insert';
    static readonly readPermission = 'Administration:Security:Roles:View';
    static readonly updatePermission = 'Administration:Security:Roles:Update';

    static readonly Fields = fieldsProxy<RoleRow>();
}
