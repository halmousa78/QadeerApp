import { BooleanEditor, initFormType, PrefixedContext, StringEditor } from "@serenity-is/corelib";

export interface TrainingGradeForm {
    Grade: StringEditor;
    TrainerName: StringEditor;
    TrainerNumber: StringEditor;
    ReferenceNumber: StringEditor;
    ScheduleType: StringEditor;
    CourseName: StringEditor;
    CourseCode: StringEditor;
    Department: StringEditor;
    Specialization: StringEditor;
    TrainingLevel: StringEditor;
    TrainingTerm: StringEditor;
    IsActive: BooleanEditor;
}

export class TrainingGradeForm extends PrefixedContext {
    static readonly formKey = 'Administration.TrainingGrade';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!TrainingGradeForm.init) {
            TrainingGradeForm.init = true;

            var w0 = StringEditor;
            var w1 = BooleanEditor;

            initFormType(TrainingGradeForm, [
                'Grade', w0,
                'TrainerName', w0,
                'TrainerNumber', w0,
                'ReferenceNumber', w0,
                'ScheduleType', w0,
                'CourseName', w0,
                'CourseCode', w0,
                'Department', w0,
                'Specialization', w0,
                'TrainingLevel', w0,
                'TrainingTerm', w0,
                'IsActive', w1
            ]);
        }
    }
}