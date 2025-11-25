import { GridEditorBase } from "@serenity-is/extensions";
import { EmployeeQualificationColumns, EmployeeQualificationRow } from "../../ServerTypes/Cv";
import { nsCv } from "../../ServerTypes/Namespaces";
import { EmployeeQualificationDialog } from "./EmployeeQualificationDialog";

export class EmployeeQualificationEditor extends GridEditorBase<EmployeeQualificationRow> {
    static override [Symbol.typeInfo] = this.registerEditor(nsCv);

    protected override getColumnsKey() { return EmployeeQualificationColumns.columnsKey; }
    protected override getDialogType() { return EmployeeQualificationDialog; }
    protected override getLocalTextPrefix() { return EmployeeQualificationRow.localTextPrefix; }
}
