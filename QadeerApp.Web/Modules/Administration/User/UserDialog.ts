import { EditorUtils, EntityDialog, stringFormat } from "@serenity-is/corelib";
import { UserForm, UserRow, UserService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";
import { MembershipValidationTexts, UserDialogTexts } from "../../ServerTypes/Texts";
import { UserPermissionDialog } from "../UserPermission/UserPermissionDialog";

export class UserDialog extends EntityDialog<UserRow, any> {
    static override[Symbol.typeInfo] = this.registerClass(nsAdministration);

    private specializationGuard = false;

    protected override getFormKey() { return UserForm.formKey; }
    protected override getIdProperty() { return UserRow.idProperty; }
    protected override getIsActiveProperty() { return UserRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return UserRow.localTextPrefix; }
    protected override getNameProperty() { return UserRow.nameProperty; }
    protected override getService() { return UserService.baseUrl; }

    protected form = new UserForm(this.idPrefix);

    constructor(props?: any) {
        super(props);

        this.form.Password.change(() => {
            EditorUtils.setRequired(this.form.PasswordConfirm, this.form.Password.value.length > 0);
        });

        this.form.Password.addValidationRule(this.uniqueName, e => {
            if (this.form.Password.value.length < 6)
                return stringFormat(MembershipValidationTexts.MinRequiredPasswordLength, 6);
        });

        this.form.PasswordConfirm.addValidationRule(this.uniqueName, e => {
            if (this.form.Password.value != this.form.PasswordConfirm.value)
                return MembershipValidationTexts.PasswordConfirmMismatch;
        });

        this.form.DepartmentId.change(e => {
            this.form.SpecializationId.value = null;
            this.updateSpecializationRequirement();
        });

        this.form.SpecializationId.change(e => this.updateSpecializationRequirement());

        // make sure specialization starts with correct required state
        this.updateSpecializationRequirement();
    }

    protected override getToolbarButtons() {
        let buttons = super.getToolbarButtons();

        buttons.push({
            title: UserDialogTexts.EditPermissionsButton,
            cssClass: 'edit-permissions-button',
            icon: 'fa-lock text-green',
            onClick: () => {
                UserPermissionDialog({
                    userID: this.entity.UserId,
                    username: this.entity.Username
                });
            }
        });

        return buttons;
    }

    protected override updateInterface() {
        super.updateInterface();

        this.toolbar.findButton("edit-permissions-button").toggleClass("disabled", this.isNewOrDeleted());
    }

    protected override afterLoadEntity() {
        super.afterLoadEntity();

        // these fields are only required in new record mode
        this.form.Password.element.toggleClass('required', this.isNew())
            .closest('.field').findFirst('sup').toggle(this.isNew());
        this.form.PasswordConfirm.element.toggleClass('required', this.isNew())
            .closest('.field').findFirst('sup').toggle(this.isNew());

        this.updateSpecializationRequirement();
    }

    private updateSpecializationRequirement() {
        if (this.specializationGuard)
            return;

        this.specializationGuard = true;
        const specializationEditor: any = this.form.SpecializationId;
        const items: any[] = specializationEditor.items ?? (specializationEditor.get_items?.() ?? []);
        // when cascade has no items for the selected department we don't force a choice
        const hasOptions = items.length > 0;
        EditorUtils.setRequired(this.form.SpecializationId, hasOptions);
        if (!hasOptions && specializationEditor.value != null)
            specializationEditor.value = null;
        this.specializationGuard = false;
    }
}
