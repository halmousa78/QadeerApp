import { ColumnsBase, fieldsProxy } from "@serenity-is/corelib";
import { Column } from "@serenity-is/sleekgrid";
import { SpecializationRow } from "./SpecializationRow";

export interface SpecializationColumns {
    SpecializationId: Column<SpecializationRow>;
    Name: Column<SpecializationRow>;
    DepartmentName: Column<SpecializationRow>;
    IsActive: Column<SpecializationRow>;
}

export class SpecializationColumns extends ColumnsBase<SpecializationRow> {
    static readonly columnsKey = 'Administration.Specialization';
    static readonly Fields = fieldsProxy<SpecializationColumns>();
}
