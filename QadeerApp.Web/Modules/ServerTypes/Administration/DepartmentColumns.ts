import { ColumnsBase, fieldsProxy } from "@serenity-is/corelib";
import { Column } from "@serenity-is/sleekgrid";
import { DepartmentRow } from "./DepartmentRow";

export interface DepartmentColumns {
    DepartmentId: Column<DepartmentRow>;
    Name: Column<DepartmentRow>;
    IsActive: Column<DepartmentRow>;
}

export class DepartmentColumns extends ColumnsBase<DepartmentRow> {
    static readonly columnsKey = 'Administration.Department';
    static readonly Fields = fieldsProxy<DepartmentColumns>();
}
