import { fieldsProxy, getLookup, getLookupAsync } from "@serenity-is/corelib";

export interface TrainingTermRow {
    TrainingTermId?: number;
    Name?: string;
    IsActive?: number;
    DeleteUserId?: number;
    DeleteDate?: string;
    InsertUserId?: number;
    InsertDate?: string;
    UpdateUserId?: number;
    UpdateDate?: string;
}

export abstract class TrainingTermRow {
    static readonly idProperty = 'TrainingTermId';
    static readonly isActiveProperty = 'IsActive';
    static readonly nameProperty = 'Name';
    static readonly localTextPrefix = 'Administration.TrainingTerm';
    static readonly lookupKey = 'Administration.TrainingTerm';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<TrainingTermRow>('Administration.TrainingTerm') }
    static async getLookupAsync() { return getLookupAsync<TrainingTermRow>('Administration.TrainingTerm') }

    static readonly deletePermission = 'Administration:TrainingTerms:Delete';
    static readonly insertPermission = 'Administration:TrainingTerms:Insert';
    static readonly readPermission = 'Administration:TrainingTerms:View';
    static readonly updatePermission = 'Administration:TrainingTerms:Update';

    static readonly Fields = fieldsProxy<TrainingTermRow>();
}
