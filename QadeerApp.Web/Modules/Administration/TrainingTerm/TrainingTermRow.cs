namespace QadeerApp.Administration;

[ConnectionKey("Default"), Module("Administration"), TableName("TrainingTerms")]
[DisplayName("Training Terms"), InstanceName("Training Term")]
[ReadPermission(PermissionKeys.TrainingTerm.View)]
[ModifyPermission(PermissionKeys.TrainingTerm.Update)]
[InsertPermission(PermissionKeys.TrainingTerm.Insert)]
[UpdatePermission(PermissionKeys.TrainingTerm.Update)]
[DeletePermission(PermissionKeys.TrainingTerm.Delete)]
[LookupScript(Permission = "*")]
public sealed class TrainingTermRow : Serenity.Extensions.Entities.LoggingRow<TrainingTermRow.RowFields>, IIdRow, INameRow, IIsActiveRow, IIsActiveDeletedRow, IDeleteLogRow
{
    [DisplayName("Training Term Id"), Identity, IdProperty]
    public int? TrainingTermId { get => fields.TrainingTermId[this]; set => fields.TrainingTermId[this] = value; }

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
        public Int32Field TrainingTermId;
        public StringField Name;
        public Int16Field IsActive;
        public Int32Field DeleteUserId;
        public DateTimeField DeleteDate;
    }
}
