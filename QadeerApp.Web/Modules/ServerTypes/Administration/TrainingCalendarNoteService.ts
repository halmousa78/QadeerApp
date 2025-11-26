import { DeleteRequest, DeleteResponse, ListRequest, ListResponse, RetrieveRequest, RetrieveResponse, SaveRequest, SaveResponse, ServiceOptions, serviceRequest } from "@serenity-is/corelib";
import { TrainingCalendarNoteRow } from "./TrainingCalendarNoteRow";

export namespace TrainingCalendarNoteService {
    export const baseUrl = 'Administration/TrainingCalendarNote';

    export declare function Create(request: SaveRequest<TrainingCalendarNoteRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Update(request: SaveRequest<TrainingCalendarNoteRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): PromiseLike<DeleteResponse>;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<TrainingCalendarNoteRow>) => void, opt?: ServiceOptions<any>): PromiseLike<RetrieveResponse<TrainingCalendarNoteRow>>;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<TrainingCalendarNoteRow>) => void, opt?: ServiceOptions<any>): PromiseLike<ListResponse<TrainingCalendarNoteRow>>;

    export const Methods = {
        Create: "Administration/TrainingCalendarNote/Create",
        Update: "Administration/TrainingCalendarNote/Update",
        Delete: "Administration/TrainingCalendarNote/Delete",
        Retrieve: "Administration/TrainingCalendarNote/Retrieve",
        List: "Administration/TrainingCalendarNote/List"
    } as const;

    [
        'Create',
        'Update',
        'Delete',
        'Retrieve',
        'List'
    ].forEach(x => {
        (<any>TrainingCalendarNoteService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}