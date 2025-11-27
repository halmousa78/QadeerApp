import { Config, EntityGrid, notifyError, notifySuccess, resolveUrl } from "@serenity-is/corelib";
import { TrainingGradeColumns, TrainingGradeRow, TrainingGradeService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";
import { TrainingGradeDialog } from "./TrainingGradeDialog";

export class TrainingGradeGrid extends EntityGrid<TrainingGradeRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);
    private summaryContainer: HTMLElement;

    protected override getColumnsKey() { return TrainingGradeColumns.columnsKey; }
    protected override getDialogType() { return TrainingGradeDialog; }
    protected override getIdProperty() { return TrainingGradeRow.idProperty; }
    protected override getLocalTextPrefix() { return TrainingGradeRow.localTextPrefix; }
    protected override getService() { return TrainingGradeService.baseUrl; }

    protected override getButtons() {
        const buttons = super.getButtons().filter(x => x.cssClass !== "add-button");
        buttons.push({
            title: "تحميل CSV",
            cssClass: "upload-button",
            onClick: () => this.importCsv()
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
        // ضع الملخص أسفل شريط الأدوات ليبقى زر الاستيراد والبحث في نفس السطر
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
            <div class="fw-bold">الفصول التدريبية التي تم رفع درجاتها:</div>
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

        (this.summaryContainer.querySelector(".activate-all") as HTMLButtonElement).onclick = () => this.activateAll();
        (this.summaryContainer.querySelector(".deactivate-all") as HTMLButtonElement).onclick = () => this.deactivateAll();
        (this.summaryContainer.querySelector(".delete-all") as HTMLButtonElement).onclick = () => this.deleteAll();
    }

    private loadSummary() {
        Q.serviceCall({
            url: Q.resolveUrl("~/Services/Administration/TrainingGrade/Summary"),
            blockUI: false,
            onSuccess: (response: any) => this.renderSummary(response),
            onError: () => { /* ignore to keep grid usable */ }
        });
    }

    private activateAll() {
        Q.confirm("سيتم تفعيل كل الدرجات في جميع الفصول. هل أنت متأكد؟", () => {
            Q.serviceCall({
                url: Q.resolveUrl("~/Services/Administration/TrainingGrade/ActivateAll"),
                blockUI: true,
                onSuccess: () => {
                    notifySuccess("تم التفعيل");
                    this.refresh();
                }
            });
        });
    }

    private deactivateAll() {
        Q.confirm("سيتم تعطيل كل الدرجات في جميع الفصول. هل أنت متأكد؟", () => {
            Q.serviceCall({
                url: Q.resolveUrl("~/Services/Administration/TrainingGrade/DeactivateAll"),
                blockUI: true,
                onSuccess: () => {
                    notifySuccess("تم التعطيل");
                    this.refresh();
                }
            });
        });
    }

    private deleteAll() {
        Q.confirm("سيتم حذف كل الدرجات في جميع الفصول. هل أنت متأكد؟", () => {
            Q.serviceCall({
                url: Q.resolveUrl("~/Services/Administration/TrainingGrade/DeleteAll"),
                blockUI: true,
                onSuccess: () => {
                    notifySuccess("تم الحذف");
                    this.refresh();
                }
            });
        });
    }

    private importCsv() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".csv";

        input.onchange = () => {
            const files = input.files;
            if (!files || files.length === 0)
                return;

            const formData = new FormData();
            formData.append("File", files[0]);

            const url = resolveUrl("~/Services/" + TrainingGradeService.baseUrl + "/Import");
            const token = (Config as any)?.antiForgeryToken;

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
            overlay.textContent = "جاري رفع الملف...";
            document.body.appendChild(overlay);

            const reader = new FileReader();
            reader.onload = () => {
                const text = reader.result?.toString() || "";
                const total = Math.max(0, text.split(/\r?\n/).length - 1);
                overlay.textContent = `جاري التحميل... عدد السجلات: ${total} صف`;
            };
            reader.readAsText(files[0]);

            const xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            if (token) xhr.setRequestHeader("X-CSRF-TOKEN", token);
            xhr.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    const percent = Math.round((e.loaded / e.total) * 100);
                    overlay.textContent = `تم التحميل ${percent}%`;
                }
            };
            xhr.upload.onload = () => {
                overlay.textContent = "تم رفع الملف، جاري المعالجة...";
            };
            xhr.onreadystatechange = () => {
                if (xhr.readyState !== XMLHttpRequest.DONE) return;
                try {
                    let response: any = {};
                    try {
                        response = xhr.responseText ? JSON.parse(xhr.responseText) : {};
                    } catch {
                        // ignore parse errors
                    }

                    if (xhr.status >= 200 && xhr.status < 300) {
                        if (response.AlreadyImported) {
                            const msg = response.Message || "تم العثور على بيانات لنفس الفصل مسبقاً.";
                            notifyError(msg);
                        } else {
                            const termMessage = response.Message ? `\n${response.Message}` : "";
                            const total = response.TotalRecords ?? response.Inserted ?? 0;
                            notifySuccess(`تم إدراج ${response.Inserted || 0} من ${total}. أخطاء: ${response.Failed || 0}${termMessage}`);
                            if (response.Errors && response.Errors.length > 0)
                                notifyError(response.Errors.join("\n"));
                            this.refresh();
                        }
                    } else {
                        const msg = response?.Error?.Message || response?.Message || xhr.responseText || `HTTP ${xhr.status}`;
                        notifyError(msg);
                    }
                } catch (err) {
                    notifyError("حدث خطأ أثناء رفع الملف.");
                    console.error(err);
                } finally {
                    document.body.removeChild(overlay);
                    this.loadSummary();
                }
            };
            xhr.onerror = () => {
                notifyError("فشل رفع الملف.");
                document.body.removeChild(overlay);
            };
            xhr.send(formData);
        };

        input.click();
    }
}
