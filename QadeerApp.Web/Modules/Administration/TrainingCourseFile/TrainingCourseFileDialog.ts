import { EntityDialog } from "@serenity-is/corelib";
import { TrainingCourseFileForm, TrainingCourseFileRow, TrainingCourseFileService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";

export class TrainingCourseFileDialog extends EntityDialog<TrainingCourseFileRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getFormKey() { return TrainingCourseFileForm.formKey; }
    protected override getRowDefinition() { return TrainingCourseFileRow; }
    protected override getService() { return TrainingCourseFileService.baseUrl; }

    protected form = new TrainingCourseFileForm(this.idPrefix);
}
