import { Config, EntityGrid, notifyError, notifySuccess, resolveUrl } from "@serenity-is/corelib";
import { TrainingCourseColumns, TrainingCourseRow, TrainingCourseService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";
import { TrainingCourseDialog } from "./TrainingCourseDialog";

export class TrainingCourseGrid extends EntityGrid<TrainingCourseRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getColumnsKey() { return TrainingCourseColumns.columnsKey; }
    protected override getDialogType() { return TrainingCourseDialog; }
    protected override getIdProperty() { return TrainingCourseRow.idProperty; }
    protected override getIsActiveProperty() { return TrainingCourseRow.isActiveProperty; }
    protected override getLocalTextPrefix() { return TrainingCourseRow.localTextPrefix; }
    protected override getService() { return TrainingCourseService.baseUrl; }

    protected override getDefaultSortBy() {
        return [TrainingCourseRow.Fields.Name];
    }

    protected override getButtons() {
        const buttons = super.getButtons();

        buttons.push({
            title: "تنزيل قالب الاستيراد",
            cssClass: "export-csv-button",
            onClick: () => {
                window.location.href = resolveUrl("~/Services/" + TrainingCourseService.baseUrl + "/DownloadTemplate");
            }
        });

        buttons.push({
            title: "استيراد Excel",
            cssClass: "upload-button",
            onClick: () => this.importExcel()
        });

        return buttons;
    }

    private importExcel() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".xlsx,.xls";

        input.onchange = () => {
            const files = input.files;
            if (!files || files.length === 0)
                return;

            const formData = new FormData();
            formData.append("File", files[0]);

            const url = resolveUrl("~/Services/" + TrainingCourseService.baseUrl + "/ImportExcel");
            const token = (Config as any)?.antiForgeryToken;

            const overlay = document.createElement("div");
            overlay.style.position = "fixed";
            overlay.style.inset = "0";
            overlay.style.background = "rgba(0,0,0,0.35)";
            overlay.style.zIndex = "9999";
            overlay.style.display = "flex";
            overlay.style.alignItems = "center";
            overlay.style.justifyContent = "center";
            overlay.style.flexDirection = "column";
            overlay.style.color = "#fff";
            overlay.style.fontSize = "15px";
            overlay.textContent = "جاري رفع ملف المقررات...";
            document.body.appendChild(overlay);

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
                overlay.textContent = "تم الرفع، جاري المعالجة...";
            };
            xhr.onreadystatechange = () => {
                if (xhr.readyState !== XMLHttpRequest.DONE) return;
                try {
                    let response: any = {};
                    try { response = xhr.responseText ? JSON.parse(xhr.responseText) : {}; } catch { /* ignore */ }

                    if (xhr.status >= 200 && xhr.status < 300) {
                        const total = response.Total ?? (response.Inserted ?? 0) + (response.Failed ?? 0);
                        notifySuccess(`تم استيراد ${response.Inserted || 0} من ${total || 0}. أخطاء: ${response.Failed || 0}`);
                        if (response.Errors && response.Errors.length > 0)
                            notifyError(response.Errors.join("\n"));
                        this.refresh();
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
