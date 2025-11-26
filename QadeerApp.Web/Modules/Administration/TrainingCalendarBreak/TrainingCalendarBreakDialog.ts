import { EntityDialog } from "@serenity-is/corelib";
import { TrainingCalendarBreakForm, TrainingCalendarBreakRow, TrainingCalendarBreakService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";

export class TrainingCalendarBreakDialog extends EntityDialog<TrainingCalendarBreakRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getFormKey() { return TrainingCalendarBreakForm.formKey; }
    protected override getIdProperty() { return TrainingCalendarBreakRow.idProperty; }
    protected override getIsActiveProperty() { return TrainingCalendarBreakRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return TrainingCalendarBreakRow.localTextPrefix; }
    protected override getNameProperty() { return TrainingCalendarBreakRow.nameProperty; }
    protected override getService() { return TrainingCalendarBreakService.baseUrl; }

    protected form = new TrainingCalendarBreakForm(this.idPrefix);
}
