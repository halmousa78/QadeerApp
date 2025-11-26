import { ServiceResponse } from "@serenity-is/corelib";

export interface TrainingCourseImportResponse extends ServiceResponse {
    Inserted?: number;
    Failed?: number;
    Total?: number;
    Errors?: string[];
}