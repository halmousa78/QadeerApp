import { DeleteRequest, DeleteResponse, ListRequest, ListResponse, RetrieveRequest, RetrieveResponse, SaveRequest, SaveResponse, ServiceOptions, ServiceRequest, serviceRequest } from "@serenity-is/corelib";
import { BulkDeleteResponse } from "./BulkDeleteResponse";
import { BulkStatusRequest } from "./BulkStatusRequest";
import { BulkStatusResponse } from "./BulkStatusResponse";
import { TrainingGradeImportRequest } from "./TrainingGradeImportRequest";
import { TrainingGradeImportResponse } from "./TrainingGradeImportResponse";
import { TrainingGradePivotRequest } from "./TrainingGradePivotRequest";
import { TrainingGradePivotResponse } from "./TrainingGradePivotResponse";
import { TrainingGradeRow } from "./TrainingGradeRow";
import { TrainingTermListResponse } from "./TrainingTermListResponse";

export namespace TrainingGradeService {
    export const baseUrl = 'Administration/TrainingGrade';

    export declare function Create(request: SaveRequest<TrainingGradeRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Update(request: SaveRequest<TrainingGradeRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): PromiseLike<DeleteResponse>;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<TrainingGradeRow>) => void, opt?: ServiceOptions<any>): PromiseLike<RetrieveResponse<TrainingGradeRow>>;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<TrainingGradeRow>) => void, opt?: ServiceOptions<any>): PromiseLike<ListResponse<TrainingGradeRow>>;
    export declare function Import(request: TrainingGradeImportRequest, onSuccess?: (response: TrainingGradeImportResponse) => void, opt?: ServiceOptions<any>): PromiseLike<TrainingGradeImportResponse>;
    export declare function BulkUpdateStatus(request: BulkStatusRequest, onSuccess?: (response: BulkStatusResponse) => void, opt?: ServiceOptions<any>): PromiseLike<BulkStatusResponse>;
    export declare function BulkDeleteByTerm(request: BulkStatusRequest, onSuccess?: (response: BulkDeleteResponse) => void, opt?: ServiceOptions<any>): PromiseLike<BulkDeleteResponse>;
    export declare function ListTerms(request: ServiceRequest, onSuccess?: (response: TrainingTermListResponse) => void, opt?: ServiceOptions<any>): PromiseLike<TrainingTermListResponse>;
    export declare function PivotData(request: TrainingGradePivotRequest, onSuccess?: (response: TrainingGradePivotResponse) => void, opt?: ServiceOptions<any>): PromiseLike<TrainingGradePivotResponse>;

    export const Methods = {
        Create: "Administration/TrainingGrade/Create",
        Update: "Administration/TrainingGrade/Update",
        Delete: "Administration/TrainingGrade/Delete",
        Retrieve: "Administration/TrainingGrade/Retrieve",
        List: "Administration/TrainingGrade/List",
        Import: "Administration/TrainingGrade/Import",
        BulkUpdateStatus: "Administration/TrainingGrade/BulkUpdateStatus",
        BulkDeleteByTerm: "Administration/TrainingGrade/BulkDeleteByTerm",
        ListTerms: "Administration/TrainingGrade/ListTerms",
        PivotData: "Administration/TrainingGrade/PivotData"
    } as const;

    [
        'Create',
        'Update',
        'Delete',
        'Retrieve',
        'List',
        'Import',
        'BulkUpdateStatus',
        'BulkDeleteByTerm',
        'ListTerms',
        'PivotData'
    ].forEach(x => {
        (<any>TrainingGradeService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}
