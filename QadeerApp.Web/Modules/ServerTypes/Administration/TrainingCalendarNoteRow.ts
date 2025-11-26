import { fieldsProxy } from "@serenity-is/corelib";

export interface TrainingCalendarNoteRow {
    TrainingCalendarNoteId?: number;
    TrainingCalendarId?: number;
    Title?: string;
    NoteText?: string;
    NoteDate?: string;
    IsActive?: number;
    TrainingCalendarName?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
}

export abstract class TrainingCalendarNoteRow {
    static readonly idProperty = 'TrainingCalendarNoteId';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Title';
    static readonly localTextPrefix = 'Administration.TrainingCalendarNote';
    static readonly deletePermission = 'Administration:TrainingCalendars:Delete';
    static readonly insertPermission = 'Administration:TrainingCalendars:Insert';
    static readonly readPermission = 'Administration:TrainingCalendars:View';
    static readonly updatePermission = 'Administration:TrainingCalendars:Update';

    static readonly Fields = fieldsProxy<TrainingCalendarNoteRow>();
}