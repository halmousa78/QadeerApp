import { EnumEditor, initFormType, PrefixedContext, StringEditor, TextAreaEditor } from "@serenity-is/corelib";
import { EmployeeCourseEditor } from "../../Cv/EmployeeCv/EmployeeCourseEditor";
import { EmployeeExperienceEditor } from "../../Cv/EmployeeCv/EmployeeExperienceEditor";
import { EmployeeQualificationEditor } from "../../Cv/EmployeeCv/EmployeeQualificationEditor";
import { EnglishLevel } from "./EnglishLevel";

export interface EmployeeCvForm {
    Mobile: StringEditor;
    EnglishLevel: EnumEditor;
    Address: TextAreaEditor;
    ExtensionNumber: StringEditor;
    OfficeNumber: StringEditor;
    BuildingNumber: StringEditor;
    Qualifications: EmployeeQualificationEditor;
    Experiences: EmployeeExperienceEditor;
    Courses: EmployeeCourseEditor;
}

export class EmployeeCvForm extends PrefixedContext {
    static readonly formKey = 'Cv.EmployeeCv';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!EmployeeCvForm.init) {
            EmployeeCvForm.init = true;

            var w0 = StringEditor;
            var w1 = EnumEditor;
            var w2 = TextAreaEditor;
            var w3 = EmployeeQualificationEditor;
            var w4 = EmployeeExperienceEditor;
            var w5 = EmployeeCourseEditor;

            initFormType(EmployeeCvForm, [
                'Mobile', w0,
                'EnglishLevel', w1,
                'Address', w2,
                'ExtensionNumber', w0,
                'OfficeNumber', w0,
                'BuildingNumber', w0,
                'Qualifications', w3,
                'Experiences', w4,
                'Courses', w5
            ]);
        }
    }
}

[EnglishLevel]; // referenced types