import { initFormType, PrefixedContext, StringEditor } from "@serenity-is/corelib";

export interface EmployeeCourseForm {
    Name: StringEditor;
}

export class EmployeeCourseForm extends PrefixedContext {
    static readonly formKey = 'Cv.EmployeeCourse';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeCourseForm.init) {
            EmployeeCourseForm.init = true;

            var w0 = StringEditor;

            initFormType(EmployeeCourseForm, [
                'Name', w0
            ]);
        }
    }
}
