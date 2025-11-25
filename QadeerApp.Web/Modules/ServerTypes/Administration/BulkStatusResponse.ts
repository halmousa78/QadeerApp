import { ServiceResponse } from "@serenity-is/corelib";

export interface BulkStatusResponse extends ServiceResponse {
    Updated?: number;
}