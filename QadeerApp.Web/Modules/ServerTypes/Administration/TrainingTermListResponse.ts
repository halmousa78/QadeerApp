import { ServiceResponse } from "@serenity-is/corelib";
import { TrainingTermSummary } from "./TrainingTermSummary";

export interface TrainingTermListResponse extends ServiceResponse {
    Terms?: TrainingTermSummary[];
}
