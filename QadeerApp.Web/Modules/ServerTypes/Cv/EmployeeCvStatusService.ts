import { ListRequest, ListResponse, RetrieveRequest, RetrieveResponse, ServiceOptions, serviceRequest } from "@serenity-is/corelib";
import { EmployeeCvStatusRow } from "./EmployeeCvStatusRow";

export namespace EmployeeCvStatusService {
    export const baseUrl = 'Cv/EmployeeCvStatus';

    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<EmployeeCvStatusRow>) => void, opt?: ServiceOptions<any>): PromiseLike<ListResponse<EmployeeCvStatusRow>>;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<EmployeeCvStatusRow>) => void, opt?: ServiceOptions<any>): PromiseLike<RetrieveResponse<EmployeeCvStatusRow>>;

    export const Methods = {
        List: "Cv/EmployeeCvStatus/List",
        Retrieve: "Cv/EmployeeCvStatus/Retrieve"
    } as const;

    [
        'List',
        'Retrieve'
    ].forEach(x => {
        (<any>EmployeeCvStatusService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}