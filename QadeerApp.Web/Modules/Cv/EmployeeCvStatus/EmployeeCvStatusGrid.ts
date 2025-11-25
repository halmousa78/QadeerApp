import { EntityGrid, GridRowSelectionMixin } from "@serenity-is/corelib";
import { Authorization } from "@serenity-is/corelib/q";
import { EmployeeCvStatusColumns, EmployeeCvStatusRow, EmployeeCvStatusService, EmployeeCvService } from "../../ServerTypes/Cv";
import { nsCv } from "../../ServerTypes/Namespaces";
import { CvPrint } from "../Print/CvPrint";

export class EmployeeCvStatusGrid extends EntityGrid<EmployeeCvStatusRow, any> {
    static override [Symbol.typeInfo] = this.registerClass(nsCv);

    private rowSelection: GridRowSelectionMixin;

    constructor(container: JQuery) {
        super(container);

        // create row selection mixin (temporarily always enabled so checkbox column is visible)
        this.rowSelection = new GridRowSelectionMixin(this);
    }

    protected override getColumnsKey() { return EmployeeCvStatusColumns.columnsKey; }
    protected override getDialogType() { return null as any; }
    protected override getIdProperty() { return EmployeeCvStatusRow.idProperty; }
    protected override getLocalTextPrefix() { return EmployeeCvStatusRow.localTextPrefix; }
    protected override getService() { return EmployeeCvStatusService.baseUrl; }

    protected override createSlickGrid() {
        const grid = super.createSlickGrid();

        if (this.rowSelection) {
            grid.onClick.subscribe((e, args) => {
                const item = this.itemAt(args.row);
                if (!item)
                    return;

                const idProp = this.getIdProperty();
                const key = (item as any)[idProp];
                if (key == null)
                    return;

                const keys = new Set(this.rowSelection.getSelectedKeys() || []);
                const keyStr = key.toString();
                keys.has(keyStr) ? keys.delete(keyStr) : keys.add(keyStr);
                this.rowSelection.setSelectedKeys(Array.from(keys));
                e.preventDefault();
            });
        }

        return grid;
    }

    protected override getColumns() {
        const columns = super.getColumns();

        if (this.rowSelection) {
            columns.unshift(GridRowSelectionMixin.createSelectColumn(() => this.rowSelection));
        }

        return columns;
    }

    protected override getButtons() {
        const buttons = super.getButtons().filter(x => !x.cssClass?.includes("add-button"));

        if (Authorization.hasPermission("Cv:Report")) {
            buttons.push({
                title: "طباعة المحدد",
                cssClass: "print-selected-button",
                onClick: () => this.printSelected()
            });
            buttons.push({
                title: "طباعة الكل",
                cssClass: "print-all-button",
                onClick: () => CvPrint.printAll("السيرة الذاتية - جميع الموظفين")
            });
        }

        return buttons;
    }

    protected override onViewProcessData(response: Serenity.ListResponse<EmployeeCvStatusRow>) {
        const r = super.onViewProcessData(response);
        this.rowSelection?.setSelectedKeys([]);
        return r;
    }

    protected override editItem(entityOrId: any): void {
        // read only grid
    }

    private async printSelected() {
        // gather selected user keys (IdProperty is UserId)
        let userKeys: string[] = [];
        if (this.rowSelection)
            userKeys = this.rowSelection.getSelectedKeys() || [];

        // if no keys from selection, try active row fallback
        if ((!userKeys || userKeys.length === 0) && this.slickGrid) {
            const active = this.slickGrid.getActiveCell();
            if (active) {
                const item = this.itemAt(active.row);
                const idProp = this.getIdProperty();
                const key = (item as any)?.[idProp];
                if (key != null)
                    userKeys = [key.toString()];
            }
        }

        if (!userKeys || userKeys.length === 0) {
            alert("يرجى اختيار سجل واحد على الأقل للطباعة.");
            return;
        }

        // convert to numbers
        const userIds = userKeys.map(k => parseInt(k, 10)).filter(x => !Number.isNaN(x));
        if (userIds.length === 0) {
            alert("تعذر تحديد المعرفات الصحيحة للطباعة.");
            return;
        }

        // Fetch EmployeeCv entries for selected users (works across pages)
        try {
            const list = await EmployeeCvService.List({ EqualityFilter: { UserId: userIds } });
            const ids = (list.Entities || []).map(x => x.EmployeeCvId).filter(x => !!x) as number[];
            if (!ids.length) {
                alert("لا توجد سِير ذاتية مرتبطة بالسجلات المحددة.");
                return;
            }

            await CvPrint.printByIds(ids, ids.length > 1 ? "السيرة الذاتية - مجموعة موظفين" : "السيرة الذاتية");
        }
        catch (e) {
            console.error(e);
            alert("حدث خطأ أثناء جلب السجلات للطباعة.");
        }
    }
}
