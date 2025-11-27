import { notifyError, notifySuccess, resolveUrl, serviceCall, ServiceResponse } from "@serenity-is/corelib";
import { TrainingCourseFileSummaryResponse } from "../../ServerTypes/Administration";

interface CourseTrainerInfo {
    TrainerNumber: number;
    TrainerName: string;
}

interface CourseCoordinatorItem {
    CourseKey: string;
    Course: string;
    CourseDescription?: string;
    TrainingTerm?: string;
    TrainingUnit?: string;
    TrainingType?: string;
    Department?: string;
    Departments?: string[];
    ReferenceNumber?: number;
    SelectedCoordinatorNumber?: number;
    Trainers: CourseTrainerInfo[];
}

interface CourseCoordinatorListResponse extends ServiceResponse {
    Items?: CourseCoordinatorItem[];
}

export default () => {
    const root = document.getElementById("PageContent") || document.body;
    root.innerHTML = "";

    ensureStyles();

    const header = document.createElement("div");
    header.className = "page-hero shadow-sm mb-3";

    const heroLeft = document.createElement("div");
    heroLeft.className = "hero-left";
    const title = document.createElement("div");
    title.className = "hero-title";
    title.textContent = "منسقو المقررات التدريبية";
    heroLeft.appendChild(title);
    const subtitle = document.createElement("div");
    subtitle.className = "hero-subtitle";
    subtitle.textContent = "استعرض المقررات واختر منسقاً لكل مقرر من قائمة المدربين.";
    heroLeft.appendChild(subtitle);
    header.appendChild(heroLeft);

    const heroActions = document.createElement("div");
    heroActions.className = "hero-actions";

    const search = document.createElement("input");
    search.type = "search";
    search.placeholder = "بحث باسم المقرر أو المدرب...";
    search.className = "form-control hero-search";
    search.oninput = () => renderList();
    heroActions.appendChild(search);

    const refreshBtn = document.createElement("button");
    refreshBtn.type = "button";
    refreshBtn.className = "btn btn-outline-primary";
    refreshBtn.textContent = "تحديث القائمة";
    refreshBtn.onclick = () => loadData();
    heroActions.appendChild(refreshBtn);

    header.appendChild(heroActions);
    root.appendChild(header);

    const stats = document.createElement("div");
    stats.className = "stats-grid mb-3";
    root.appendChild(stats);

    const listHost = document.createElement("div");
    listHost.className = "course-coordinator-list";
    root.appendChild(listHost);

    let cachedItems: CourseCoordinatorItem[] = [];
    let summary: TrainingCourseFileSummaryResponse | null = null;

    loadData();

    function loadData() {
        listHost.innerHTML = `<div class="text-muted">جارٍ تحميل المقررات...</div>`;
        stats.innerHTML = "";

        serviceCall({
            url: resolveUrl("~/Services/Administration/TrainingCourseFile/Summary"),
            onSuccess: (resp: TrainingCourseFileSummaryResponse) => {
                summary = resp;
                renderStats();
            },
            onError: () => stats.innerHTML = ""
        });

        serviceCall({
            url: resolveUrl("~/Services/Administration/TrainingCourseFile/CourseCoordinators"),
            onSuccess: (resp: CourseCoordinatorListResponse) => {
                cachedItems = resp?.Items || [];
                renderList();
                renderStats();
            },
            onError: err => {
                const message = err?.Error?.Message || err?.Message || "تعذر تحميل البيانات.";
                listHost.innerHTML = `<div class="alert alert-danger mb-0">${message}</div>`;
            }
        });
    }

    function renderStats() {
        const total = new Set((cachedItems || []).map(x => x.CourseKey)).size || summary?.Total || 0;
        const assigned = new Set((cachedItems || [])
            .filter(x => (x.SelectedCoordinatorNumber ?? 0) > 0)
            .map(x => x.CourseKey)).size;
        const unassigned = Math.max(total - assigned, 0);

        const byDept = buildGroupedStats(
            c => (c.Departments && c.Departments.length ? c.Departments : [(c.Department || "").trim()]),
            "قسم غير محدد",
            true);
        const byType = buildGroupedStats(c => (c.TrainingType || "").trim(), "غير محدد");

        const renderGrouped = (items: ReturnType<typeof buildGroupedStats>, emptyText: string) =>
            items.length
                ? `
                    <div class="unit-table">
                        <div class="unit-row unit-head">
                            <span class="unit-name muted">التصنيف</span>
                            <span class="pill head assigned">معين</span>
                            <span class="pill head unassigned">غير معين</span>
                            <span class="pill head total">الإجمالي</span>
                        </div>
                        ${items.map(u => `
                            <div class="unit-row">
                                <span class="unit-name">${u.name}</span>
                                <span class="pill assigned" title="المعين">${u.assigned}</span>
                                <span class="pill unassigned" title="غير المعين">${u.unassigned}</span>
                                <span class="pill total" title="الإجمالي">${u.total}</span>
                            </div>
                        `).join("")}
                    </div>
                `
                : `<div class="text-muted small">${emptyText}</div>`;

        const deptHtml = renderGrouped(byDept, "لا توجد بيانات أقسام.");
        const typeHtml = renderGrouped(byType, "لا توجد بيانات أنماط (صباحي/مسائي).");
        const deptCount = byDept.filter(d => d.name !== "قسم غير محدد").length || byDept.length;

        stats.innerHTML = `
            <div class="stat-card clean">
                <div class="stat-label">إجمالي المقررات (بدون تكرار)</div>
                <div class="stat-value">${total}</div>
            </div>
            <div class="stat-card assigned-card">
                <div class="stat-label">المعين لهم منسق</div>
                <div class="stat-value">${assigned}</div>
            </div>
            <div class="stat-card unassigned-card">
                <div class="stat-label">غير المعين لهم منسق</div>
                <div class="stat-value">${unassigned}</div>
            </div>
            <div class="stat-row-pair">
                <div class="stat-card mini dept-card">
                    <div class="stat-label-row">
                        <span>حسب القسم</span>
                        <span class="pill outline">الأقسام: ${deptCount}</span>
                    </div>
                    <div class="unit-list">${deptHtml}</div>
                </div>
                <div class="stat-card mini type-card">
                    <div class="stat-label-row">
                        <span>حسب النوع (صباحي/مسائي)</span>
                        <span class="pill outline">معين / غير معين / إجمالي</span>
                    </div>
                    <div class="unit-list">${typeHtml}</div>
                </div>
            </div>
        `;
    }

    function buildGroupedStats(
        selector: (c: CourseCoordinatorItem) => string | string[],
        emptyLabel: string,
        skipEmpty?: boolean) {
        const map = new Map<string, { name: string; total: number; assigned: number; unassigned: number }>();
        (cachedItems || []).forEach(c => {
            const values = selector(c);
            const list = Array.isArray(values) ? values : [values];
            list.forEach(raw => {
                const trimmed = (raw || "").trim();
                if (skipEmpty && !trimmed) return;
                const name = trimmed || emptyLabel;
                const entry = map.get(name) || { name, total: 0, assigned: 0, unassigned: 0 };
                entry.total += 1;
                if ((c.SelectedCoordinatorNumber ?? 0) > 0) entry.assigned += 1;
                else entry.unassigned += 1;
                map.set(name, entry);
            });
        });
        return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
    }

    function renderList() {
        const keyword = (search.value || "").toLowerCase().trim();

        const filtered = !keyword
            ? cachedItems
            : cachedItems.filter(x =>
                [x.Course, x.CourseDescription, x.TrainingUnit, x.TrainingType, x.TrainingTerm]
                    .some(t => (t || "").toLowerCase().includes(keyword)) ||
                x.Trainers.some(t =>
                    (t.TrainerName || "").toLowerCase().includes(keyword) ||
                    (t.TrainerNumber?.toString() || "").includes(keyword))
            );

        if (!filtered.length) {
            listHost.innerHTML = `<div class="alert alert-warning mb-0">لا توجد مقررات مطابقة لنتيجة البحث.</div>`;
            return;
        }

        listHost.innerHTML = "";
        filtered.forEach((item, index) => listHost.appendChild(renderCard(item, index)));
    }

    function renderCard(item: CourseCoordinatorItem, index: number) {
        const card = document.createElement("div");
        card.className = "course-card shadow-sm";

        const header = document.createElement("div");
        header.className = "d-flex flex-wrap align-items-start gap-2 mb-2";

        const title = document.createElement("div");
        title.className = "course-title";
        title.textContent = item.Course || "مقرر غير مسمى";
        header.appendChild(title);

        const tags = document.createElement("div");
        tags.className = "ms-auto d-flex flex-wrap gap-2";

        if (item.TrainingTerm) {
            tags.appendChild(makeTag(item.TrainingTerm, "bg-primary text-white"));
        }
        if (item.TrainingType) {
            tags.appendChild(makeTag(item.TrainingType, "bg-info text-dark"));
        }
        if (item.TrainingUnit) {
            tags.appendChild(makeTag(item.TrainingUnit, "bg-secondary"));
        }

        header.appendChild(tags);
        card.appendChild(header);

        if (item.CourseDescription) {
            const desc = document.createElement("div");
            desc.className = "text-muted mb-2 small";
            desc.textContent = item.CourseDescription;
            card.appendChild(desc);
        }

        const trainerList = document.createElement("div");
        trainerList.className = "trainer-list";

        if (!item.Trainers?.length) {
            const empty = document.createElement("div");
            empty.className = "alert alert-warning mb-0";
            empty.textContent = "لا يوجد مدربون مسجلون لهذا المقرر.";
            trainerList.appendChild(empty);
        } else {
            const groupName = `coordinator-${index}`;
            item.Trainers.forEach(tr => trainerList.appendChild(renderTrainerOption(item, tr, groupName)));
        }

        card.appendChild(trainerList);

        return card;
    }

    function renderTrainerOption(item: CourseCoordinatorItem, trainer: CourseTrainerInfo, groupName: string) {
        const row = document.createElement("label");
        row.className = "trainer-row";

        const left = document.createElement("div");
        left.className = "d-flex align-items-center gap-2";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = groupName;
        radio.value = String(trainer.TrainerNumber);
        radio.checked = item.SelectedCoordinatorNumber === trainer.TrainerNumber;
        radio.onchange = () => saveCoordinator(item, trainer, row);
        left.appendChild(radio);

        const name = document.createElement("div");
        name.className = "fw-bold";
        name.textContent = trainer.TrainerName;
        left.appendChild(name);

        const number = document.createElement("div");
        number.className = "trainer-number";
        number.textContent = `(${trainer.TrainerNumber})`;
        left.appendChild(number);

        row.appendChild(left);

        const badge = document.createElement("span");
        badge.className = "badge bg-light text-dark";
        badge.textContent = radio.checked ? "المنسق الحالي" : "تعيين كمنسق";
        row.appendChild(badge);

        return row;
    }

    function saveCoordinator(item: CourseCoordinatorItem, trainer: CourseTrainerInfo, row: HTMLElement) {
        row.classList.add("saving");

        serviceCall({
            url: resolveUrl("~/Services/Administration/TrainingCourseFile/SetCoordinator"),
            request: {
                Course: item.Course,
                TrainingTerm: item.TrainingTerm,
                TrainerNumber: trainer.TrainerNumber
            },
            onSuccess: () => {
                item.SelectedCoordinatorNumber = trainer.TrainerNumber;
                notifySuccess("تم تعيين المنسق بنجاح.");
                renderList();
                renderStats();
            },
            onError: err => {
                const message = err?.Error?.Message || err?.Message || "تعذر حفظ المنسق.";
                notifyError(message);
                renderList();
            },
            onFinally: () => row.classList.remove("saving")
        });
    }
};

function makeTag(text: string, classes: string) {
    const tag = document.createElement("span");
    tag.className = `badge ${classes}`;
    tag.textContent = text;
    return tag;
}

function ensureStyles() {
    if (document.getElementById("course-coordinator-styles"))
        return;

    const style = document.createElement("style");
    style.id = "course-coordinator-styles";
    style.textContent = `
    .course-coordinator-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 16px;
    }
    .course-card {
        border-radius: 14px;
        border: 1px solid #e5e7eb;
        background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
        padding: 16px;
        box-shadow: 0 8px 26px rgba(0,0,0,0.06);
        transition: transform 0.12s ease, box-shadow 0.12s ease;
    }
    .course-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(63,81,181,0.15);
    }
    .course-title {
        font-weight: 700;
        font-size: 1.05rem;
    }
    .trainer-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .trainer-row {
        border: 1px dashed #d1d5db;
        border-radius: 10px;
        padding: 10px 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        cursor: pointer;
        background: #fff;
        transition: border-color 0.12s ease, box-shadow 0.12s ease;
    }
    .trainer-row:hover {
        border-color: #4f46e5;
        box-shadow: 0 6px 16px rgba(79,70,229,0.12);
    }
    .trainer-row input[type=radio] {
        accent-color: #4f46e5;
    }
    .trainer-number {
        font-size: 0.9rem;
        color: #6b7280;
    }
    .trainer-row.saving {
        opacity: 0.7;
        pointer-events: none;
    }
    .badge.bg-secondary {
        background-color: #475569!important;
    }
    .page-hero {
        display: grid;
        grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
        gap: 16px;
        align-items: center;
        padding: 22px 26px;
        min-height: 128px;
        border-radius: 16px;
        border: 1px solid #e2e8f0;
        background: linear-gradient(120deg, #eef2ff 0%, #e0f2fe 100%);
        box-shadow: 0 12px 30px rgba(79,70,229,0.12);
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
    }
    .hero-left {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .hero-title {
        font-weight: 800;
        font-size: 1.6rem;
        line-height: 1.25;
        color: #1e3a8a;
        position: relative;
        padding-bottom: 6px;
    }
    .hero-title::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 82px;
        height: 4px;
        border-radius: 999px;
        background: linear-gradient(90deg, #4338ca, #22d3ee);
    }
    .hero-subtitle {
        color: #475569;
        font-size: 0.95rem;
    }
    .hero-actions {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: flex-end;
    }
    .hero-search {
        min-width: 240px;
        max-width: 320px;
    }
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;
    }
    .stat-card {
        padding: 12px;
        border-radius: 12px;
        color: #0f172a;
        border: 1px solid #e2e8f0;
        background: #fff;
        box-shadow: 0 6px 14px rgba(15, 23, 42, 0.04);
    }
    .stat-card.clean {
        background: linear-gradient(135deg, #f8fafc, #eef2ff);
    }
    .stat-card.assigned-card {
        background: linear-gradient(135deg, #ecfdf3, #d1fae5);
        border-color: #bbf7d0;
        color: #14532d;
    }
    .stat-card.unassigned-card {
        background: linear-gradient(135deg, #fff7ed, #fee2e2);
        border-color: #fecdd3;
        color: #9a3412;
    }
    .stat-card.mini {
        background: #fff;
    }
    .stat-card.mini .stat-label-row {
        background: #f8fafc;
        padding: 6px 8px;
        border-radius: 10px;
        border: 1px solid #e2e8f0;
    }
    .dept-card .stat-label-row {
        background: linear-gradient(120deg, #e0f2fe, #dbeafe);
        border-color: #bfdbfe;
    }
    .type-card .stat-label-row {
        background: linear-gradient(120deg, #fef3c7, #ffe4e6);
        border-color: #fcd34d;
    }
    .stat-row-pair {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 12px;
    }
    .stat-card .stat-label {
        font-size: 0.95rem;
        color: #475569;
        margin-bottom: 4px;
    }
    .stat-card .stat-value {
        font-weight: 800;
        font-size: 1.4rem;
    }
    .stat-card .stat-label-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
        margin-bottom: 6px;
        color: #0f172a;
        font-weight: 700;
    }
    .stat-card .unit-list {
        margin-top: 4px;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .stat-card .unit-table {
        display: grid;
        gap: 4px;
    }
    .stat-card .unit-row {
        display: grid;
        grid-template-columns: 1fr repeat(3, 90px);
        align-items: center;
        gap: 6px;
        padding: 8px 10px;
        border-radius: 8px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
    }
    .stat-card .unit-name {
        font-weight: 700;
        color: #0f172a;
    }
    .stat-card .unit-name.muted {
        font-weight: 600;
        color: #475569;
    }
    .stat-card .pill {
        padding: 6px 8px;
        border-radius: 9px;
        font-size: 0.82rem;
        font-weight: 700;
        color: #0f172a;
        background: #f1f5f9;
        min-width: 68px;
        text-align: center;
    }
    .stat-card .pill.total {
        background: #e0f2fe;
        color: #075985;
    }
    .stat-card .pill.assigned {
        background: #dcfce7;
        color: #166534;
    }
    .stat-card .pill.unassigned {
        background: #fee2e2;
        color: #b91c1c;
    }
    .stat-card .pill.head {
        background: #e2e8f0;
        color: #0f172a;
        font-weight: 800;
    }
    .stat-card .pill.outline {
        background: transparent;
        border: 1px solid #cbd5e1;
        color: #475569;
        font-weight: 600;
    }
    @media (max-width: 768px) {
        .page-hero {
            grid-template-columns: 1fr;
            gap: 12px;
        }
        .hero-actions {
            justify-content: flex-start;
        }
        .hero-search {
            width: 100%;
            max-width: none;
        }
    }
    `;

    document.head.appendChild(style);
}
