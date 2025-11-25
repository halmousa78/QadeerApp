import { EntityDialog } from "@serenity-is/corelib";
import { TrainingCourseForm, TrainingCourseRow, TrainingCourseService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";

export class TrainingCourseDialog extends EntityDialog<TrainingCourseRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getFormKey() { return TrainingCourseForm.formKey; }
    protected override getIdProperty() { return TrainingCourseRow.idProperty; }
    protected override getIsActiveProperty() { return TrainingCourseRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return TrainingCourseRow.localTextPrefix; }
    protected override getNameProperty() { return TrainingCourseRow.nameProperty; }
    protected override getService() { return TrainingCourseService.baseUrl; }

    protected form = new TrainingCourseForm(this.idPrefix);
}
