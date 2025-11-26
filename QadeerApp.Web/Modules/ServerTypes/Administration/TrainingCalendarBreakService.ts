import { DeleteRequest, DeleteResponse, ListRequest, ListResponse, RetrieveRequest, RetrieveResponse, SaveRequest, SaveResponse, ServiceOptions, serviceRequest } from "@serenity-is/corelib";
import { TrainingCalendarBreakRow } from "./TrainingCalendarBreakRow";

export namespace TrainingCalendarBreakService {
    export const baseUrl = 'Administration/TrainingCalendarBreak';

    export declare function Create(request: SaveRequest<TrainingCalendarBreakRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Update(request: SaveRequest<TrainingCalendarBreakRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): PromiseLike<DeleteResponse>;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<TrainingCalendarBreakRow>) => void, opt?: ServiceOptions<any>): PromiseLike<RetrieveResponse<TrainingCalendarBreakRow>>;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<TrainingCalendarBreakRow>) => void, opt?: ServiceOptions<any>): PromiseLike<ListResponse<TrainingCalendarBreakRow>>;

    export const Methods = {
        Create: "Administration/TrainingCalendarBreak/Create",
        Update: "Administration/TrainingCalendarBreak/Update",
        Delete: "Administration/TrainingCalendarBreak/Delete",
        Retrieve: "Administration/TrainingCalendarBreak/Retrieve",
        List: "Administration/TrainingCalendarBreak/List"
    } as const;

    [
        'Create',
        'Update',
        'Delete',
        'Retrieve',
        'List'
    ].forEach(x => {
        (<any>TrainingCalendarBreakService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}