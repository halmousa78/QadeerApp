import { DeleteRequest, DeleteResponse, ListRequest, ListResponse, RetrieveRequest, RetrieveResponse, SaveRequest, SaveResponse, ServiceOptions, ServiceRequest, serviceRequest, ServiceResponse } from "@serenity-is/corelib";
import { TermRequest } from "./TermRequest";
import { TrainingScheduleImportRequest } from "./TrainingScheduleImportRequest";
import { TrainingScheduleImportResponse } from "./TrainingScheduleImportResponse";
import { TrainingScheduleImportRow } from "./TrainingScheduleImportRow";
import { TrainingScheduleSummaryResponse } from "./TrainingScheduleSummaryResponse";

export namespace TrainingScheduleImportService {
    export const baseUrl = 'Administration/TrainingScheduleImport';

    export declare function Create(request: SaveRequest<TrainingScheduleImportRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Update(request: SaveRequest<TrainingScheduleImportRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): PromiseLike<DeleteResponse>;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<TrainingScheduleImportRow>) => void, opt?: ServiceOptions<any>): PromiseLike<RetrieveResponse<TrainingScheduleImportRow>>;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<TrainingScheduleImportRow>) => void, opt?: ServiceOptions<any>): PromiseLike<ListResponse<TrainingScheduleImportRow>>;
    export declare function Import(request: TrainingScheduleImportRequest, onSuccess?: (response: TrainingScheduleImportResponse) => void, opt?: ServiceOptions<any>): PromiseLike<TrainingScheduleImportResponse>;
    export declare function DeleteTermData(request: TermRequest, onSuccess?: (response: ServiceResponse) => void, opt?: ServiceOptions<any>): PromiseLike<ServiceResponse>;
    export declare function DeactivateTerm(request: TermRequest, onSuccess?: (response: ServiceResponse) => void, opt?: ServiceOptions<any>): PromiseLike<ServiceResponse>;
    export declare function ActivateAll(request: ServiceRequest, onSuccess?: (response: ServiceResponse) => void, opt?: ServiceOptions<any>): PromiseLike<ServiceResponse>;
    export declare function DeactivateAll(request: ServiceRequest, onSuccess?: (response: ServiceResponse) => void, opt?: ServiceOptions<any>): PromiseLike<ServiceResponse>;
    export declare function DeleteAll(request: ServiceRequest, onSuccess?: (response: ServiceResponse) => void, opt?: ServiceOptions<any>): PromiseLike<ServiceResponse>;
    export declare function Summary(request: ServiceRequest, onSuccess?: (response: TrainingScheduleSummaryResponse) => void, opt?: ServiceOptions<any>): PromiseLike<TrainingScheduleSummaryResponse>;

    export const Methods = {
        Create: "Administration/TrainingScheduleImport/Create",
        Update: "Administration/TrainingScheduleImport/Update",
        Delete: "Administration/TrainingScheduleImport/Delete",
        Retrieve: "Administration/TrainingScheduleImport/Retrieve",
        List: "Administration/TrainingScheduleImport/List",
        Import: "Administration/TrainingScheduleImport/Import",
        DeleteTermData: "Administration/TrainingScheduleImport/DeleteTermData",
        DeactivateTerm: "Administration/TrainingScheduleImport/DeactivateTerm",
        ActivateAll: "Administration/TrainingScheduleImport/ActivateAll",
        DeactivateAll: "Administration/TrainingScheduleImport/DeactivateAll",
        DeleteAll: "Administration/TrainingScheduleImport/DeleteAll",
        Summary: "Administration/TrainingScheduleImport/Summary"
    } as const;

    [
        'Create',
        'Update',
        'Delete',
        'Retrieve',
        'List',
        'Import',
        'DeleteTermData',
        'DeactivateTerm',
        'ActivateAll',
        'DeactivateAll',
        'DeleteAll',
        'Summary'
    ].forEach(x => {
        (<any>TrainingScheduleImportService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}