namespace QadeerApp.Administration;

[ConnectionKey("Default"), Module("Administration"), TableName("TrainingCourses")]
[DisplayName("Training Courses"), InstanceName("Training Course")]
[ReadPermission(PermissionKeys.TrainingCourses)]
[ModifyPermission(PermissionKeys.TrainingCourses)]
[LookupScript(Permission = "*")]
public sealed class TrainingCourseRow : Serenity.Extensions.Entities.LoggingRow<TrainingCourseRow.RowFields>, IIdRow, INameRow, IIsActiveRow, IIsActiveDeletedRow, IDeleteLogRow
{
    [DisplayName("Training Course Id"), Identity, IdProperty]
    public int? TrainingCourseId { get => fields.TrainingCourseId[this]; set => fields.TrainingCourseId[this] = value; }

    [DisplayName("Department"), NotNull, ForeignKey(typeof(DepartmentRow)), LeftJoin("d"), TextualField(nameof(DepartmentName))]
    [LookupEditor(typeof(DepartmentRow), InplaceAdd = false)]
    public int? DepartmentId { get => fields.DepartmentId[this]; set => fields.DepartmentId[this] = value; }

    [DisplayName("Specialization"), ForeignKey(typeof(SpecializationRow)), LeftJoin("s"), TextualField(nameof(SpecializationName))]
    [LookupEditor(typeof(SpecializationRow), InplaceAdd = false, CascadeFrom = nameof(DepartmentId), CascadeField = nameof(SpecializationRow.DepartmentId))]
    public int? SpecializationId { get => fields.SpecializationId[this]; set => fields.SpecializationId[this] = value; }

    [DisplayName("Name"), Size(200), NotNull, QuickSearch, NameProperty]
    public string Name { get => fields.Name[this]; set => fields.Name[this] = value; }

    [DisplayName("Code"), Size(50), NotNull]
    public string Code { get => fields.Code[this]; set => fields.Code[this] = value; }

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
        public Int32Field TrainingCourseId;
        public Int32Field DepartmentId;
        public Int32Field SpecializationId;
        public StringField Name;
        public StringField Code;
        public Int16Field IsActive;
        public StringField DepartmentName;
        public StringField SpecializationName;
        public Int32Field DeleteUserId;
        public DateTimeField DeleteDate;
    }
}
