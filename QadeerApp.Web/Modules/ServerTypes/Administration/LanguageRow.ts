import { fieldsProxy, getLookup, getLookupAsync } from "@serenity-is/corelib";

export interface LanguageRow {
    LanguageId?: string;
    LanguageName?: string;
}

export abstract class LanguageRow {
    static readonly idProperty = 'LanguageId';
    static readonly nameProperty = 'LanguageName';
    static readonly localTextPrefix = 'Administration.Language';
    static readonly lookupKey = 'Administration.Language';

    /** @deprecated use getLookupAsync instead */
    static getLookup() { return getLookup<LanguageRow>('Administration.Language') }
    static async getLookupAsync() { return getLookupAsync<LanguageRow>('Administration.Language') }

    static readonly deletePermission = 'Administration:Translation:Delete';
    static readonly insertPermission = 'Administration:Translation:Insert';
    static readonly readPermission = 'Administration:Translation:View';
    static readonly updatePermission = 'Administration:Translation:Update';

    static readonly Fields = fieldsProxy<LanguageRow>();
}
