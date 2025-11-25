import { EntityDialog } from "@serenity-is/corelib";
import { TrainingGradeForm, TrainingGradeRow, TrainingGradeService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";

export class TrainingGradeDialog extends EntityDialog<TrainingGradeRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getFormKey() { return TrainingGradeForm.formKey; }
    protected override getIdProperty() { return TrainingGradeRow.idProperty; }
    protected override getLocalTextPrefix() { return TrainingGradeRow.localTextPrefix; }
    protected override getNameProperty() { return TrainingGradeRow.nameProperty; }
    protected override getService() { return TrainingGradeService.baseUrl; }

    protected form = new TrainingGradeForm(this.idPrefix);
}
