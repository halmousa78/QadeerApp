import { DeleteRequest, DeleteResponse, ListRequest, ListResponse, RetrieveRequest, RetrieveResponse, SaveRequest, SaveResponse, ServiceOptions, serviceRequest } from "@serenity-is/corelib";
import { PortalLinkRow } from "./PortalLinkRow";

export namespace PortalLinkService {
    export const baseUrl = 'Administration/PortalLink';

    export declare function Create(request: SaveRequest<PortalLinkRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Update(request: SaveRequest<PortalLinkRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): PromiseLike<SaveResponse>;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): PromiseLike<DeleteResponse>;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<PortalLinkRow>) => void, opt?: ServiceOptions<any>): PromiseLike<RetrieveResponse<PortalLinkRow>>;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<PortalLinkRow>) => void, opt?: ServiceOptions<any>): PromiseLike<ListResponse<PortalLinkRow>>;

    export const Methods = {
        Create: "Administration/PortalLink/Create",
        Update: "Administration/PortalLink/Update",
        Delete: "Administration/PortalLink/Delete",
        Retrieve: "Administration/PortalLink/Retrieve",
        List: "Administration/PortalLink/List"
    } as const;

    [
        'Create',
        'Update',
        'Delete',
        'Retrieve',
        'List'
    ].forEach(x => {
        (<any>PortalLinkService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}