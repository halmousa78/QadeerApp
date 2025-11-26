namespace QadeerApp.Administration;

[ConnectionKey("Default"), Module("Administration"), TableName("Specializations")]
[DisplayName("Specializations"), InstanceName("Specialization")]
[ReadPermission(PermissionKeys.Specialization.View)]
[ModifyPermission(PermissionKeys.Specialization.Update)]
[InsertPermission(PermissionKeys.Specialization.Insert)]
[UpdatePermission(PermissionKeys.Specialization.Update)]
[DeletePermission(PermissionKeys.Specialization.Delete)]
[LookupScript(Permission = "*")]
public sealed class SpecializationRow : Serenity.Extensions.Entities.LoggingRow<SpecializationRow.RowFields>, IIdRow, INameRow, IIsActiveRow, IIsActiveDeletedRow, IDeleteLogRow
{
    [DisplayName("Specialization Id"), Identity, IdProperty]
    public int? SpecializationId { get => fields.SpecializationId[this]; set => fields.SpecializationId[this] = value; }

    [DisplayName("Department"), NotNull, ForeignKey(typeof(DepartmentRow)), LeftJoin("d"), TextualField(nameof(DepartmentName))]
    [LookupEditor(typeof(DepartmentRow), InplaceAdd = false)]
    [LookupInclude]
    public int? DepartmentId { get => fields.DepartmentId[this]; set => fields.DepartmentId[this] = value; }

    [DisplayName("Department"), Expression("d.[Name]")]
    [LookupInclude]
    public string DepartmentName { get => fields.DepartmentName[this]; set => fields.DepartmentName[this] = value; }

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
        public Int32Field SpecializationId;
        public Int32Field DepartmentId;
        public StringField DepartmentName;
        public StringField Name;
        public Int16Field IsActive;
        public Int32Field DeleteUserId;
        public DateTimeField DeleteDate;
    }
}
