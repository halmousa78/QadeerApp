import { DeleteRequest, DeleteResponse, ListRequest, ListResponse, RetrieveRequest, RetrieveResponse, SaveRequest, SaveResponse, ServiceOptions, ServiceRequest, serviceRequest, ServiceResponse } from "@serenity-is/corelib";
import { CourseCoordinatorListResponse } from "./CourseCoordinatorListResponse";
import { SetCoordinatorRequest } from "./SetCoordinatorRequest";
import { TrainingCourseFileRow } from "./TrainingCourseFileRow";
import { TrainingCourseFileSummaryResponse } from "./TrainingCourseFileSummaryResponse";

export namespace TrainingCourseFileService {
    export const baseUrl = 'Administration/TrainingCourseFile';

    export declare function Create(request: SaveRequest<TrainingCourseFileRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Update(request: SaveRequest<TrainingCourseFileRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): PromiseLike<DeleteResponse>;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<TrainingCourseFileRow>) => void, opt?: ServiceOptions<any>): PromiseLike<RetrieveResponse<TrainingCourseFileRow>>;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<TrainingCourseFileRow>) => void, opt?: ServiceOptions<any>): PromiseLike<ListResponse<TrainingCourseFileRow>>;
    export declare function Summary(request: ServiceRequest, onSuccess?: (response: TrainingCourseFileSummaryResponse) => void, opt?: ServiceOptions<any>): PromiseLike<TrainingCourseFileSummaryResponse>;
    export declare function CourseCoordinators(request: ServiceRequest, onSuccess?: (response: CourseCoordinatorListResponse) => void, opt?: ServiceOptions<any>): PromiseLike<CourseCoordinatorListResponse>;
    export declare function ActivateAll(request: ServiceRequest, onSuccess?: (response: ServiceResponse) => void, opt?: ServiceOptions<any>): PromiseLike<ServiceResponse>;
    export declare function DeactivateAll(request: ServiceRequest, onSuccess?: (response: ServiceResponse) => void, opt?: ServiceOptions<any>): PromiseLike<ServiceResponse>;
    export declare function SetCoordinator(request: SetCoordinatorRequest, onSuccess?: (response: ServiceResponse) => void, opt?: ServiceOptions<any>): PromiseLike<ServiceResponse>;
    export declare function DeleteAll(request: ServiceRequest, onSuccess?: (response: ServiceResponse) => void, opt?: ServiceOptions<any>): PromiseLike<ServiceResponse>;

    export const Methods = {
        Create: "Administration/TrainingCourseFile/Create",
        Update: "Administration/TrainingCourseFile/Update",
        Delete: "Administration/TrainingCourseFile/Delete",
        Retrieve: "Administration/TrainingCourseFile/Retrieve",
        List: "Administration/TrainingCourseFile/List",
        Summary: "Administration/TrainingCourseFile/Summary",
        CourseCoordinators: "Administration/TrainingCourseFile/CourseCoordinators",
        ActivateAll: "Administration/TrainingCourseFile/ActivateAll",
        DeactivateAll: "Administration/TrainingCourseFile/DeactivateAll",
        SetCoordinator: "Administration/TrainingCourseFile/SetCoordinator",
        DeleteAll: "Administration/TrainingCourseFile/DeleteAll"
    } as const;

    [
        'Create',
        'Update',
        'Delete',
        'Retrieve',
        'List',
        'Summary',
        'CourseCoordinators',
        'ActivateAll',
        'DeactivateAll',
        'SetCoordinator',
        'DeleteAll'
    ].forEach(x => {
        (<any>TrainingCourseFileService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}