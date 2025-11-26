import { EntityDialog } from "@serenity-is/corelib";
import { TrainingCalendarNoteForm, TrainingCalendarNoteRow, TrainingCalendarNoteService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";

export class TrainingCalendarNoteDialog extends EntityDialog<TrainingCalendarNoteRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getFormKey() { return TrainingCalendarNoteForm.formKey; }
    protected override getIdProperty() { return TrainingCalendarNoteRow.idProperty; }
    protected override getIsActiveProperty() { return TrainingCalendarNoteRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return TrainingCalendarNoteRow.localTextPrefix; }
    protected override getNameProperty() { return TrainingCalendarNoteRow.nameProperty; }
    protected override getService() { return TrainingCalendarNoteService.baseUrl; }

    protected form = new TrainingCalendarNoteForm(this.idPrefix);
}
