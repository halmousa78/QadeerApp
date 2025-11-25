using QadeerApp.Administration;

namespace QadeerApp.Cv;

[ConnectionKey("Default"), Module("Cv"), TableName("EmployeeCvs")]
[DisplayName("السيرة الذاتية"), InstanceName("سيرة ذاتية")]
[ReadPermission("*")]
[ModifyPermission("*")]
public sealed class EmployeeCvRow : Serenity.Extensions.Entities.LoggingRow<EmployeeCvRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("رقم السيرة الذاتية"), Identity, IdProperty]
    public int? EmployeeCvId { get => fields.EmployeeCvId[this]; set => fields.EmployeeCvId[this] = value; }

    [DisplayName("الموظف"), NotNull, ForeignKey(typeof(UserRow)), LeftJoin("u"), TextualField(nameof(UserDisplayName))]
    public int? UserId { get => fields.UserId[this]; set => fields.UserId[this] = value; }

    [DisplayName("اسم المستخدم"), Expression("u.[Username]")]
    public string Username { get => fields.Username[this]; set => fields.Username[this] = value; }

    [DisplayName("اسم الموظف"), Expression("u.[DisplayName]"), NameProperty]
    public string UserDisplayName { get => fields.UserDisplayName[this]; set => fields.UserDisplayName[this] = value; }

    [DisplayName("رقم الجوال"), Size(20), NotNull, QuickSearch]
    public string Mobile { get => fields.Mobile[this]; set => fields.Mobile[this] = value; }

    [DisplayName("مستوى اللغة الإنجليزية"), NotNull]
    public EnglishLevel? EnglishLevel { get => fields.EnglishLevel[this]; set => fields.EnglishLevel[this] = value; }

    [DisplayName("العنوان"), Size(500), NotNull, TextAreaEditor(Rows = 2)]
    public string Address { get => fields.Address[this]; set => fields.Address[this] = value; }

    [DisplayName("رقم التحويلة"), Size(8), NotNull]
    public string ExtensionNumber { get => fields.ExtensionNumber[this]; set => fields.ExtensionNumber[this] = value; }

    [DisplayName("رقم المكتب"), Size(50), NotNull]
    public string OfficeNumber { get => fields.OfficeNumber[this]; set => fields.OfficeNumber[this] = value; }

    [DisplayName("رقم المبنى"), Size(50), NotNull]
    public string BuildingNumber { get => fields.BuildingNumber[this]; set => fields.BuildingNumber[this] = value; }

    [DisplayName("تاريخ التحديث"), Expression("coalesce(T0.UpdateDate, T0.InsertDate)"), Insertable(false), Updatable(false)]
    public DateTime? CvUpdatedOn { get => fields.CvUpdatedOn[this]; set => fields.CvUpdatedOn[this] = value; }

    [DisplayName("المؤهلات"), MasterDetailRelation(foreignKey: "EmployeeCvId"), NotMapped]
    public List<EmployeeQualificationRow> Qualifications { get => fields.Qualifications[this]; set => fields.Qualifications[this] = value; }

    [DisplayName("الخبرات"), MasterDetailRelation(foreignKey: "EmployeeCvId"), NotMapped]
    public List<EmployeeExperienceRow> Experiences { get => fields.Experiences[this]; set => fields.Experiences[this] = value; }

    [DisplayName("الدورات"), MasterDetailRelation(foreignKey: "EmployeeCvId"), NotMapped]
    public List<EmployeeCourseRow> Courses { get => fields.Courses[this]; set => fields.Courses[this] = value; }

    public class RowFields : Serenity.Extensions.Entities.LoggingRowFields
    {
        public Int32Field EmployeeCvId;
        public Int32Field UserId;
        public StringField Username;
        public StringField UserDisplayName;
        public StringField Mobile;
        public EnumField<EnglishLevel> EnglishLevel;
        public StringField Address;
        public StringField ExtensionNumber;
        public StringField OfficeNumber;
        public StringField BuildingNumber;
        public DateTimeField CvUpdatedOn;

        public ListField<EmployeeQualificationRow> Qualifications;
        public ListField<EmployeeExperienceRow> Experiences;
        public ListField<EmployeeCourseRow> Courses;
    }
}
