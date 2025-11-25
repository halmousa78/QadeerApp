import { EntityDialog } from "@serenity-is/corelib";
import { TrainingTermForm, TrainingTermRow, TrainingTermService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";

export class TrainingTermDialog extends EntityDialog<TrainingTermRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getFormKey() { return TrainingTermForm.formKey; }
    protected override getIdProperty() { return TrainingTermRow.idProperty; }
    protected override getIsActiveProperty() { return TrainingTermRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return TrainingTermRow.localTextPrefix; }
    protected override getNameProperty() { return TrainingTermRow.nameProperty; }
    protected override getService() { return TrainingTermService.baseUrl; }

    protected form = new TrainingTermForm(this.idPrefix);
}
