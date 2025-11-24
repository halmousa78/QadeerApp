import { ServiceRequest } from "@serenity-is/corelib";

export interface SignUpRequest extends ServiceRequest {
    DisplayName?: string;
    DepartmentId?: number;
    SpecializationId?: number;
    Email?: string;
    Password?: string;
}
