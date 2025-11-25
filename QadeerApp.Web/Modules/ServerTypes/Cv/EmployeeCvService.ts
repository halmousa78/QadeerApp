import { DeleteRequest, DeleteResponse, ListRequest, ListResponse, RetrieveRequest, RetrieveResponse, SaveRequest, SaveResponse, ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib";
import { CvStatusResponse } from "./CvStatusResponse";
import { EmployeeCvRow } from "./EmployeeCvRow";

export namespace EmployeeCvService {
    export const baseUrl = 'Cv/EmployeeCv';

    export declare function Create(request: SaveRequest<EmployeeCvRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Update(request: SaveRequest<EmployeeCvRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): PromiseLike<DeleteResponse>;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<EmployeeCvRow>) => void, opt?: ServiceOptions<any>): PromiseLike<RetrieveResponse<EmployeeCvRow>>;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<EmployeeCvRow>) => void, opt?: ServiceOptions<any>): PromiseLike<ListResponse<EmployeeCvRow>>;
    export declare function CheckStatus(request: ServiceRequest, onSuccess?: (response: CvStatusResponse) => void, opt?: ServiceOptions<any>): PromiseLike<CvStatusResponse>;

    export const Methods = {
        Create: "Cv/EmployeeCv/Create",
        Update: "Cv/EmployeeCv/Update",
        Delete: "Cv/EmployeeCv/Delete",
        Retrieve: "Cv/EmployeeCv/Retrieve",
        List: "Cv/EmployeeCv/List",
        CheckStatus: "Cv/EmployeeCv/CheckStatus"
    } as const;

    [
        'Create',
        'Update',
        'Delete',
        'Retrieve',
        'List',
        'CheckStatus'
    ].forEach(x => {
        (<any>EmployeeCvService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}