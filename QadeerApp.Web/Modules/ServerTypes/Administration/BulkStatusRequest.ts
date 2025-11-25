import { ServiceRequest } from "@serenity-is/corelib";

export interface BulkStatusRequest extends ServiceRequest {
    TrainingTerm?: string;
    IsActive?: boolean;
}