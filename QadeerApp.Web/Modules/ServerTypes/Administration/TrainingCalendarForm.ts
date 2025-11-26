import { BooleanEditor, DateEditor, initFormType, LookupEditor, PrefixedContext, StringEditor } from "@serenity-is/corelib";

export interface TrainingCalendarForm {
    Name: StringEditor;
    TrainingTermId: LookupEditor;
    StartDate: DateEditor;
    EndDate: DateEditor;
    IsEnabled: BooleanEditor;
    IsActive: BooleanEditor;
}

export class TrainingCalendarForm extends PrefixedContext {
    static readonly formKey = 'Administration.TrainingCalendar';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!TrainingCalendarForm.init) {
            TrainingCalendarForm.init = true;

            var w0 = StringEditor;
            var w1 = LookupEditor;
            var w2 = DateEditor;
            var w3 = BooleanEditor;

            initFormType(TrainingCalendarForm, [
                'Name', w0,
                'TrainingTermId', w1,
                'StartDate', w2,
                'EndDate', w2,
                'IsEnabled', w3,
                'IsActive', w3
            ]);
        }
    }
}