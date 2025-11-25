import { BooleanEditor, initFormType, PrefixedContext, StringEditor } from "@serenity-is/corelib";

export interface TrainingTermForm {
    Name: StringEditor;
    IsActive: BooleanEditor;
}

export class TrainingTermForm extends PrefixedContext {
    static readonly formKey = 'Administration.TrainingTerm';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!TrainingTermForm.init) {
            TrainingTermForm.init = true;

            var w0 = StringEditor;
            var w1 = BooleanEditor;

            initFormType(TrainingTermForm, [
                'Name', w0,
                'IsActive', w1
            ]);
        }
    }
}
