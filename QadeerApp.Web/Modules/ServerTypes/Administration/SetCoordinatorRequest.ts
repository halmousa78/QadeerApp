import { ServiceRequest } from "@serenity-is/corelib";

export interface SetCoordinatorRequest extends ServiceRequest {
    Course?: string;
    TrainingTerm?: string;
    TrainerNumber?: number;
}