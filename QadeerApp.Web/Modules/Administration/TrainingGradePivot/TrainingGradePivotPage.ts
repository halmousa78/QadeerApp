       let rowTotal = 0;
import { notifyError, notifySuccess, resolveUrl } from "@serenity-is/corelib";
import { TrainingGradePivotRequest, TrainingGradePivotResponse, TrainingGradePivotRow, TrainingGradeService } from "../../ServerTypes/Administration";

declare const $: any;
declare const jQuery: any;
declare const XLSX: any;

const JQ_URL = "https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js";
const JQUI_JS = "https://cdn.jsdelivr.net/npm/jquery-ui@1.13.2/dist/jquery-ui.min.js";
const JQUI_CSS = "https://cdn.jsdelivr.net/npm/jquery-ui@1.13.2/dist/themes/base/jquery-ui.min.css";
const PIVOT_JS = "https://cdn.jsdelivr.net/npm/pivottable@2.23.0/dist/pivot.min.js";
const PIVOT_CSS = "https://cdn.jsdelivr.net/npm/pivottable@2.23.0/dist/pivot.min.css";
const XLSX_JS = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";

function loadScript(src: string) {
    return new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const s = document.createElement("script");
        s.src = src;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(s);
    });
}

function loadCss(href: string) {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    document.head.appendChild(l);
}

export default () => {
    const container = document.getElementById("PageContent") || document.body;
    container.innerHTML = "";

    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.gap = "8px";
    header.style.alignItems = "center";
    header.style.marginBottom = "12px";

    const termInput = document.createElement("input");
    termInput.type = "text";
    termInput.placeholder = "فلتر الفصل التدريبي (اختياري)";
    termInput.style.minWidth = "200px";
    header.appendChild(termInput);

    const activeCheck = document.createElement("label");
    activeCheck.style.display = "flex";
    activeCheck.style.alignItems = "center";
    activeCheck.style.gap = "6px";
    const activeBox = document.createElement("input");
    activeBox.type = "checkbox";
    activeCheck.appendChild(activeBox);
    const activeTxt = document.createElement("span");
    activeTxt.textContent = "عرض المفعل فقط";
    activeTxt.style.fontWeight = "700";
    activeCheck.appendChild(activeTxt);
    header.appendChild(activeCheck);

    const loadBtn = document.createElement("button");
    loadBtn.type = "button";
    loadBtn.className = "btn btn-primary";
    loadBtn.textContent = "تحميل البيانات";
    header.appendChild(loadBtn);

    const exportBtn = document.createElement("button");
    exportBtn.type = "button";
    exportBtn.className = "btn btn-success";
    exportBtn.textContent = "تصدير إلى Excel (CSV)";
    header.appendChild(exportBtn);

    container.appendChild(header);

    const pivotHost = document.createElement("div");
    pivotHost.id = "pivot-host";
    pivotHost.textContent = "جاري التحضير...";
    container.appendChild(pivotHost);

    loadCss(JQUI_CSS);
    loadCss(PIVOT_CSS);

    loadBtn.onclick = () => refreshData();
    exportBtn.onclick = () => exportCsv();
    refreshData();

    function ensurePivotLibs() {
        return loadScript(JQ_URL)
            .then(() => loadScript(JQUI_JS))
            .then(() => loadScript(PIVOT_JS));
    }

    function ensureXlsx() {
        return loadScript(XLSX_JS);
    }

    function toArabicRows(items: TrainingGradePivotRow[]) {
        const filtered = (items || []).filter(x => (x.Grade ?? "").toString().trim() !== "");
        return filtered.map(x => ({
            "الفصل التدريبي": x.TrainingTerm || "",
            "التقدير": x.Grade || "",
            "القسم": x.Department || "",
            "التخصص": x.Specialization || "",
            "اسم المقرر": x.CourseName || "",
            "رقم المقرر": x.CourseCode || "",
            "نوع الجدولة": x.ScheduleType || "",
            "اسم المدرب": x.TrainerName || "",
            "المستوى التدريبي": x.TrainingLevel || ""
        }));
    }

    function renderPivot(rows: TrainingGradePivotRow[]) {
        ensurePivotLibs().then(() => {
            const data = toArabicRows(rows);
            pivotHost.innerHTML = "";
            const $host = $(pivotHost);
            $host.pivotUI(data, {
                rows: ["الفصل التدريبي"],
                cols: ["التقدير"],
                aggregatorName: "Count",
                rendererName: "Table",
                unusedAttrsVertical: false
            }, true);
        }).catch(err => {
            notifyError(err?.message || "فشل تحميل pivot.js");
            console.error("Pivot lib load failed", err);
        });
    }

    function refreshData() {
        pivotHost.innerHTML = "جاري تحميل البيانات...";
        const req: TrainingGradePivotRequest = {
            TrainingTerm: termInput.value?.trim() || undefined,
            IsActive: activeBox.checked ? true : undefined
        };
        TrainingGradeService.PivotData(req, res => {
            const items = (res as TrainingGradePivotResponse).Items || [];
            renderPivot(items);
            notifySuccess("تم تحميل البيانات.");
        }, {
            onError: err => {
                pivotHost.innerHTML = "فشل تحميل البيانات.";
                notifyError(err?.Error?.Message || err?.Message || err?.message || "فشل تحميل البيانات.");
                console.error("PivotData failed", err);
            },
            blockUI: true
        });
    }

    function exportCsv() {
        const table = pivotHost.querySelector("table.pvtTable") as HTMLTableElement;
        if (!table) {
            notifyError("لا يوجد جدول Pivot لتصديره.");
            return;
        }

        ensureXlsx().then(() => {
            const ws = XLSX.utils.table_to_sheet(table);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Pivot");
            XLSX.writeFile(wb, "training-grades-pivot.xlsx");
            notifySuccess("تم إنشاء ملف Excel للتصدير.");
        }).catch(err => {
            notifyError(err?.message || "فشل تحميل مكتبة Excel.");
            console.error("Export Excel failed", err);
        });
    }
};
