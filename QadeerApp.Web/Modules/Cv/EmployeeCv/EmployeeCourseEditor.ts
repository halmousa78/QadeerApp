import { GridEditorBase } from "@serenity-is/extensions";
import { EmployeeCourseColumns, EmployeeCourseRow } from "../../ServerTypes/Cv";
import { nsCv } from "../../ServerTypes/Namespaces";
import { EmployeeCourseDialog } from "./EmployeeCourseDialog";

export class EmployeeCourseEditor extends GridEditorBase<EmployeeCourseRow> {
    static override [Symbol.typeInfo] = this.registerEditor(nsCv);

    protected override getColumnsKey() { return EmployeeCourseColumns.columnsKey; }
    protected override getDialogType() { return EmployeeCourseDialog; }
    protected override getLocalTextPrefix() { return EmployeeCourseRow.localTextPrefix; }
}
