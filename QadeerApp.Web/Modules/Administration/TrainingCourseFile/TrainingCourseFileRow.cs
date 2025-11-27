namespace QadeerApp.Administration;

[ConnectionKey("Default"), Module("Administration"), TableName("TrainingCourseFiles")]
[DisplayName("Training Course File"), InstanceName("Training Course File")]
[ReadPermission(PermissionKeys.TrainingCourseFile.View)]
[ModifyPermission(PermissionKeys.TrainingCourseFile.Update)]
[InsertPermission(PermissionKeys.TrainingCourseFile.Insert)]
[UpdatePermission(PermissionKeys.TrainingCourseFile.Update)]
[DeletePermission(PermissionKeys.TrainingCourseFile.Delete)]
public sealed class TrainingCourseFileRow : Serenity.Extensions.Entities.LoggingRow<TrainingCourseFileRow.RowFields>, IIdRow, INameRow, IIsActiveRow, IIsActiveDeletedRow, IDeleteLogRow
{
    [DisplayName("Id"), Identity, IdProperty]
    public int? TrainingCourseFileId { get => fields.TrainingCourseFileId[this]; set => fields.TrainingCourseFileId[this] = value; }

    [DisplayName("Training Term"), Size(200), NotNull, QuickSearch, NameProperty]
    public string TrainingTerm { get => fields.TrainingTerm[this]; set => fields.TrainingTerm[this] = value; }

    [DisplayName("Training Unit"), Size(200), NotNull]
    public string TrainingUnit { get => fields.TrainingUnit[this]; set => fields.TrainingUnit[this] = value; }

    [DisplayName("Department"), Size(200), NotNull]
    public string Department { get => fields.Department[this]; set => fields.Department[this] = value; }

    [DisplayName("Training Type"), Size(200), NotNull]
    public string TrainingType { get => fields.TrainingType[this]; set => fields.TrainingType[this] = value; }

    [DisplayName("Trainer Number"), NotNull]
    public int? TrainerNumber { get => fields.TrainerNumber[this]; set => fields.TrainerNumber[this] = value; }

    [DisplayName("Trainer Name"), Size(200), NotNull]
    public string TrainerName { get => fields.TrainerName[this]; set => fields.TrainerName[this] = value; }

    [DisplayName("Day"), Size(50), NotNull]
    public string Day { get => fields.Day[this]; set => fields.Day[this] = value; }

    [DisplayName("Time"), Size(100), NotNull]
    public string Time { get => fields.Time[this]; set => fields.Time[this] = value; }

    [DisplayName("Lecture Count"), NotNull]
    public int? LectureCount { get => fields.LectureCount[this]; set => fields.LectureCount[this] = value; }

    [DisplayName("Course"), Size(200), NotNull]
    public string Course { get => fields.Course[this]; set => fields.Course[this] = value; }

    [DisplayName("Course Description"), Size(500)]
    public string CourseDescription { get => fields.CourseDescription[this]; set => fields.CourseDescription[this] = value; }

    [DisplayName("Lecture Description"), Size(500)]
    public string LectureDescription { get => fields.LectureDescription[this]; set => fields.LectureDescription[this] = value; }

    [DisplayName("Reference Number")]
    public int? ReferenceNumber { get => fields.ReferenceNumber[this]; set => fields.ReferenceNumber[this] = value; }

    [DisplayName("From"), Size(100)]
    public string FromText { get => fields.FromText[this]; set => fields.FromText[this] = value; }

    [DisplayName("To"), Size(100)]
    public string ToText { get => fields.ToText[this]; set => fields.ToText[this] = value; }

    [DisplayName("Building")]
    public int? Building { get => fields.Building[this]; set => fields.Building[this] = value; }

    [DisplayName("Room Number")]
    public int? RoomNumber { get => fields.RoomNumber[this]; set => fields.RoomNumber[this] = value; }

    [DisplayName("Room Name"), Size(200)]
    public string RoomName { get => fields.RoomName[this]; set => fields.RoomName[this] = value; }

    [DisplayName("Contact Hours")]
    public int? ContactHours { get => fields.ContactHours[this]; set => fields.ContactHours[this] = value; }

    [DisplayName("Course Coordinator"), Size(200)]
    public string CourseCoordinator { get => fields.CourseCoordinator[this]; set => fields.CourseCoordinator[this] = value; }

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
        public Int32Field TrainingCourseFileId;
        public StringField TrainingTerm;
        public StringField TrainingUnit;
        public StringField Department;
        public StringField TrainingType;
        public Int32Field TrainerNumber;
        public StringField TrainerName;
        public StringField Day;
        public StringField Time;
        public Int32Field LectureCount;
        public StringField Course;
        public StringField CourseDescription;
        public StringField LectureDescription;
        public Int32Field ReferenceNumber;
        public StringField FromText;
        public StringField ToText;
        public Int32Field Building;
        public Int32Field RoomNumber;
        public StringField RoomName;
        public Int32Field ContactHours;
        public StringField CourseCoordinator;
        public Int16Field IsActive;
        public Int32Field DeleteUserId;
        public DateTimeField DeleteDate;
    }
}
