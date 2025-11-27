import { ServiceRequest } from "@serenity-is/corelib";

export interface TrainingScheduleImportRequest extends ServiceRequest {
    CsvContent?: string;
    ReplaceExisting?: boolean;
}