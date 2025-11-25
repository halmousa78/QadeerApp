import { ColumnsBase, fieldsProxy } from "@serenity-is/corelib";
import { Column } from "@serenity-is/sleekgrid";
import { TrainingTermRow } from "./TrainingTermRow";

export interface TrainingTermColumns {
    TrainingTermId: Column<TrainingTermRow>;
    Name: Column<TrainingTermRow>;
    IsActive: Column<TrainingTermRow>;
}

export class TrainingTermColumns extends ColumnsBase<TrainingTermRow> {
    static readonly columnsKey = 'Administration.TrainingTerm';
    static readonly Fields = fieldsProxy<TrainingTermColumns>();
}
