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
