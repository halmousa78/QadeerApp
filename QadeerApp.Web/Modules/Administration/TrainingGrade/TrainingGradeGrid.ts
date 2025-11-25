import { Config, EntityGrid, notifyError, notifySuccess, resolveUrl } from "@serenity-is/corelib";
import { TrainingGradeColumns, TrainingGradeRow, TrainingGradeService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";
import { TrainingGradeDialog } from "./TrainingGradeDialog";

export class TrainingGradeGrid extends EntityGrid<TrainingGradeRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getColumnsKey() { return TrainingGradeColumns.columnsKey; }
    protected override getDialogType() { return TrainingGradeDialog; }
    protected override getIdProperty() { return TrainingGradeRow.idProperty; }
    protected override getLocalTextPrefix() { return TrainingGradeRow.localTextPrefix; }
    protected override getService() { return TrainingGradeService.baseUrl; }

    protected override getButtons() {
        const buttons = super.getButtons().filter(x => x.cssClass !== "add-button");
        buttons.push({
            title: "استيراد CSV",
            cssClass: "upload-button",
            onClick: () => this.importCsv()
        });
        return buttons;
    }

    protected override createToolbarExtensions() {
        super.createToolbarExtensions();

        const panel = document.createElement("div");
        panel.className = "term-status-panel";
        panel.style.display = "flex";
        panel.style.alignItems = "center";
        panel.style.gap = "8px";
        panel.style.padding = "6px 0";
        this.toolbar.element[0].appendChild(panel);

        const termLabel = document.createElement("label");
        termLabel.style.margin = "0";
        termLabel.style.fontWeight = "600";
        termLabel.textContent = "الفصل التدريبي:";
        panel.appendChild(termLabel);

        const termInput = document.createElement("input");
        termInput.type = "text";
        termInput.style.width = "180px";
        termInput.placeholder = "مثال: 1446/1";
        panel.appendChild(termInput);

        const statusLabel = document.createElement("label");
        statusLabel.style.margin = "0";
        statusLabel.style.fontWeight = "600";
        statusLabel.textContent = "مفعل؟";
        panel.appendChild(statusLabel);

        const statusCheckbox = document.createElement("input");
        statusCheckbox.type = "checkbox";
        statusCheckbox.style.width = "18px";
        statusCheckbox.style.height = "18px";
        statusCheckbox.checked = true;
        panel.appendChild(statusCheckbox);

        const applyBtn = document.createElement("button");
        applyBtn.type = "button";
        applyBtn.className = "btn btn-secondary";
        applyBtn.textContent = "تطبيق الحالة";
        applyBtn.onclick = () => {
            const term = termInput.value.trim();
            if (!term) {
                notifyError("الرجاء إدخال اسم الفصل التدريبي.");
                return;
            }

            const isActive = statusCheckbox.checked;
            TrainingGradeService.BulkUpdateStatus({ TrainingTerm: term, IsActive: isActive }, response => {
                notifySuccess(`تم تحديث ${response.Updated || 0} سجل للفصل ${term}.`);
                this.loadTermList();
                this.refresh();
            });
        };
        panel.appendChild(applyBtn);

        this.termListContainer = document.createElement("div");
        this.termListContainer.className = "term-list";
        this.termListContainer.style.marginTop = "8px";
        this.termListContainer.style.padding = "8px";
        this.termListContainer.style.border = "1px solid #e0e0e0";
        this.termListContainer.style.borderRadius = "4px";
        this.termListContainer.style.background = "#fafafa";
        this.toolbar.element[0].appendChild(this.termListContainer);

        const title = document.createElement("div");
        title.style.fontWeight = "700";
        title.style.marginBottom = "6px";
        title.textContent = "الفصول التدريبية التي تم رفع درجاتها:";
        this.termListContainer.appendChild(title);

        this.termItemsHost = document.createElement("div");
        this.termItemsHost.style.display = "flex";
        this.termItemsHost.style.flexDirection = "column";
        this.termItemsHost.style.gap = "6px";
        this.termListContainer.appendChild(this.termItemsHost);

        this.loadTermList();
    }

    private termListContainer: HTMLDivElement;
    private termItemsHost: HTMLDivElement;

    private loadTermList() {
        if (!this.termItemsHost)
            return;

        this.termItemsHost.innerHTML = "جاري التحميل...";
        TrainingGradeService.ListTerms({}, response => {
            this.termItemsHost.innerHTML = "";
            if (!response?.Terms || response.Terms.length === 0) {
                const empty = document.createElement("div");
                empty.textContent = "لا توجد فصول مرفوعة حالياً.";
                this.termItemsHost.appendChild(empty);
                return;
            }

            response.Terms.forEach(term => {
                const row = document.createElement("div");
                row.style.display = "flex";
                row.style.alignItems = "center";
                row.style.gap = "8px";
                row.style.padding = "6px";
                row.style.border = "1px solid #ddd";
                row.style.borderRadius = "4px";
                row.style.background = "#fff";

                const name = document.createElement("div");
                name.style.fontWeight = "700";
                name.textContent = term.TrainingTerm || "(غير محدد)";
                row.appendChild(name);

                const info = document.createElement("div");
                info.style.flex = "1";
                info.textContent = `إجمالي: ${term.Total || 0} | مفعل: ${term.ActiveCount || 0}`;
                row.appendChild(info);

                const activateBtn = document.createElement("button");
                activateBtn.type = "button";
                activateBtn.className = "btn btn-outline-success btn-sm";
                activateBtn.textContent = "مفعل";
                activateBtn.onclick = () => this.updateTermStatus(term.TrainingTerm, true);
                row.appendChild(activateBtn);

                const deactivateBtn = document.createElement("button");
                deactivateBtn.type = "button";
                deactivateBtn.className = "btn btn-outline-warning btn-sm";
                deactivateBtn.textContent = "غير مفعل";
                deactivateBtn.onclick = () => this.updateTermStatus(term.TrainingTerm, false);
                row.appendChild(deactivateBtn);

                const deleteBtn = document.createElement("button");
                deleteBtn.type = "button";
                deleteBtn.className = "btn btn-outline-danger btn-sm";
                deleteBtn.textContent = "حذف الكل";
                deleteBtn.onclick = () => this.deleteTerm(term.TrainingTerm);
                row.appendChild(deleteBtn);

                this.termItemsHost.appendChild(row);
            });
        }, {
            onError: (err) => {
                this.termItemsHost.innerHTML = "";
                const msg = err?.Error?.Message || err?.Message || err?.message || "فشل تحميل الفصول التدريبية.";
                notifyError(msg);
                console.error("ListTerms failed", err);
            }
        });
    }

    private updateTermStatus(term: string | undefined, isActive: boolean) {
        const t = term?.trim();
        if (!t) return;

        TrainingGradeService.BulkUpdateStatus({ TrainingTerm: t, IsActive: isActive }, response => {
            notifySuccess(`تم تحديث ${response.Updated || 0} سجل للفصل ${t}.`);
            this.refresh();
            this.loadTermList();
        });
    }

    private deleteTerm(term: string | undefined) {
        const t = term?.trim();
        if (!t) return;

        if (!confirm(`سيتم حذف جميع سجلات الفصل "${t}". هل أنت متأكد؟`))
            return;

        TrainingGradeService.BulkDeleteByTerm({ TrainingTerm: t }, response => {
            notifySuccess(`تم حذف ${response.Deleted || 0} سجل للفصل ${t}.`);
            this.refresh();
            this.loadTermList();
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
            overlay.textContent = "جاري تحميل الملف...";
            document.body.appendChild(overlay);

            const reader = new FileReader();
            reader.onload = () => {
                const text = reader.result?.toString() || "";
                const total = Math.max(0, text.split(/\r?\n/).length - 1);
                overlay.textContent = `جاري الاستيراد... إجمالي متوقع: ${total} صف`;
            };
            reader.readAsText(files[0]);

            const xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            if (token) xhr.setRequestHeader("X-CSRF-TOKEN", token);
            xhr.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    const percent = Math.round((e.loaded / e.total) * 100);
                    overlay.textContent = `رفع الملف ${percent}%`;
                }
            };
            xhr.upload.onload = () => {
                overlay.textContent = "تم رفع الملف، جاري الاستيراد في الخادم...";
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
                            const termName = (document.querySelector(".term-status-panel input[type=text]") as HTMLInputElement)?.value || "غير معروف";
                            const msg = response.Message || `تم منع الاستيراد: الفصل (${termName}) محمّل مسبقاً.`;
                            notifyError(msg);
                        } else {
                            const termMessage = response.Message ? `\n${response.Message}` : "";
                            const total = response.TotalRecords ?? response.Inserted ?? 0;
                            notifySuccess(`تم استيراد ${response.Inserted || 0} من ${total}. أخطاء: ${response.Failed || 0}${termMessage}`);
                            if (response.Errors && response.Errors.length > 0)
                                notifyError(response.Errors.join("\n"));
                            this.refresh();
                            this.loadTermList();
                        }
                    } else {
                        const msg = response?.Error?.Message || response?.Message || xhr.responseText || `HTTP ${xhr.status}`;
                        notifyError(msg);
                    }
                } catch (err) {
                    notifyError("فشل قراءة استجابة الخادم.");
                    console.error(err);
                } finally {
                    document.body.removeChild(overlay);
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
