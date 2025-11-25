import { EntityGrid } from "@serenity-is/corelib";
import { Authorization } from "@serenity-is/corelib/q";
import { EmployeeCvColumns, EmployeeCvRow, EmployeeCvService } from "../../ServerTypes/Cv";
import { nsCv } from "../../ServerTypes/Namespaces";
import { EmployeeCvDialog } from "./EmployeeCvDialog";
import { CvPrint } from "../Print/CvPrint";

export class EmployeeCvGrid extends EntityGrid<EmployeeCvRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsCv);

    protected override getColumnsKey() { return EmployeeCvColumns.columnsKey; }
    protected override getDialogType() { return EmployeeCvDialog; }
    protected override getIdProperty() { return EmployeeCvRow.idProperty; }
    protected override getLocalTextPrefix() { return EmployeeCvRow.localTextPrefix; }
    protected override getService() { return EmployeeCvService.baseUrl; }

    protected override createToolbarExtensions() {
        super.createToolbarExtensions();

        const message = document.createElement("div");
        message.classList.add("alert", "alert-info", "mb-2");
        message.innerHTML = "جميع البيانات الشخصية إجبارية، ويجب إضافة مؤهل وخبرة ودورة واحدة على الأقل قبل حفظ السيرة الذاتية.";
        this.element.prepend(message);
        
        const printMessage = document.createElement("div");
        printMessage.classList.add("alert", "alert-secondary", "mb-2");
        printMessage.innerHTML = "<strong>ملاحظة:</strong> لطباعة سجلات متعددة، حدد مربعات الاختيار في العمود الأول أو اضغط مع الاستمرار على مفتاح Ctrl أثناء النقر على السجلات.";
        this.element.prepend(printMessage);
    }

    protected override getButtons() {
        const buttons = super.getButtons();
        const addButton = buttons.find(x => x.cssClass?.includes("add-button"));
        if (addButton) {
            addButton.title = "إضافة / تعديل السيرة الذاتية";
        }

        buttons.push({
            title: "طباعة السيرة",
            cssClass: "print-button",
            onClick: () => this.printSelected()
        });

        if (Authorization.hasPermission("Cv:Report")) {
            buttons.push({
                title: "طباعة الكل",
                cssClass: "print-all-button",
                onClick: () => CvPrint.printAll("السيرة الذاتية - جميع الموظفين")
            });
        }

        return buttons;
    }

    private async printSelected() {
        const ids = this.getSelectedCvIds();
        if (ids.length === 0) {
            return;
        }
        
        const title = ids.length > 1 ? `السيرة الذاتية - ${ids.length} موظف` : "السيرة الذاتية";
        await CvPrint.printByIds(ids, title);
    }

    private getSelectedCvIds(): number[] {
        // محاولة الحصول على السجلات المحددة
        const selectedItems = (this as any).getSelectedItems?.() as EmployeeCvRow[] | undefined;
        if (selectedItems?.length) {
            const ids = selectedItems.map(x => x.EmployeeCvId).filter(x => !!x) as number[];
            if (ids.length > 0) {
                return ids;
            }
        }

        // التحقق من الخلية النشطة
        const active = this.slickGrid?.getActiveCell();
        if (active) {
            const item = this.itemAt(active.row);
            if (item?.EmployeeCvId) {
                return [item.EmployeeCvId];
            }
        }

        // إذا كان هناك سجل واحد فقط، استخدمه
        const items = this.view.getItems() as EmployeeCvRow[];
        if (items.length === 1) {
            const singleId = items[0].EmployeeCvId;
            if (singleId) {
                return [singleId];
            }
        }

        // عرض رسالة للمستخدم إذا لم يتم تحديد أي سجلات
        alert("الرجاء تحديد سجل واحد أو أكثر للطباعة.");
        return [];
    }
}
