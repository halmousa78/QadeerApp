import { ServiceResponse } from "@serenity-is/corelib";

export interface TrainingScheduleSummaryResponse extends ServiceResponse {
    Total?: number;
    Active?: number;
    Inactive?: number;
    Terms?: string[];
}