import { initFormType, PrefixedContext, StringEditor } from "@serenity-is/corelib";

export interface EmployeeExperienceForm {
    Name: StringEditor;
}

export class EmployeeExperienceForm extends PrefixedContext {
    static readonly formKey = 'Cv.EmployeeExperience';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeExperienceForm.init) {
            EmployeeExperienceForm.init = true;

            var w0 = StringEditor;

            initFormType(EmployeeExperienceForm, [
                'Name', w0
            ]);
        }
    }
}
