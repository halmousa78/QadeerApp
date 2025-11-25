import { BooleanEditor, initFormType, LookupEditor, PrefixedContext, StringEditor } from "@serenity-is/corelib";

export interface TrainingCourseForm {
    DepartmentId: LookupEditor;
    SpecializationId: LookupEditor;
    Name: StringEditor;
    Code: StringEditor;
    IsActive: BooleanEditor;
}

export class TrainingCourseForm extends PrefixedContext {
    static readonly formKey = 'Administration.TrainingCourse';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!TrainingCourseForm.init) {
            TrainingCourseForm.init = true;

            var w0 = LookupEditor;
            var w1 = StringEditor;
            var w2 = BooleanEditor;

            initFormType(TrainingCourseForm, [
                'DepartmentId', w0,
                'SpecializationId', w0,
                'Name', w1,
                'Code', w1,
                'IsActive', w2
            ]);
        }
    }
}
