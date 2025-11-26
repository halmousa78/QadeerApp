import { BooleanEditor, DateEditor, initFormType, LookupEditor, PrefixedContext, StringEditor } from "@serenity-is/corelib";

export interface TrainingCalendarNoteForm {
    Title: StringEditor;
    NoteText: StringEditor;
    TrainingCalendarId: LookupEditor;
    NoteDate: DateEditor;
    IsActive: BooleanEditor;
}

export class TrainingCalendarNoteForm extends PrefixedContext {
    static readonly formKey = 'Administration.TrainingCalendarNote';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!TrainingCalendarNoteForm.init) {
            TrainingCalendarNoteForm.init = true;

            var w0 = StringEditor;
            var w1 = LookupEditor;
            var w2 = DateEditor;
            var w3 = BooleanEditor;

            initFormType(TrainingCalendarNoteForm, [
                'Title', w0,
                'NoteText', w0,
                'TrainingCalendarId', w1,
                'NoteDate', w2,
                'IsActive', w3
            ]);
        }
    }
}