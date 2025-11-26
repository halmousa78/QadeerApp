import { fieldsProxy } from "@serenity-is/corelib";

export interface PortalLinkRow {
    PortalLinkId?: number;
    Section?: string;
    DepartmentId?: number;
    SpecializationId?: number;
    Title?: string;
    Url?: string;
    DisplayOrder?: number;
    IsActive?: number;
    DepartmentName?: string;
    SpecializationName?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
}

export abstract class PortalLinkRow {
    static readonly idProperty = 'PortalLinkId';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Title';
    static readonly localTextPrefix = 'Administration.PortalLink';
    static readonly deletePermission = 'Administration:PortalLinks:Delete';
    static readonly insertPermission = 'Administration:PortalLinks:Insert';
    static readonly readPermission = 'Administration:PortalLinks:View';
    static readonly updatePermission = 'Administration:PortalLinks:Update';

    static readonly Fields = fieldsProxy<PortalLinkRow>();
}