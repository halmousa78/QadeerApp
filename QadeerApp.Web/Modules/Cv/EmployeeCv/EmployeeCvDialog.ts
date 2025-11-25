import { EntityDialog } from "@serenity-is/corelib";
import { notifyWarning } from "@serenity-is/corelib/q";
import { EmployeeCvForm, EmployeeCvRow, EmployeeCvService } from "../../ServerTypes/Cv";
import { nsCv } from "../../ServerTypes/Namespaces";

export class EmployeeCvDialog extends EntityDialog<EmployeeCvRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsCv);

    protected override getFormKey() { return EmployeeCvForm.formKey; }
    protected override getIdProperty() { return EmployeeCvRow.idProperty; }
    protected override getLocalTextPrefix() { return EmployeeCvRow.localTextPrefix; }
    protected override getNameProperty() { return EmployeeCvRow.nameProperty; }
    protected override getService() { return EmployeeCvService.baseUrl; }

    protected form = new EmployeeCvForm(this.idPrefix);

    protected override afterLoadEntity() {
        super.afterLoadEntity();
        this.addValidationRules();
    }

    private addValidationRules() {
        this.form.Mobile.addValidationRule(this.uniqueName, () => {
            const value = this.normalizeDigits(this.form.Mobile.value);
            if (!value?.trim())
                return "رقم الجوال إجباري.";

            if (!/^05\d{8}$/.test(value.trim()))
                return "رقم الجوال يجب أن يبدأ ب 05 وأن يكون مكوناً من 10 أرقام.";

            this.form.Mobile.value = value.trim();
        });

        this.form.ExtensionNumber.addValidationRule(this.uniqueName, () => {
            const value = this.normalizeDigits(this.form.ExtensionNumber.value);
            if (!value?.trim())
                return "رقم التحويلة إجباري.";

            if (!/^\d{4}$/.test(value.trim()))
                return "رقم التحويلة يجب أن تكون 4 أرقام.";

            this.form.ExtensionNumber.value = value.trim();
        });
    }

    protected override validateBeforeSave() {
        if (!super.validateBeforeSave())
            return false;

        if (!this.form.Qualifications.value?.length ||
            !this.form.Experiences.value?.length ||
            !this.form.Courses.value?.length) {
            notifyWarning("يجب إضافة سجل واحد على الأقل في المؤهلات والخبرات والدورات.");
            return false;
        }

        return true;
    }

    private normalizeDigits(value: string) {
        if (!value)
            return value;
        const arabicIndic = "٠١٢٣٤٥٦٧٨٩";
        const latin = "0123456789";
        return value.split("").map(c => {
            const idx = arabicIndic.indexOf(c);
            return idx >= 0 ? latin[idx] : c;
        }).join("");
    }
}
