import { ServiceResponse } from "@serenity-is/corelib";
import { CourseCoordinatorItem } from "./CourseCoordinatorItem";

export interface CourseCoordinatorListResponse extends ServiceResponse {
    Items?: CourseCoordinatorItem[];
}