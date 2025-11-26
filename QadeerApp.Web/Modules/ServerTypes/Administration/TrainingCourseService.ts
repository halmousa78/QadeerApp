import { DeleteRequest, DeleteResponse, ListRequest, ListResponse, RetrieveRequest, RetrieveResponse, SaveRequest, SaveResponse, ServiceOptions, serviceRequest } from "@serenity-is/corelib";
import { TrainingCourseImportRequest } from "./TrainingCourseImportRequest";
import { TrainingCourseImportResponse } from "./TrainingCourseImportResponse";
import { TrainingCourseRow } from "./TrainingCourseRow";

export namespace TrainingCourseService {
    export const baseUrl = 'Administration/TrainingCourse';

    export declare function Create(request: SaveRequest<TrainingCourseRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Update(request: SaveRequest<TrainingCourseRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): PromiseLike<DeleteResponse>;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<TrainingCourseRow>) => void, opt?: ServiceOptions<any>): PromiseLike<RetrieveResponse<TrainingCourseRow>>;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<TrainingCourseRow>) => void, opt?: ServiceOptions<any>): PromiseLike<ListResponse<TrainingCourseRow>>;
    export declare function ImportExcel(request: TrainingCourseImportRequest, onSuccess?: (response: TrainingCourseImportResponse) => void, opt?: ServiceOptions<any>): PromiseLike<TrainingCourseImportResponse>;

    export const Methods = {
        Create: "Administration/TrainingCourse/Create",
        Update: "Administration/TrainingCourse/Update",
        Delete: "Administration/TrainingCourse/Delete",
        Retrieve: "Administration/TrainingCourse/Retrieve",
        List: "Administration/TrainingCourse/List",
        ImportExcel: "Administration/TrainingCourse/ImportExcel"
    } as const;

    [
        'Create',
        'Update',
        'Delete',
        'Retrieve',
        'List',
        'ImportExcel'
    ].forEach(x => {
        (<any>TrainingCourseService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}
