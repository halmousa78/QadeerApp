namespace QadeerApp.Administration;

[ConnectionKey("Default"), Module("Administration"), TableName("TrainingCalendars")]
[DisplayName("Training Calendar"), InstanceName("Training Calendar")]
[ReadPermission(PermissionKeys.TrainingCalendar.View)]
[ModifyPermission(PermissionKeys.TrainingCalendar.Update)]
[InsertPermission(PermissionKeys.TrainingCalendar.Insert)]
[UpdatePermission(PermissionKeys.TrainingCalendar.Update)]
[DeletePermission(PermissionKeys.TrainingCalendar.Delete)]
[LookupScript(Permission = "*")]
public sealed class TrainingCalendarRow : Serenity.Extensions.Entities.LoggingRow<TrainingCalendarRow.RowFields>, IIdRow, INameRow, IIsActiveRow, IIsActiveDeletedRow, IDeleteLogRow
{
    [DisplayName("Training Calendar Id"), Identity, IdProperty]
    public int? TrainingCalendarId { get => fields.TrainingCalendarId[this]; set => fields.TrainingCalendarId[this] = value; }

    [DisplayName("Training Term"), NotNull, ForeignKey(typeof(TrainingTermRow)), LeftJoin("tt"), TextualField(nameof(TrainingTermName))]
    [LookupEditor(typeof(TrainingTermRow), InplaceAdd = false)]
    public int? TrainingTermId { get => fields.TrainingTermId[this]; set => fields.TrainingTermId[this] = value; }

    [DisplayName("Name"), Size(200), NotNull, QuickSearch, NameProperty]
    public string Name { get => fields.Name[this]; set => fields.Name[this] = value; }

    [DisplayName("Start Date"), NotNull]
    public DateTime? StartDate { get => fields.StartDate[this]; set => fields.StartDate[this] = value; }

    [DisplayName("End Date"), NotNull]
    public DateTime? EndDate { get => fields.EndDate[this]; set => fields.EndDate[this] = value; }

    [DisplayName("Is Active"), NotNull, DefaultValue(1)]
    public short? IsActive { get => fields.IsActive[this]; set => fields.IsActive[this] = value; }

    [DisplayName("Is Enabled"), NotNull, DefaultValue(1)]
    public short? IsEnabled { get => fields.IsEnabled[this]; set => fields.IsEnabled[this] = value; }

    [DisplayName("Training Term"), Expression("tt.[Name]")]
    public string TrainingTermName { get => fields.TrainingTermName[this]; set => fields.TrainingTermName[this] = value; }

    [Insertable(false), Updatable(false)]
    public int? DeleteUserId { get => fields.DeleteUserId[this]; set => fields.DeleteUserId[this] = value; }

    [Insertable(false), Updatable(false)]
    public DateTime? DeleteDate { get => fields.DeleteDate[this]; set => fields.DeleteDate[this] = value; }

    Int16Field IIsActiveRow.IsActiveField => fields.IsActive;
    Field IDeleteLogRow.DeleteUserIdField => fields.DeleteUserId;
    DateTimeField IDeleteLogRow.DeleteDateField => fields.DeleteDate;

    public class RowFields : Serenity.Extensions.Entities.LoggingRowFields
    {
        public Int32Field TrainingCalendarId;
        public Int32Field TrainingTermId;
        public StringField Name;
        public DateTimeField StartDate;
        public DateTimeField EndDate;
        public Int16Field IsActive;
        public Int16Field IsEnabled;
        public StringField TrainingTermName;
        public Int32Field DeleteUserId;
        public DateTimeField DeleteDate;
    }
}
