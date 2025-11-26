import { EntityDialog } from "@serenity-is/corelib";
import { TrainingCalendarForm, TrainingCalendarRow, TrainingCalendarService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";

export class TrainingCalendarDialog extends EntityDialog<TrainingCalendarRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getFormKey() { return TrainingCalendarForm.formKey; }
    protected override getIdProperty() { return TrainingCalendarRow.idProperty; }
    protected override getIsActiveProperty() { return TrainingCalendarRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return TrainingCalendarRow.localTextPrefix; }
    protected override getNameProperty() { return TrainingCalendarRow.nameProperty; }
    protected override getService() { return TrainingCalendarService.baseUrl; }

    protected form = new TrainingCalendarForm(this.idPrefix);
}
