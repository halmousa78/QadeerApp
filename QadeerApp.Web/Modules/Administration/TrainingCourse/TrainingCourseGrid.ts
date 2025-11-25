import { EntityGrid } from "@serenity-is/corelib";
import { TrainingCourseColumns, TrainingCourseRow, TrainingCourseService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";
import { TrainingCourseDialog } from "./TrainingCourseDialog";

export class TrainingCourseGrid extends EntityGrid<TrainingCourseRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getColumnsKey() { return TrainingCourseColumns.columnsKey; }
    protected override getDialogType() { return TrainingCourseDialog; }
    protected override getIdProperty() { return TrainingCourseRow.idProperty; }
    protected override getIsActiveProperty() { return TrainingCourseRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return TrainingCourseRow.localTextPrefix; }
    protected override getService() { return TrainingCourseService.baseUrl; }

    protected override getDefaultSortBy() {
        return [TrainingCourseRow.Fields.Name];
    }
}
