import { ServiceResponse } from "@serenity-is/corelib";

export interface ImportCourseFilesResponse extends ServiceResponse {
    Inserted?: number;
    SkippedExisting?: number;
    SkippedIncompleteKey?: number;
    TotalRecords?: number;
    ActiveTerms?: string[];
    SourceTerms?: string[];
    Errors?: string[];
}