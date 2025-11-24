import { EntityDialog } from "@serenity-is/corelib";
import { SpecializationForm, SpecializationRow, SpecializationService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";

export class SpecializationDialog extends EntityDialog<SpecializationRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getFormKey() { return SpecializationForm.formKey; }
    protected override getIdProperty() { return SpecializationRow.idProperty; }
    protected override getIsActiveProperty() { return SpecializationRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return SpecializationRow.localTextPrefix; }
    protected override getNameProperty() { return SpecializationRow.nameProperty; }
    protected override getService() { return SpecializationService.baseUrl; }

    protected form = new SpecializationForm(this.idPrefix);
}
