import { BooleanEditor, initFormType, PrefixedContext, StringEditor } from "@serenity-is/corelib";

export interface DepartmentForm {
    Name: StringEditor;
    IsActive: BooleanEditor;
}

export class DepartmentForm extends PrefixedContext {
    static readonly formKey = 'Administration.Department';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!DepartmentForm.init) {
            DepartmentForm.init = true;

            var w0 = StringEditor;
            var w1 = BooleanEditor;

            initFormType(DepartmentForm, [
                'Name', w0,
                'IsActive', w1
            ]);
        }
    }
}