import { GridEditorBase } from "@serenity-is/extensions";
import { EmployeeExperienceColumns, EmployeeExperienceRow } from "../../ServerTypes/Cv";
import { nsCv } from "../../ServerTypes/Namespaces";
import { EmployeeExperienceDialog } from "./EmployeeExperienceDialog";

export class EmployeeExperienceEditor extends GridEditorBase<EmployeeExperienceRow> {
    static override [Symbol.typeInfo] = this.registerEditor(nsCv);

    protected override getColumnsKey() { return EmployeeExperienceColumns.columnsKey; }
    protected override getDialogType() { return EmployeeExperienceDialog; }
    protected override getLocalTextPrefix() { return EmployeeExperienceRow.localTextPrefix; }
}
