import { EntityDialog } from "@serenity-is/corelib";
import { DepartmentForm, DepartmentRow, DepartmentService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";

export class DepartmentDialog extends EntityDialog<DepartmentRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getFormKey() { return DepartmentForm.formKey; }
    protected override getIdProperty() { return DepartmentRow.idProperty; }
    protected override getIsActiveProperty() { return DepartmentRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return DepartmentRow.localTextPrefix; }
    protected override getNameProperty() { return DepartmentRow.nameProperty; }
    protected override getService() { return DepartmentService.baseUrl; }

    protected form = new DepartmentForm(this.idPrefix);
}
