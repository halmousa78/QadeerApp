import { ColumnsBase, fieldsProxy } from "@serenity-is/corelib";
import { Column } from "@serenity-is/sleekgrid";
import { EmployeeQualificationRow } from "./EmployeeQualificationRow";

export interface EmployeeQualificationColumns {
    Name: Column<EmployeeQualificationRow>;
}

export class EmployeeQualificationColumns extends ColumnsBase<EmployeeQualificationRow> {
    static readonly columnsKey = 'Cv.EmployeeQualification';
    static readonly Fields = fieldsProxy<EmployeeQualificationColumns>();
}
