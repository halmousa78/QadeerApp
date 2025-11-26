import { fieldsProxy } from "@serenity-is/corelib";

export interface UserPermissionRow {
    UserPermissionId?: number;
    UserId?: number;
    PermissionKey?: string;
    Granted?: boolean;
    Username?: string;
    User?: string;
}

export abstract class UserPermissionRow {
    static readonly idProperty = 'UserPermissionId';
    static readonly nameProperty = 'PermissionKey';
    static readonly localTextPrefix = 'Administration.UserPermission';
    static readonly deletePermission = 'Administration:Security:UserPermissions:Delete';
    static readonly insertPermission = 'Administration:Security:UserPermissions:Insert';
    static readonly readPermission = 'Administration:Security:UserPermissions:View';
    static readonly updatePermission = 'Administration:Security:UserPermissions:Update';

    static readonly Fields = fieldsProxy<UserPermissionRow>();
}
