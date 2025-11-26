namespace QadeerApp.Administration;

[ConnectionKey("Default"), Module("Administration"), TableName("TrainingCalendarNotes")]
[DisplayName("Training Calendar Note"), InstanceName("Training Calendar Note")]
[ReadPermission(PermissionKeys.TrainingCalendar.View)]
[ModifyPermission(PermissionKeys.TrainingCalendar.Update)]
[InsertPermission(PermissionKeys.TrainingCalendar.Insert)]
[UpdatePermission(PermissionKeys.TrainingCalendar.Update)]
[DeletePermission(PermissionKeys.TrainingCalendar.Delete)]
public sealed class TrainingCalendarNoteRow : Serenity.Extensions.Entities.LoggingRow<TrainingCalendarNoteRow.RowFields>, IIdRow, INameRow, IIsActiveRow, IIsActiveDeletedRow, IDeleteLogRow
{
    [DisplayName("Training Calendar Note Id"), Identity, IdProperty]
    public int? TrainingCalendarNoteId { get => fields.TrainingCalendarNoteId[this]; set => fields.TrainingCalendarNoteId[this] = value; }

    [DisplayName("Training Calendar"), NotNull, ForeignKey(typeof(TrainingCalendarRow)), LeftJoin("tc"), TextualField(nameof(TrainingCalendarName))]
    [LookupEditor(typeof(TrainingCalendarRow), InplaceAdd = false)]
    public int? TrainingCalendarId { get => fields.TrainingCalendarId[this]; set => fields.TrainingCalendarId[this] = value; }

    [DisplayName("Title"), Size(200), NotNull, QuickSearch, NameProperty]
    public string Title { get => fields.Title[this]; set => fields.Title[this] = value; }

    [DisplayName("Note Text"), Size(500)]
    public string NoteText { get => fields.NoteText[this]; set => fields.NoteText[this] = value; }

    [DisplayName("Note Date"), NotNull]
    public DateTime? NoteDate { get => fields.NoteDate[this]; set => fields.NoteDate[this] = value; }

    [DisplayName("Is Active"), NotNull, DefaultValue(1)]
    public short? IsActive { get => fields.IsActive[this]; set => fields.IsActive[this] = value; }

    [DisplayName("Training Calendar"), Expression("tc.[Name]")]
    public string TrainingCalendarName { get => fields.TrainingCalendarName[this]; set => fields.TrainingCalendarName[this] = value; }

    [Insertable(false), Updatable(false)]
    public int? DeleteUserId { get => fields.DeleteUserId[this]; set => fields.DeleteUserId[this] = value; }

    [Insertable(false), Updatable(false)]
    public DateTime? DeleteDate { get => fields.DeleteDate[this]; set => fields.DeleteDate[this] = value; }

    Int16Field IIsActiveRow.IsActiveField => fields.IsActive;
    Field IDeleteLogRow.DeleteUserIdField => fields.DeleteUserId;
    DateTimeField IDeleteLogRow.DeleteDateField => fields.DeleteDate;

    public class RowFields : Serenity.Extensions.Entities.LoggingRowFields
    {
        public Int32Field TrainingCalendarNoteId;
        public Int32Field TrainingCalendarId;
        public StringField Title;
        public StringField NoteText;
        public DateTimeField NoteDate;
        public Int16Field IsActive;
        public StringField TrainingCalendarName;
        public Int32Field DeleteUserId;
        public DateTimeField DeleteDate;
    }
}
