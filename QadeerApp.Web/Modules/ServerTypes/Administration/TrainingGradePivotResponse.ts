import { ServiceResponse } from "@serenity-is/corelib";
import { TrainingGradePivotRow } from "./TrainingGradePivotRow";

export interface TrainingGradePivotResponse extends ServiceResponse {
    Items?: TrainingGradePivotRow[];
}
