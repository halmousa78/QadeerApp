import { fieldsProxy, getLookup, getLookupAsync } from "@serenity-is/corelib";

export interface TrainingCalendarRow {
    TrainingCalendarId?: number;
    TrainingTermId?: number;
    Name?: string;
    StartDate?: string;
    EndDate?: string;
    IsActive?: number;
    IsEnabled?: number;
    TrainingTermName?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
}

export abstract class TrainingCalendarRow {
    static readonly idProperty = 'TrainingCalendarId';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'Administration.TrainingCalendar';
    static readonly lookupKey = 'Administration.TrainingCalendar';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<TrainingCalendarRow>('Administration.TrainingCalendar') }
    static async getLookupAsync() { return getLookupAsync<TrainingCalendarRow>('Administration.TrainingCalendar') }

    static readonly deletePermission = 'Administration:TrainingCalendars:Delete';
    static readonly insertPermission = 'Administration:TrainingCalendars:Insert';
    static readonly readPermission = 'Administration:TrainingCalendars:View';
    static readonly updatePermission = 'Administration:TrainingCalendars:Update';

    static readonly Fields = fieldsProxy<TrainingCalendarRow>();
}