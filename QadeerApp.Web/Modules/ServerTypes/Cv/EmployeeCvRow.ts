import { fieldsProxy } from "@serenity-is/corelib";
import { EmployeeCourseRow } from "./EmployeeCourseRow";
import { EmployeeExperienceRow } from "./EmployeeExperienceRow";
import { EmployeeQualificationRow } from "./EmployeeQualificationRow";
import { EnglishLevel } from "./EnglishLevel";

export interface EmployeeCvRow {
    EmployeeCvId?: number;
    UserId?: number;
    Username?: string;
    UserDisplayName?: string;
    Mobile?: string;
    EnglishLevel?: EnglishLevel;
    Address?: string;
    ExtensionNumber?: string;
    OfficeNumber?: string;
    BuildingNumber?: string;
    CvUpdatedOn?: string;
    Qualifications?: EmployeeQualificationRow[];
    Experiences?: EmployeeExperienceRow[];
    Courses?: EmployeeCourseRow[];
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
}

export abstract class EmployeeCvRow {
    static readonly idProperty = 'EmployeeCvId';
    static readonly nameProperty = 'UserDisplayName';
    static readonly localTextPrefix = 'Cv.EmployeeCv';
    static readonly deletePermission = '*';
    static readonly insertPermission = '*';
    static readonly readPermission = '*';
    static readonly updatePermission = '*';

    static readonly Fields = fieldsProxy<EmployeeCvRow>();
}
