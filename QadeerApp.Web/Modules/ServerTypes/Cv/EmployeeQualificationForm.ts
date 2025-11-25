import { initFormType, PrefixedContext, StringEditor } from "@serenity-is/corelib";

export interface EmployeeQualificationForm {
    Name: StringEditor;
}

export class EmployeeQualificationForm extends PrefixedContext {
    static readonly formKey = 'Cv.EmployeeQualification';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeQualificationForm.init) {
            EmployeeQualificationForm.init = true;

            var w0 = StringEditor;

            initFormType(EmployeeQualificationForm, [
                'Name', w0
            ]);
        }
    }
}
