import { fieldsProxy } from "@serenity-is/corelib";

export interface RolePermissionRow {
    RolePermissionId?: number;
    RoleId?: number;
    PermissionKey?: string;
    RoleName?: string;
}

export abstract class RolePermissionRow {
    static readonly idProperty = 'RolePermissionId';
    static readonly nameProperty = 'PermissionKey';
    static readonly localTextPrefix = 'Administration.RolePermission';
    static readonly deletePermission = 'Administration:Security:RolePermissions:Delete';
    static readonly insertPermission = 'Administration:Security:RolePermissions:Insert';
    static readonly readPermission = 'Administration:Security:RolePermissions:View';
    static readonly updatePermission = 'Administration:Security:RolePermissions:Update';

    static readonly Fields = fieldsProxy<RolePermissionRow>();
}
