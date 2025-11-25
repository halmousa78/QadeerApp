import { GridEditorDialog } from "@serenity-is/extensions";
import { EmployeeCourseForm, EmployeeCourseRow } from "../../ServerTypes/Cv";
import { nsCv } from "../../ServerTypes/Namespaces";

export class EmployeeCourseDialog extends GridEditorDialog<EmployeeCourseRow> {
    static override [Symbol.typeInfo] = this.registerClass(nsCv);

    protected override getFormKey() { return EmployeeCourseForm.formKey; }
    protected override getLocalTextPrefix() { return EmployeeCourseRow.localTextPrefix; }

    protected form = new EmployeeCourseForm(this.idPrefix);
}
