import { ServiceResponse } from "@serenity-is/corelib";

export interface TrainingCourseFileSummaryResponse extends ServiceResponse {
    Total?: number;
    Active?: number;
    Inactive?: number;
    Terms?: string[];
}