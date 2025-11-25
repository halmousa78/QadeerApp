import { ServiceResponse } from "@serenity-is/corelib";

export interface BulkDeleteResponse extends ServiceResponse {
    Deleted?: number;
}
