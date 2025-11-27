import { EntityGrid } from "@serenity-is/corelib";
declare const Q: any;
import { TrainingScheduleImportColumns, TrainingScheduleImportRow, TrainingScheduleImportService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";
import { TrainingScheduleImportDialog } from "./TrainingScheduleImportDialog";

export class TrainingScheduleImportGrid extends EntityGrid<TrainingScheduleImportRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);
    private summaryContainer: HTMLElement;

    protected override getColumnsKey() { return TrainingScheduleImportColumns.columnsKey; }
    protected override getDialogType() { return TrainingScheduleImportDialog; }
    protected override getIdProperty() { return TrainingScheduleImportRow.idProperty; }
    protected override getIsActiveProperty() { return TrainingScheduleImportRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return TrainingScheduleImportRow.localTextPrefix; }
    protected override getService() { return TrainingScheduleImportService.baseUrl; }

    protected override getDefaultSortBy() {
        return [TrainingScheduleImportRow.Fields.TrainingTerm];
    }

    protected override getButtons() {
        const buttons = super.getButtons();

        // إزالة زر الإضافة الافتراضي
        const addIndex = buttons.findIndex(b => b.cssClass && b.cssClass.indexOf("add-button") >= 0);
        if (addIndex >= 0) buttons.splice(addIndex, 1);

        buttons.push({
            title: "Download Template",
            cssClass: "export-csv-button",
            onClick: () => window.open("~/assets/templates/training-schedule-template.csv", "_blank")
        });

        buttons.push({
            title: "Import CSV",
            cssClass: "export-csv-button",
            onClick: () => this.chooseAndImport()
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
        // ضع الملخص تحت شريط الأدوات ليبقى البحث وأزرار الاستيراد في سطر واحد
        toolbarEl.insertAdjacentElement("afterend", this.summaryContainer);
        this.loadSummary();
    }

    protected override onViewSubmit() {
        const ok = super.onViewSubmit();
        if (ok) this.loadSummary();
        return ok;
    }

    private chooseAndImport() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".csv,text/csv";
        input.onchange = e => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = () => {
                const content = reader.result as string;
                const replaceExisting = true; // always replace existing rows for the same term
                const overlay = document.createElement("div");
                overlay.style.position = "fixed";
                overlay.style.inset = "0";
                overlay.style.background = "rgba(0,0,0,0.45)";
                overlay.style.zIndex = "9999";
                overlay.style.display = "flex";
                overlay.style.alignItems = "center";
                overlay.style.justifyContent = "center";
                overlay.style.flexDirection = "column";
                overlay.style.color = "#fff";
                overlay.style.fontSize = "16px";
                overlay.textContent = "جارٍ الاستيراد...";
                document.body.appendChild(overlay);

                // نسبة تقديرية بالاعتماد على عدد الأسطر
                const lineCount = Math.max(0, (content || "").split(/\r?\n/).filter(l => l.trim().length > 0).length - 1);
                const updateOverlay = (percent?: number, text?: string) => {
                    const pct = percent != null ? ` ${percent}%` : "";
                    overlay.textContent = text || `جارٍ الاستيراد...${pct}`;
                };
                if (lineCount > 0) updateOverlay(1, `جاري التحضير... إجمالي السجلات: ${lineCount}`);

                const removeOverlay = () => {
                    if (overlay.parentElement) {
                        overlay.parentElement.removeChild(overlay);
                    }
                };

                Q.serviceCall({
                    url: Q.resolveUrl("~/Services/Administration/TrainingScheduleImport/Import"),
                    request: {
                        CsvContent: content ?? "",
                        ReplaceExisting: !!replaceExisting
                    },
                    blockUI: true,
                    onSuccess: (response: any) => {
                        const inserted = response?.Inserted ?? 0;
                        const failed = response?.Failed ?? 0;
                        const skipped = response?.SkippedExisting ?? 0;
                        const total = response?.TotalRecords ?? inserted + failed + skipped;
                        Q.notifySuccess(`Imported: ${inserted}/${total}, Skipped: ${skipped}, Failed: ${failed}`);
                        if (response?.Errors?.length) {
                            Q.notifyWarning(response.Errors.slice(0, 3).join("\n"));
                        }
                        this.refresh();
                        removeOverlay();
                    },
                    onError: err => {
                        const message = err?.Error?.Message || err?.Message || "Import failed";
                        console.error("Import error", err);
                        Q.notifyError(message);
                        removeOverlay();
                    },
                    onFinally: () => {
                        removeOverlay();
                    }
                });
            };
            reader.readAsText(file, "utf-8");
        };
        input.click();
    }

    private renderSummary(data: any) {
        const total = data?.Total ?? 0;
        const active = data?.Active ?? 0;
        const inactive = data?.Inactive ?? 0;
        const terms = Array.isArray(data?.Terms) ? data.Terms.filter(x => !!x).join(" | ") : "";

        this.summaryContainer.innerHTML = `
            <div class="fw-bold">الفصول التدريبية التي تم رفع الجداول التدريبية فيها:</div>
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
            url: Q.resolveUrl("~/Services/Administration/TrainingScheduleImport/Summary"),
            blockUI: false,
            onSuccess: (response: any) => this.renderSummary(response),
            onError: () => { /* ignore */ }
        });
    }

    private activateAll() {
        Q.confirm("سيتم تفعيل جميع الصفوف في جميع الفصول. هل أنت متأكد؟", () => {
            Q.serviceCall({
                url: Q.resolveUrl("~/Services/Administration/TrainingScheduleImport/ActivateAll"),
                blockUI: true,
                onSuccess: () => {
                    Q.notifySuccess("تم التفعيل");
                    this.refresh();
                }
            });
        });
    }

    private deactivateAll() {
        Q.confirm("سيتم تعطيل جميع الصفوف في جميع الفصول. هل أنت متأكد؟", () => {
            Q.serviceCall({
                url: Q.resolveUrl("~/Services/Administration/TrainingScheduleImport/DeactivateAll"),
                blockUI: true,
                onSuccess: () => {
                    Q.notifySuccess("تم التعطيل");
                    this.refresh();
                }
            });
        });
    }

    private deleteAll() {
        Q.confirm("سيتم حذف كل البيانات لجميع الفصول التدريبية. هل أنت متأكد؟", () => {
            Q.serviceCall({
                url: Q.resolveUrl("~/Services/Administration/TrainingScheduleImport/DeleteAll"),
                blockUI: true,
                onSuccess: () => {
                    Q.notifySuccess("تم الحذف");
                    this.refresh();
                }
            });
        });
    }
}
