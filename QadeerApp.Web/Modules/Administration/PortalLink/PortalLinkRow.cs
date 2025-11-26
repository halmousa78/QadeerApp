namespace QadeerApp.Administration;

[ConnectionKey("Default"), Module("Administration"), TableName("PortalLinks")]
[DisplayName("Portal Link"), InstanceName("Portal Link")]
[ReadPermission(PermissionKeys.PortalLink.View)]
[ModifyPermission(PermissionKeys.PortalLink.Update)]
[InsertPermission(PermissionKeys.PortalLink.Insert)]
[UpdatePermission(PermissionKeys.PortalLink.Update)]
[DeletePermission(PermissionKeys.PortalLink.Delete)]
public sealed class PortalLinkRow : Serenity.Extensions.Entities.LoggingRow<PortalLinkRow.RowFields>, IIdRow, INameRow, IIsActiveRow, IIsActiveDeletedRow, IDeleteLogRow
{
    [DisplayName("Portal Link Id"), Identity, IdProperty]
    public int? PortalLinkId { get => fields.PortalLinkId[this]; set => fields.PortalLinkId[this] = value; }

    [DisplayName("Section"), Size(100)]
    public string Section { get => fields.Section[this]; set => fields.Section[this] = value; }

    [DisplayName("Department"), NotNull, ForeignKey(typeof(DepartmentRow)), LeftJoin("d"), TextualField(nameof(DepartmentName))]
    [LookupEditor(typeof(DepartmentRow), InplaceAdd = false)]
    public int? DepartmentId { get => fields.DepartmentId[this]; set => fields.DepartmentId[this] = value; }

    [DisplayName("Specialization"), ForeignKey(typeof(SpecializationRow)), LeftJoin("s"), TextualField(nameof(SpecializationName))]
    [LookupEditor(typeof(SpecializationRow), InplaceAdd = false, CascadeFrom = nameof(DepartmentId), CascadeField = nameof(SpecializationRow.DepartmentId))]
    public int? SpecializationId { get => fields.SpecializationId[this]; set => fields.SpecializationId[this] = value; }

    [DisplayName("Title"), Size(200), NotNull, QuickSearch, NameProperty]
    public string Title { get => fields.Title[this]; set => fields.Title[this] = value; }

    [DisplayName("Url"), Size(500), NotNull]
    public string Url { get => fields.Url[this]; set => fields.Url[this] = value; }

    [DisplayName("Display Order"), NotNull, DefaultValue(0)]
    public int? DisplayOrder { get => fields.DisplayOrder[this]; set => fields.DisplayOrder[this] = value; }

    [DisplayName("Is Active"), NotNull, DefaultValue(1)]
    public short? IsActive { get => fields.IsActive[this]; set => fields.IsActive[this] = value; }

    [DisplayName("Department"), Expression("d.[Name]")]
    public string DepartmentName { get => fields.DepartmentName[this]; set => fields.DepartmentName[this] = value; }

    [DisplayName("Specialization"), Expression("s.[Name]")]
    public string SpecializationName { get => fields.SpecializationName[this]; set => fields.SpecializationName[this] = value; }

    [Insertable(false), Updatable(false)]
    public int? DeleteUserId { get => fields.DeleteUserId[this]; set => fields.DeleteUserId[this] = value; }

    [Insertable(false), Updatable(false)]
    public DateTime? DeleteDate { get => fields.DeleteDate[this]; set => fields.DeleteDate[this] = value; }

    Int16Field IIsActiveRow.IsActiveField => fields.IsActive;
    Field IDeleteLogRow.DeleteUserIdField => fields.DeleteUserId;
    DateTimeField IDeleteLogRow.DeleteDateField => fields.DeleteDate;

    public class RowFields : Serenity.Extensions.Entities.LoggingRowFields
    {
        public Int32Field PortalLinkId;
        public StringField Section;
        public Int32Field DepartmentId;
        public Int32Field SpecializationId;
        public StringField Title;
        public StringField Url;
        public Int32Field DisplayOrder;
        public Int16Field IsActive;
        public StringField DepartmentName;
        public StringField SpecializationName;
        public Int32Field DeleteUserId;
        public DateTimeField DeleteDate;
    }
}
