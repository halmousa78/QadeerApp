import { DeleteRequest, DeleteResponse, ListRequest, ListResponse, RetrieveRequest, RetrieveResponse, SaveRequest, SaveResponse, ServiceOptions, serviceRequest } from "@serenity-is/corelib";
import { TrainingTermRow } from "./TrainingTermRow";

export namespace TrainingTermService {
    export const baseUrl = 'Administration/TrainingTerm';

    export declare function Create(request: SaveRequest<TrainingTermRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Update(request: SaveRequest<TrainingTermRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): PromiseLike<DeleteResponse>;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<TrainingTermRow>) => void, opt?: ServiceOptions<any>): PromiseLike<RetrieveResponse<TrainingTermRow>>;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<TrainingTermRow>) => void, opt?: ServiceOptions<any>): PromiseLike<ListResponse<TrainingTermRow>>;

    export const Methods = {
        Create: "Administration/TrainingTerm/Create",
        Update: "Administration/TrainingTerm/Update",
        Delete: "Administration/TrainingTerm/Delete",
        Retrieve: "Administration/TrainingTerm/Retrieve",
        List: "Administration/TrainingTerm/List"
    } as const;

    [
        'Create',
        'Update',
        'Delete',
        'Retrieve',
        'List'
    ].forEach(x => {
        (<any>TrainingTermService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}
