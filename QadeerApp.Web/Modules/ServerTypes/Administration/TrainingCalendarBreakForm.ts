import { BooleanEditor, DateEditor, initFormType, LookupEditor, PrefixedContext, StringEditor } from "@serenity-is/corelib";

export interface TrainingCalendarBreakForm {
    Title: StringEditor;
    TrainingCalendarId: LookupEditor;
    StartDate: DateEditor;
    EndDate: DateEditor;
    IsActive: BooleanEditor;
}

export class TrainingCalendarBreakForm extends PrefixedContext {
    static readonly formKey = 'Administration.TrainingCalendarBreak';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!TrainingCalendarBreakForm.init) {
            TrainingCalendarBreakForm.init = true;

            var w0 = StringEditor;
            var w1 = LookupEditor;
            var w2 = DateEditor;
            var w3 = BooleanEditor;

            initFormType(TrainingCalendarBreakForm, [
                'Title', w0,
                'TrainingCalendarId', w1,
                'StartDate', w2,
                'EndDate', w2,
                'IsActive', w3
            ]);
        }
    }
}