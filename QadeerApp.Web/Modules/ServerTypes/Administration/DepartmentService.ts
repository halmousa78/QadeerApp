import { DeleteRequest, DeleteResponse, ListRequest, ListResponse, RetrieveRequest, RetrieveResponse, SaveRequest, SaveResponse, ServiceOptions, serviceRequest } from "@serenity-is/corelib";
import { DepartmentRow } from "./DepartmentRow";

export namespace DepartmentService {
    export const baseUrl = 'Administration/Department';

    export declare function Create(request: SaveRequest<DepartmentRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Update(request: SaveRequest<DepartmentRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): PromiseLike<DeleteResponse>;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<DepartmentRow>) => void, opt?: ServiceOptions<any>): PromiseLike<RetrieveResponse<DepartmentRow>>;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<DepartmentRow>) => void, opt?: ServiceOptions<any>): PromiseLike<ListResponse<DepartmentRow>>;

    export const Methods = {
        Create: "Administration/Department/Create",
        Update: "Administration/Department/Update",
        Delete: "Administration/Department/Delete",
        Retrieve: "Administration/Department/Retrieve",
        List: "Administration/Department/List"
    } as const;

    [
        'Create',
        'Update',
        'Delete',
        'Retrieve',
        'List'
    ].forEach(x => {
        (<any>DepartmentService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}
