import { fieldsProxy } from "@serenity-is/corelib";

export interface TrainingCalendarBreakRow {
    TrainingCalendarBreakId?: number;
    TrainingCalendarId?: number;
    Title?: string;
    StartDate?: string;
    EndDate?: string;
    IsActive?: number;
    TrainingCalendarName?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
}

export abstract class TrainingCalendarBreakRow {
    static readonly idProperty = 'TrainingCalendarBreakId';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Title';
    static readonly localTextPrefix = 'Administration.TrainingCalendarBreak';
    static readonly deletePermission = 'Administration:TrainingCalendars:Delete';
    static readonly insertPermission = 'Administration:TrainingCalendars:Insert';
    static readonly readPermission = 'Administration:TrainingCalendars:View';
    static readonly updatePermission = 'Administration:TrainingCalendars:Update';

    static readonly Fields = fieldsProxy<TrainingCalendarBreakRow>();
}