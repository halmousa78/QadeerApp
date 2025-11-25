import { Authorization, formatDate } from "@serenity-is/corelib/q";
import { EmployeeCvRow, EmployeeCvService } from "../../ServerTypes/Cv";

type IdList = number[];

export namespace CvPrint {
    export async function printByIds(ids: IdList, printTitle = "السيرة الذاتية") {
        if (!ids?.length) {
            alert("الرجاء تحديد سجل واحد أو أكثر للطباعة.\n\nيمكنك تحديد سجلات متعددة بالنقر مع الضغط على مفتاح Ctrl أو استخدام مربعات الاختيار في الجدول.");
            return;
        }

        const entities = await loadCvs(ids);
        if (!entities.length) {
            alert("لا توجد بيانات للطباعة.");
            return;
        }

        const html = renderDocument(entities, printTitle);
        openPrintWindow(html);
    }

    export async function printAll(printTitle = "السيرة الذاتية") {
        const canReport = Authorization.hasPermission("Cv:Report");
        if (!canReport) {
            alert("لا تملك صلاحية طباعة جميع السجلات.");
            return;
        }

        const list = await EmployeeCvService.List({});
        const ids = list.Entities?.map(x => x.EmployeeCvId).filter(x => !!x) as number[];
        return printByIds(ids, printTitle);
    }

    async function loadCvs(ids: IdList): Promise<EmployeeCvRow[]> {
        const tasks = ids.map(id => EmployeeCvService.Retrieve({ EntityId: id }).then(r => r.Entity));
        const results = await Promise.all(tasks);
        return results.filter(x => !!x) as EmployeeCvRow[];
    }

    function renderDocument(items: EmployeeCvRow[], title: string) {
        const styles = `
        <style>
            @page { size: A4; margin: 16mm; }
            body { font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a; margin: 0; padding: 0; }
            .doc { padding: 16px; }
            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
            .title { font-size: 20px; font-weight: 700; color: #0f172a; }
            .date { color: #475569; font-size: 12px; }
            .card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06); page-break-inside: avoid; }
            .card h2 { margin: 0 0 12px; font-size: 18px; color: #0f172a; }
            .section { margin-top: 12px; }
            .section h3 { margin: 0 0 8px; font-size: 15px; color: #0f172a; }
            .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px 16px; font-size: 13px; }
            .info-grid div { padding: 8px 10px; border: 1px solid #e2e8f0; border-radius: 6px; background: #f8fafc; }
            ul { margin: 0; padding-left: 18px; }
            li { margin: 4px 0; }
            .badge { display: inline-block; padding: 4px 8px; border-radius: 12px; background: #e0f2fe; color: #0c4a6e; font-weight: 600; font-size: 12px; }
        </style>`;

        const content = items.map((item, idx) => renderCv(item) + (idx < items.length - 1 ? `<div style="page-break-after: always;"></div>` : "")).join("");
        const printedOn = formatDate(new Date(), "yyyy-MM-dd");

        return `<!doctype html>
        <html lang="ar" dir="rtl">
        <head><meta charset="utf-8">${styles}</head>
        <body>
            <div class="doc">
                <div class="header">
                    <div class="title">${title}</div>
                    <div class="date">تاريخ الطباعة: ${printedOn}</div>
                </div>
                ${content}
            </div>
        </body>
        </html>`;
    }

    function renderCv(cv: EmployeeCvRow) {
        const englishLevels: Record<number, string> = {
            1: "ضعيف",
            2: "جيد",
            3: "جيد جداً",
            4: "ممتاز"
        };

        const info = [
            ["الموظف", cv.UserDisplayName ?? cv.Username],
            ["رقم الجوال", cv.Mobile],
            ["مستوى اللغة الإنجليزية", cv.EnglishLevel ? englishLevels[cv.EnglishLevel as number] : ""],
            ["العنوان", cv.Address],
            ["التحويلة", cv.ExtensionNumber],
            ["رقم المكتب", cv.OfficeNumber],
            ["رقم المبنى", cv.BuildingNumber],
            ["آخر تحديث", cv.CvUpdatedOn ? formatDate(cv.CvUpdatedOn, "yyyy-MM-dd") : "—"]
        ];

        const sectionList = (title: string, list?: { Name?: string }[]) => {
            if (!list?.length) return "";
            const items = list.map(x => `<li>${escapeHtml(x.Name || "")}</li>`).join("");
            return `<div class="section"><h3>${title}</h3><ul>${items}</ul></div>`;
        };

        const infoHtml = info
            .filter(([, v]) => !!(v ?? "").toString().trim())
            .map(([k, v]) => `<div><strong>${k}:</strong> ${escapeHtml(v as string)}</div>`)
            .join("");

        return `<div class="card">
            <h2>${escapeHtml(cv.UserDisplayName ?? cv.Username ?? "بدون اسم")}
                ${cv.UserId ? `<span class="badge">#${cv.UserId}</span>` : ""}
            </h2>
            <div class="info-grid">${infoHtml}</div>
            ${sectionList("المؤهلات", cv.Qualifications)}
            ${sectionList("الخبرات", cv.Experiences)}
            ${sectionList("الدورات", cv.Courses)}
        </div>`;
    }

    function openPrintWindow(html: string) {
        // always use hidden iframe to avoid popup artifacts
        const frame = document.createElement("iframe");
        frame.style.position = "fixed";
        frame.style.right = "0";
        frame.style.bottom = "0";
        frame.style.width = "0";
        frame.style.height = "0";
        frame.style.border = "0";
        frame.setAttribute("sandbox", "allow-modals allow-same-origin");
        document.body.appendChild(frame);

        const doc = frame.contentWindow?.document;
        if (!doc) {
            alert("تعذّر تجهيز الطباعة. الرجاء الطباعة من المتصفح.");
            frame.remove();
            return;
        }

        doc.open();
        doc.write(html);
        doc.close();

        frame.contentWindow!.onafterprint = () => frame.remove();
        setTimeout(() => {
            frame.contentWindow?.focus();
            frame.contentWindow?.print();
        }, 200);
    }

    function escapeHtml(value: string) {
        return (value || "").replace(/[&<>"']/g, m => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\"": "&quot;",
            "'": "&#39;"
        }[m] as string));
    }
}
