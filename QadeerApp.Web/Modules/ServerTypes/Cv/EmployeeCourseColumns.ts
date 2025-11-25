import { ColumnsBase, fieldsProxy } from "@serenity-is/corelib";
import { Column } from "@serenity-is/sleekgrid";
import { EmployeeCourseRow } from "./EmployeeCourseRow";

export interface EmployeeCourseColumns {
    Name: Column<EmployeeCourseRow>;
}

export class EmployeeCourseColumns extends ColumnsBase<EmployeeCourseRow> {
    static readonly columnsKey = 'Cv.EmployeeCourse';
    static readonly Fields = fieldsProxy<EmployeeCourseColumns>();
}
