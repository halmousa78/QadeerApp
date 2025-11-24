import { EmailAddressEditor, initFormType, LookupEditor, PasswordEditor, PrefixedContext, StringEditor } from "@serenity-is/corelib";

export interface SignUpForm {
    DisplayName: StringEditor;
    DepartmentId: LookupEditor;
    SpecializationId: LookupEditor;
    Email: EmailAddressEditor;
    ConfirmEmail: EmailAddressEditor;
    Password: PasswordEditor;
    ConfirmPassword: PasswordEditor;
}

export class SignUpForm extends PrefixedContext {
    static readonly formKey = 'Membership.SignUp';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!SignUpForm.init) {
            SignUpForm.init = true;

            var w0 = StringEditor;
            var w1 = LookupEditor;
            var w2 = EmailAddressEditor;
            var w3 = PasswordEditor;

            initFormType(SignUpForm, [
                'DisplayName', w0,
                'DepartmentId', w1,
                'SpecializationId', w1,
                'Email', w2,
                'ConfirmEmail', w2,
                'Password', w3,
                'ConfirmPassword', w3
            ]);
        }
    }
}
