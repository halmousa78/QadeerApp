import { ServiceResponse } from "@serenity-is/corelib";

export interface TrainingGradeImportResponse extends ServiceResponse {
    Inserted?: number;
    Failed?: number;
    TotalRecords?: number;
    Errors?: string[];
    AlreadyImported?: boolean;
    Message?: string;
}