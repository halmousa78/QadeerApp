import { BooleanEditor, initFormType, IntegerEditor, LookupEditor, PrefixedContext, StringEditor } from "@serenity-is/corelib";

export interface PortalLinkForm {
    DepartmentId: LookupEditor;
    SpecializationId: LookupEditor;
    Title: StringEditor;
    Url: StringEditor;
    DisplayOrder: IntegerEditor;
    IsActive: BooleanEditor;
}

export class PortalLinkForm extends PrefixedContext {
    static readonly formKey = 'Administration.PortalLink';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!PortalLinkForm.init) {
            PortalLinkForm.init = true;

            var w0 = LookupEditor;
            var w1 = StringEditor;
            var w2 = IntegerEditor;
            var w3 = BooleanEditor;

            initFormType(PortalLinkForm, [
                'DepartmentId', w0,
                'SpecializationId', w0,
                'Title', w1,
                'Url', w1,
                'DisplayOrder', w2,
                'IsActive', w3
            ]);
        }
    }
}