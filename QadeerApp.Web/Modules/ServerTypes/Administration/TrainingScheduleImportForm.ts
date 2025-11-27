import { BooleanEditor, initFormType, IntegerEditor, PrefixedContext, StringEditor } from "@serenity-is/corelib";

export interface TrainingScheduleImportForm {
    TrainingTerm: StringEditor;
    TrainingUnit: StringEditor;
    Department: StringEditor;
    TrainingType: StringEditor;
    TrainerNumber: IntegerEditor;
    TrainerName: StringEditor;
    Day: StringEditor;
    Time: StringEditor;
    LectureCount: IntegerEditor;
    Course: StringEditor;
    CourseDescription: StringEditor;
    LectureDescription: StringEditor;
    ReferenceNumber: IntegerEditor;
    FromText: StringEditor;
    ToText: StringEditor;
    Building: IntegerEditor;
    RoomNumber: IntegerEditor;
    RoomName: StringEditor;
    ContactHours: IntegerEditor;
    IsActive: BooleanEditor;
}

export class TrainingScheduleImportForm extends PrefixedContext {
    static readonly formKey = 'Administration.TrainingScheduleImport';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!TrainingScheduleImportForm.init) {
            TrainingScheduleImportForm.init = true;

            var w0 = StringEditor;
            var w1 = IntegerEditor;
            var w2 = BooleanEditor;

            initFormType(TrainingScheduleImportForm, [
                'TrainingTerm', w0,
                'TrainingUnit', w0,
                'Department', w0,
                'TrainingType', w0,
                'TrainerNumber', w1,
                'TrainerName', w0,
                'Day', w0,
                'Time', w0,
                'LectureCount', w1,
                'Course', w0,
                'CourseDescription', w0,
                'LectureDescription', w0,
                'ReferenceNumber', w1,
                'FromText', w0,
                'ToText', w0,
                'Building', w1,
                'RoomNumber', w1,
                'RoomName', w0,
                'ContactHours', w1,
                'IsActive', w2
            ]);
        }
    }
}