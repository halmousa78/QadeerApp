import { BooleanEditor, initFormType, LookupEditor, PrefixedContext, StringEditor } from "@serenity-is/corelib";

export interface SpecializationForm {
    DepartmentId: LookupEditor;
    Name: StringEditor;
    IsActive: BooleanEditor;
}

export class SpecializationForm extends PrefixedContext {
    static readonly formKey = 'Administration.Specialization';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!SpecializationForm.init) {
            SpecializationForm.init = true;

            var w0 = LookupEditor;
            var w1 = StringEditor;
            var w2 = BooleanEditor;

            initFormType(SpecializationForm, [
                'DepartmentId', w0,
                'Name', w1,
                'IsActive', w2
            ]);
        }
    }
}