import { ColumnsBase, fieldsProxy } from "@serenity-is/corelib";
import { Column } from "@serenity-is/sleekgrid";
import { EmployeeCvStatusRow } from "./EmployeeCvStatusRow";

export interface EmployeeCvStatusColumns {
    DisplayName: Column<EmployeeCvStatusRow>;
    DepartmentName: Column<EmployeeCvStatusRow>;
    SpecializationName: Column<EmployeeCvStatusRow>;
    IsCompleted: Column<EmployeeCvStatusRow>;
    CvUpdatedOn: Column<EmployeeCvStatusRow>;
    QualificationCount: Column<EmployeeCvStatusRow>;
    ExperienceCount: Column<EmployeeCvStatusRow>;
    CourseCount: Column<EmployeeCvStatusRow>;
}

export class EmployeeCvStatusColumns extends ColumnsBase<EmployeeCvStatusRow> {
    static readonly columnsKey = 'Cv.EmployeeCvStatus';
    static readonly Fields = fieldsProxy<EmployeeCvStatusColumns>();
}
