import { ServiceRequest } from "@serenity-is/corelib";

export interface TrainingGradePivotRequest extends ServiceRequest {
    TrainingTerm?: string;
    IsActive?: boolean;
}