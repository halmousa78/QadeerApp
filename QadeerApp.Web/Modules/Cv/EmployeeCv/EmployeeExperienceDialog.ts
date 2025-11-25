import { GridEditorDialog } from "@serenity-is/extensions";
import { EmployeeExperienceForm, EmployeeExperienceRow } from "../../ServerTypes/Cv";
import { nsCv } from "../../ServerTypes/Namespaces";

export class EmployeeExperienceDialog extends GridEditorDialog<EmployeeExperienceRow> {
    static override [Symbol.typeInfo] = this.registerClass(nsCv);

    protected override getFormKey() { return EmployeeExperienceForm.formKey; }
    protected override getLocalTextPrefix() { return EmployeeExperienceRow.localTextPrefix; }

    protected form = new EmployeeExperienceForm(this.idPrefix);
}
