import { ServiceResponse } from "@serenity-is/corelib";

export interface TrainingGradeSummaryResponse extends ServiceResponse {
    Total?: number;
    Active?: number;
    Inactive?: number;
    Terms?: string[];
}