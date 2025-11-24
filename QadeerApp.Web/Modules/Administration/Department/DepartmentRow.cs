namespace QadeerApp.Administration;

[ConnectionKey("Default"), Module("Administration"), TableName("Departments")]
[DisplayName("Departments"), InstanceName("Department")]
[ReadPermission(PermissionKeys.Departments)]
[ModifyPermission(PermissionKeys.Departments)]
[LookupScript(Permission = "*")]
public sealed class DepartmentRow : Serenity.Extensions.Entities.LoggingRow<DepartmentRow.RowFields>, IIdRow, INameRow, IIsActiveRow, IIsActiveDeletedRow, IDeleteLogRow
{
    [DisplayName("Department Id"), Identity, IdProperty]
    public int? DepartmentId { get => fields.DepartmentId[this]; set => fields.DepartmentId[this] = value; }

    [DisplayName("Name"), Size(200), NotNull, QuickSearch, NameProperty]
    public string Name { get => fields.Name[this]; set => fields.Name[this] = value; }

    [DisplayName("Is Active"), NotNull, DefaultValue(1)]
    public short? IsActive { get => fields.IsActive[this]; set => fields.IsActive[this] = value; }

    [Insertable(false), Updatable(false)]
    public int? DeleteUserId { get => fields.DeleteUserId[this]; set => fields.DeleteUserId[this] = value; }

    [Insertable(false), Updatable(false)]
    public DateTime? DeleteDate { get => fields.DeleteDate[this]; set => fields.DeleteDate[this] = value; }

    Int16Field IIsActiveRow.IsActiveField => fields.IsActive;
    Field IDeleteLogRow.DeleteUserIdField => fields.DeleteUserId;
    DateTimeField IDeleteLogRow.DeleteDateField => fields.DeleteDate;

    public class RowFields : Serenity.Extensions.Entities.LoggingRowFields
    {
        public Int32Field DepartmentId;
        public StringField Name;
        public Int16Field IsActive;
        public Int32Field DeleteUserId;
        public DateTimeField DeleteDate;
    }
}
