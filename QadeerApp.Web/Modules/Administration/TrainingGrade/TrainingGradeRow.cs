namespace QadeerApp.Administration;

[ConnectionKey("Default"), Module("Administration"), TableName("TrainingGrades")]
[DisplayName("Training Grades"), InstanceName("Training Grade")]
[ReadPermission(PermissionKeys.TrainingGrade.View)]
[ModifyPermission(PermissionKeys.TrainingGrade.Update)]
[InsertPermission(PermissionKeys.TrainingGrade.Insert)]
[UpdatePermission(PermissionKeys.TrainingGrade.Update)]
[DeletePermission(PermissionKeys.TrainingGrade.Delete)]
public sealed class TrainingGradeRow : Serenity.Extensions.Entities.LoggingRow<TrainingGradeRow.RowFields>, IIdRow, INameRow, IIsActiveRow
{
    [DisplayName("Training Grade Id"), Identity, IdProperty]
    public int? TrainingGradeId { get => fields.TrainingGradeId[this]; set => fields.TrainingGradeId[this] = value; }

    [DisplayName("Grade"), Size(50)]
    public string Grade { get => fields.Grade[this]; set => fields.Grade[this] = value; }

    [DisplayName("Trainer Name"), Size(200)]
    public string TrainerName { get => fields.TrainerName[this]; set => fields.TrainerName[this] = value; }

    [DisplayName("Trainer Number"), Size(100)]
    public string TrainerNumber { get => fields.TrainerNumber[this]; set => fields.TrainerNumber[this] = value; }

    [DisplayName("Reference Number"), Size(100)]
    public string ReferenceNumber { get => fields.ReferenceNumber[this]; set => fields.ReferenceNumber[this] = value; }

    [DisplayName("Schedule Type"), Size(100)]
    public string ScheduleType { get => fields.ScheduleType[this]; set => fields.ScheduleType[this] = value; }

    [DisplayName("Course Name"), Size(200), QuickSearch, NameProperty]
    public string CourseName { get => fields.CourseName[this]; set => fields.CourseName[this] = value; }

    [DisplayName("Course Code"), Size(100)]
    public string CourseCode { get => fields.CourseCode[this]; set => fields.CourseCode[this] = value; }

    [DisplayName("Specialization"), Size(200)]
    public string Specialization { get => fields.Specialization[this]; set => fields.Specialization[this] = value; }

    [DisplayName("Department"), Size(200)]
    public string Department { get => fields.Department[this]; set => fields.Department[this] = value; }

    [DisplayName("Training Level"), Size(100)]
    public string TrainingLevel { get => fields.TrainingLevel[this]; set => fields.TrainingLevel[this] = value; }

    [DisplayName("Training Term"), Size(200)]
    public string TrainingTerm { get => fields.TrainingTerm[this]; set => fields.TrainingTerm[this] = value; }

    [DisplayName("Registration Status"), Size(200)]
    public string RegistrationStatus { get => fields.RegistrationStatus[this]; set => fields.RegistrationStatus[this] = value; }

    [DisplayName("Trainee Status"), Size(200)]
    public string TraineeStatus { get => fields.TraineeStatus[this]; set => fields.TraineeStatus[this] = value; }

    [DisplayName("Is Active"), NotNull, DefaultValue(1)]
    public short? IsActive { get => fields.IsActive[this]; set => fields.IsActive[this] = value; }

    Int16Field IIsActiveRow.IsActiveField => fields.IsActive;

    public class RowFields : Serenity.Extensions.Entities.LoggingRowFields
    {
        public Int32Field TrainingGradeId;
        public StringField Grade;
        public StringField TrainerName;
        public StringField TrainerNumber;
        public StringField ReferenceNumber;
        public StringField ScheduleType;
        public StringField CourseName;
        public StringField CourseCode;
        public StringField Specialization;
        public StringField Department;
        public StringField TrainingLevel;
        public StringField TrainingTerm;
        public StringField RegistrationStatus;
        public StringField TraineeStatus;
        public Int16Field IsActive;
    }
}
