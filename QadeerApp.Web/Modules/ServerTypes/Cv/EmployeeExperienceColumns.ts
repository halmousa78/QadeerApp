import { ColumnsBase, fieldsProxy } from "@serenity-is/corelib";
import { Column } from "@serenity-is/sleekgrid";
import { EmployeeExperienceRow } from "./EmployeeExperienceRow";

export interface EmployeeExperienceColumns {
    Name: Column<EmployeeExperienceRow>;
}

export class EmployeeExperienceColumns extends ColumnsBase<EmployeeExperienceRow> {
    static readonly columnsKey = 'Cv.EmployeeExperience';
    static readonly Fields = fieldsProxy<EmployeeExperienceColumns>();
}
