declare const Q: any;

import { EntityGrid } from "@serenity-is/corelib";
import { TrainingCourseFileColumns, TrainingCourseFileRow, TrainingCourseFileService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";
import { TrainingCourseFileDialog } from "./TrainingCourseFileDialog";

export class TrainingCourseFileGrid extends EntityGrid<TrainingCourseFileRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);
    private summaryContainer: HTMLElement;

    protected override getColumnsKey() { return TrainingCourseFileColumns.columnsKey; }
    protected override getDialogType() { return TrainingCourseFileDialog; }
    protected override getIdProperty() { return TrainingCourseFileRow.idProperty; }
    protected override getIsActiveProperty() { return TrainingCourseFileRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return TrainingCourseFileRow.localTextPrefix; }
    protected override getService() { return TrainingCourseFileService.baseUrl; }

    protected override getButtons() {
        const buttons = super.getButtons();

        buttons.push({
            title: "استيراد من جدول المدربين",
            cssClass: "apply-changes-button",
            onClick: () => this.importFromSchedule()
        });

        return buttons;
    }

    protected override createToolbarExtensions() {
        super.createToolbarExtensions();

        const toolbarEl = this.toolbar.element[0] as HTMLElement;
        toolbarEl.style.display = "flex";
        toolbarEl.style.flexWrap = "wrap";
        toolbarEl.style.alignItems = "center";
        toolbarEl.style.gap = "8px";

        this.summaryContainer = document.createElement("div");
        this.summaryContainer.className = "alert alert-light d-flex align-items-center gap-2 flex-wrap mb-2 term-summary";
        toolbarEl.insertAdjacentElement("afterend", this.summaryContainer);
        this.loadSummary();
    }

    protected override onViewSubmit() {
        const ok = super.onViewSubmit();
        if (ok) this.loadSummary();
        return ok;
    }

    private renderSummary(data: any) {
        const total = data?.Total ?? 0;
        const active = data?.Active ?? 0;
        const inactive = data?.Inactive ?? 0;
        const terms = Array.isArray(data?.Terms) ? data.Terms.filter(x => !!x).join(" | ") : "";

        this.summaryContainer.innerHTML = `
            <div class="fw-bold">الفصول التدريبية التي تم رفع ملف المقرر فيها:</div>
            <span class="badge bg-primary">إجمالي: ${total}</span>
            <span class="badge bg-success">مفعل: ${active}</span>
            <span class="badge bg-warning text-dark">غير مفعل: ${inactive}</span>
            <span class="ms-2 text-muted">${terms}</span>
            <div class="ms-auto d-flex gap-2 flex-wrap">
                <button type="button" class="btn btn-sm btn-success activate-all">تفعيل الكل</button>
                <button type="button" class="btn btn-sm btn-warning deactivate-all">تعطيل الكل</button>
                <button type="button" class="btn btn-sm btn-danger delete-all">حذف الكل</button>
            </div>
        `;

        const activateBtn = this.summaryContainer.querySelector(".activate-all") as HTMLButtonElement;
        const deactivateBtn = this.summaryContainer.querySelector(".deactivate-all") as HTMLButtonElement;
        const deleteBtn = this.summaryContainer.querySelector(".delete-all") as HTMLButtonElement;

        activateBtn.onclick = () => this.activateAll();
        deactivateBtn.onclick = () => this.deactivateAll();
        deleteBtn.onclick = () => this.deleteAll();
    }

    private loadSummary() {
        Q.serviceCall({
            url: Q.resolveUrl("~/Services/Administration/TrainingCourseFile/Summary"),
            blockUI: false,
            onSuccess: (response: any) => this.renderSummary(response),
            onError: () => { /* ignore */ }
        });
    }

    private activateAll() {
        Q.confirm("سيتم تفعيل جميع السجلات. هل أنت متأكد؟", () => {
            Q.serviceCall({
                url: Q.resolveUrl("~/Services/Administration/TrainingCourseFile/ActivateAll"),
                blockUI: true,
                onSuccess: () => {
                    Q.notifySuccess("تم التفعيل");
                    this.refresh();
                }
            });
        });
    }

    private deactivateAll() {
        Q.confirm("سيتم تعطيل جميع السجلات. هل أنت متأكد؟", () => {
            Q.serviceCall({
                url: Q.resolveUrl("~/Services/Administration/TrainingCourseFile/DeactivateAll"),
                blockUI: true,
                onSuccess: () => {
                    Q.notifySuccess("تم التعطيل");
                    this.refresh();
                }
            });
        });
    }

    private deleteAll() {
        Q.confirm("سيتم حذف جميع السجلات من ملف المقرر. هل أنت متأكد؟", () => {
            Q.serviceCall({
                url: Q.resolveUrl("~/Services/Administration/TrainingCourseFile/DeleteAll"),
                blockUI: true,
                onSuccess: () => {
                    Q.notifySuccess("تم الحذف");
                    this.refresh();
                }
            });
        });
    }

    private importFromSchedule() {
        Q.serviceCall({
            url: Q.resolveUrl("~/Services/Administration/TrainingScheduleImport/ImportToCourseFiles"),
            blockUI: true,
            onSuccess: (resp: any) => {
                const inserted = resp?.Inserted ?? 0;
                const total = resp?.TotalRecords ?? inserted;
                const skippedExisting = resp?.SkippedExisting ?? 0;
                const skippedKey = resp?.SkippedIncompleteKey ?? 0;
                const errors = Array.isArray(resp?.Errors) ? resp.Errors : [];
                const baseMsg = `Imported ${inserted}/${total}. Skipped existing: ${skippedExisting}. Missing key: ${skippedKey}.`;
                if (errors.length) {
                    Q.notifyWarning(baseMsg + "\n" + errors.slice(0, 3).join("\n"));
                } else {
                    Q.notifySuccess(baseMsg);
                }
                this.refresh();
            },
            onError: err => {
                const message = err?.Error?.Message || err?.Message || "Import failed";
                Q.notifyError(message);
            }
        });
    }
}
