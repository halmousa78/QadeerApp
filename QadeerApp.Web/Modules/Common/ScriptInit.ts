import { Config, ErrorHandling, TranslationConfig } from "@serenity-is/corelib";
import { notifyWarning, resolveUrl } from "@serenity-is/corelib/q";
import { gridDefaults } from "@serenity-is/sleekgrid";
import flatpickr from "flatpickr";
import "flatpickr/dist/l10n";
import { EmployeeCvService } from "../ServerTypes/Cv";
import { userDefinition } from "../Administration/User/Authentication/Authorization";
import { getLanguageList } from "./Helpers/LanguageList";
import DOMPurify from "dompurify";

Config.rootNamespaces.push('QadeerApp');
TranslationConfig.getLanguageList = getLanguageList;
gridDefaults.sanitizer = (globalThis.DOMPurify = DOMPurify).sanitize;

let culture = (document.documentElement?.lang || 'en').toLowerCase();
if (flatpickr.l10ns[culture]) {
    flatpickr.localize(flatpickr.l10ns[culture]);
} else {
    culture = culture.split('-')[0];
    flatpickr.l10ns[culture] && flatpickr.localize(flatpickr.l10ns[culture]);
}

window.onerror = ErrorHandling.runtimeErrorHandler;
window.addEventListener('unhandledrejection', ErrorHandling.unhandledRejectionHandler);

function setupSidebarAutoClose() {
    const body = document.body;
    const sidebar = document.querySelector('.s-sidebar');
    if (!body || !sidebar)
        return;

    // overlay for mobile to close sidebar on outside click
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay-rtl';
    body.appendChild(overlay);

    const closeSidebar = () => {
        body.classList.remove('sidebar-open');
        body.classList.add('sidebar-collapse');
        toggleOverlay();
    };

    const toggleSidebar = () => {
        if (window.innerWidth > 1199)
            return;
        const willOpen = !body.classList.contains('sidebar-open');
        body.classList.toggle('sidebar-open', willOpen);
        body.classList.toggle('sidebar-collapse', !willOpen);
        toggleOverlay();
    };

    const toggleOverlay = () => {
        if (window.innerWidth <= 1199 && body.classList.contains('sidebar-open')) {
            overlay.style.display = 'block';
        } else {
            overlay.style.display = 'none';
        }
    };

    // أغلق السايدبار تلقائياً بعد اختيار أي رابط داخل القائمة (تفويض على الوثيقة)
    document.addEventListener('click', evt => {
        const target = evt.target;
        if (!(target instanceof Element))
            return;

        const anchor = target.closest('.s-sidebar a');
        if (anchor && window.innerWidth <= 1199) {
            closeSidebar();
        }
    }, true);

    overlay.addEventListener('click', () => {
        closeSidebar();
    });

    // زر الهامبرغر
    document.addEventListener('click', evt => {
        const target = evt.target;
        if (!(target instanceof Element))
            return;

        const toggle = target.closest('.sidebar-toggle, .navbar-toggler, [data-toggle=\"sidebar\"], [data-toggle=\"offcanvas\"], .s-sidebar-toggle');
        if (toggle) {
            evt.preventDefault();
            toggleSidebar();
        }
    });

    // عند تكبير الشاشة ألغِ حالة الإخفاء
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1199)
            body.classList.remove('sidebar-collapse');
        toggleOverlay();
    });

    // راقب التبديل اليدوي (زر الهامبرغر)
    const observer = new MutationObserver(toggleOverlay);
    observer.observe(body, { attributes: true, attributeFilter: ['class'] });

    toggleOverlay();
}

function enforceCvCompletion() {
    const body = document.body;
    if (body?.classList.contains('no-navigation'))
        return;

    const ud = userDefinition();
    if (!ud?.Username || ud.IsAdmin)
        return;

    if (ud.HasCompletedCv)
        return;

    EmployeeCvService.CheckStatus(response => {
        if (!response?.NeedsCompletion)
            return;

        const target = resolveUrl('~/Cv/EmployeeCv');
        const alreadyOnCvPage = location.pathname.toLowerCase().includes('/cv/employeecv');

        notifyWarning(response.Message ?? 'يرجى استكمال السيرة الذاتية قبل متابعة العمل.');
        if (!alreadyOnCvPage) {
            location.href = target;
        }
    });
}

document.addEventListener('DOMContentLoaded', enforceCvCompletion);
document.addEventListener('DOMContentLoaded', setupSidebarAutoClose);
