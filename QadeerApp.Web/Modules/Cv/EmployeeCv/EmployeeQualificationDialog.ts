import { GridEditorDialog } from "@serenity-is/extensions";
import { EmployeeQualificationForm, EmployeeQualificationRow } from "../../ServerTypes/Cv";
import { nsCv } from "../../ServerTypes/Namespaces";

export class EmployeeQualificationDialog extends GridEditorDialog<EmployeeQualificationRow> {
    static override [Symbol.typeInfo] = this.registerClass(nsCv);

    protected override getFormKey() { return EmployeeQualificationForm.formKey; }
    protected override getLocalTextPrefix() { return EmployeeQualificationRow.localTextPrefix; }

    protected form = new EmployeeQualificationForm(this.idPrefix);
}
