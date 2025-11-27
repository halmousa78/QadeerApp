import { EntityDialog } from "@serenity-is/corelib";
import { TrainingScheduleImportForm, TrainingScheduleImportRow, TrainingScheduleImportService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";

export class TrainingScheduleImportDialog extends EntityDialog<TrainingScheduleImportRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getFormKey() { return TrainingScheduleImportForm.formKey; }
    protected override getIdProperty() { return TrainingScheduleImportRow.idProperty; }
    protected override getIsActiveProperty() { return TrainingScheduleImportRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return TrainingScheduleImportRow.localTextPrefix; }
    protected override getNameProperty() { return TrainingScheduleImportRow.nameProperty; }
    protected override getService() { return TrainingScheduleImportService.baseUrl; }

    protected form = new TrainingScheduleImportForm(this.idPrefix);
}
