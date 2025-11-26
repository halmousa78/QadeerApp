import { fieldsProxy } from "@serenity-is/corelib";

export interface UserRoleRow {
    UserRoleId?: number;
    UserId?: number;
    RoleId?: number;
    Username?: string;
    User?: string;
    RoleName?: string;
}

export abstract class UserRoleRow {
    static readonly idProperty = 'UserRoleId';
    static readonly localTextPrefix = 'Administration.UserRole';
    static readonly deletePermission = 'Administration:Security:UserRoles:Delete';
    static readonly insertPermission = 'Administration:Security:UserRoles:Insert';
    static readonly readPermission = 'Administration:Security:UserRoles:View';
    static readonly updatePermission = 'Administration:Security:UserRoles:Update';

    static readonly Fields = fieldsProxy<UserRoleRow>();
}
