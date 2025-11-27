import { initFormType, IntegerEditor, PrefixedContext, StringEditor } from "@serenity-is/corelib";

export interface TrainingCourseFileForm {
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
    CourseCoordinator: StringEditor;
    IsActive: IntegerEditor;
}

export class TrainingCourseFileForm extends PrefixedContext {
    static readonly formKey = 'Administration.TrainingCourseFile';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!TrainingCourseFileForm.init) {
            TrainingCourseFileForm.init = true;

            var w0 = StringEditor;
            var w1 = IntegerEditor;

            initFormType(TrainingCourseFileForm, [
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
                'CourseCoordinator', w0,
                'IsActive', w1
            ]);
        }
    }
}