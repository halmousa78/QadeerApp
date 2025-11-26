import { DeleteRequest, DeleteResponse, ListRequest, ListResponse, RetrieveRequest, RetrieveResponse, SaveRequest, SaveResponse, ServiceOptions, serviceRequest } from "@serenity-is/corelib";
import { TrainingCalendarRow } from "./TrainingCalendarRow";

export namespace TrainingCalendarService {
    export const baseUrl = 'Administration/TrainingCalendar';

    export declare function Create(request: SaveRequest<TrainingCalendarRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Update(request: SaveRequest<TrainingCalendarRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): PromiseLike<DeleteResponse>;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<TrainingCalendarRow>) => void, opt?: ServiceOptions<any>): PromiseLike<RetrieveResponse<TrainingCalendarRow>>;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<TrainingCalendarRow>) => void, opt?: ServiceOptions<any>): PromiseLike<ListResponse<TrainingCalendarRow>>;

    export const Methods = {
        Create: "Administration/TrainingCalendar/Create",
        Update: "Administration/TrainingCalendar/Update",
        Delete: "Administration/TrainingCalendar/Delete",
        Retrieve: "Administration/TrainingCalendar/Retrieve",
        List: "Administration/TrainingCalendar/List"
    } as const;

    [
        'Create',
        'Update',
        'Delete',
        'Retrieve',
        'List'
    ].forEach(x => {
        (<any>TrainingCalendarService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}