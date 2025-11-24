import { BooleanEditor, EmailAddressEditor, ImageUploadEditor, initFormType, LookupEditor, PasswordEditor, PrefixedContext, StringEditor } from "@serenity-is/corelib";

export interface UserForm {
    Username: StringEditor;
    DisplayName: StringEditor;
    DepartmentId: LookupEditor;
    SpecializationId: LookupEditor;
    Email: EmailAddressEditor;
    Roles: LookupEditor;
    UserImage: ImageUploadEditor;
    Password: PasswordEditor;
    PasswordConfirm: PasswordEditor;
    Source: StringEditor;
    IsActive: BooleanEditor;
}

export class UserForm extends PrefixedContext {
    static readonly formKey = 'Administration.User';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!UserForm.init) {
            UserForm.init = true;

            var w0 = StringEditor;
            var w1 = LookupEditor;
            var w2 = EmailAddressEditor;
            var w3 = ImageUploadEditor;
            var w4 = PasswordEditor;
            var w5 = BooleanEditor;

            initFormType(UserForm, [
                'Username', w0,
                'DisplayName', w0,
                'DepartmentId', w1,
                'SpecializationId', w1,
                'Email', w2,
                'Roles', w1,
                'UserImage', w3,
                'Password', w4,
                'PasswordConfirm', w4,
                'Source', w0,
                'IsActive', w5
            ]);
        }
    }
}
