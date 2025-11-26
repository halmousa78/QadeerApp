import { ColumnsBase, fieldsProxy } from "@serenity-is/corelib";
import { Column } from "@serenity-is/sleekgrid";
import { EmployeeCvRow } from "./EmployeeCvRow";
import { EnglishLevel } from "./EnglishLevel";

export interface EmployeeCvColumns {
    UserDisplayName: Column<EmployeeCvRow>;
    EmployeeNumber: Column<EmployeeCvRow>;
    Mobile: Column<EmployeeCvRow>;
    EnglishLevel: Column<EmployeeCvRow>;
    ExtensionNumber: Column<EmployeeCvRow>;
    OfficeNumber: Column<EmployeeCvRow>;
    BuildingNumber: Column<EmployeeCvRow>;
    CvUpdatedOn: Column<EmployeeCvRow>;
}

export class EmployeeCvColumns extends ColumnsBase<EmployeeCvRow> {
    static readonly columnsKey = 'Cv.EmployeeCv';
    static readonly Fields = fieldsProxy<EmployeeCvColumns>();
}

[EnglishLevel]; // referenced types