import { DeleteRequest, DeleteResponse, ListRequest, ListResponse, RetrieveRequest, RetrieveResponse, SaveRequest, SaveResponse, ServiceOptions, serviceRequest } from "@serenity-is/corelib";
import { SpecializationRow } from "./SpecializationRow";

export namespace SpecializationService {
    export const baseUrl = 'Administration/Specialization';

    export declare function Create(request: SaveRequest<SpecializationRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Update(request: SaveRequest<SpecializationRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): PromiseLike<DeleteResponse>;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<SpecializationRow>) => void, opt?: ServiceOptions<any>): PromiseLike<RetrieveResponse<SpecializationRow>>;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<SpecializationRow>) => void, opt?: ServiceOptions<any>): PromiseLike<ListResponse<SpecializationRow>>;

    export const Methods = {
        Create: "Administration/Specialization/Create",
        Update: "Administration/Specialization/Update",
        Delete: "Administration/Specialization/Delete",
        Retrieve: "Administration/Specialization/Retrieve",
        List: "Administration/Specialization/List"
    } as const;

    [
        'Create',
        'Update',
        'Delete',
        'Retrieve',
        'List'
    ].forEach(x => {
        (<any>SpecializationService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}
