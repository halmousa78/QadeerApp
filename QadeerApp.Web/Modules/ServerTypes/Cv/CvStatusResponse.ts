import { ServiceResponse } from "@serenity-is/corelib";

export interface CvStatusResponse extends ServiceResponse {
    NeedsCompletion?: boolean;
    EmployeeCvId?: number;
    Message?: string;
}
