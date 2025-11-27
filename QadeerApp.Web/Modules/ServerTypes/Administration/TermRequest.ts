import { ServiceRequest } from "@serenity-is/corelib";

export interface TermRequest extends ServiceRequest {
    TrainingTerm?: string;
}