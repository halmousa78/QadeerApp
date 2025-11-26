import { fieldsProxy, getLookup, getLookupAsync } from "@serenity-is/corelib";

export interface TrainingCourseRow {
    TrainingCourseId?: number;
    DepartmentId?: number;
    SpecializationId?: number;
    Name?: string;
    Code?: string;
    IsActive?: number;
    DepartmentName?: string;
    SpecializationName?: string;
    DeleteUserId?: number;
    DeleteDate?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
}

export abstract class TrainingCourseRow {
    static readonly idProperty = 'TrainingCourseId';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'Administration.TrainingCourse';
    static readonly lookupKey = 'Administration.TrainingCourse';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<TrainingCourseRow>('Administration.TrainingCourse') }
    static async getLookupAsync() { return getLookupAsync<TrainingCourseRow>('Administration.TrainingCourse') }

    static readonly deletePermission = 'Administration:TrainingCourses:Delete';
    static readonly insertPermission = 'Administration:TrainingCourses:Insert';
    static readonly readPermission = 'Administration:TrainingCourses:View';
    static readonly updatePermission = 'Administration:TrainingCourses:Update';

    static readonly Fields = fieldsProxy<TrainingCourseRow>();
}
