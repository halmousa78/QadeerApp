import { ServiceResponse } from "@serenity-is/corelib";

export interface TrainingScheduleImportResponse extends ServiceResponse {
    Inserted?: number;
    Failed?: number;
    SkippedExisting?: number;
    TotalRecords?: number;
    Errors?: string[];
}