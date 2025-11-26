using QadeerApp.Administration;

namespace QadeerApp.Cv;

[ConnectionKey("Default"), Module("Cv"), TableName("EmployeeCvs")]
[DisplayName("Employee CV"), InstanceName("Employee CV")]
[ReadPermission(CvPermissionKeys.EmployeeCv.View)]
[ModifyPermission(CvPermissionKeys.EmployeeCv.Update)]
[InsertPermission(CvPermissionKeys.EmployeeCv.Insert)]
[UpdatePermission(CvPermissionKeys.EmployeeCv.Update)]
[DeletePermission(CvPermissionKeys.EmployeeCv.Delete)]
public sealed class EmployeeCvRow : Serenity.Extensions.Entities.LoggingRow<EmployeeCvRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Employee CV Id"), Identity, IdProperty]
    public int? EmployeeCvId { get => fields.EmployeeCvId[this]; set => fields.EmployeeCvId[this] = value; }

    [DisplayName("User"), NotNull, ForeignKey(typeof(UserRow)), LeftJoin("u"), TextualField(nameof(UserDisplayName))]
    public int? UserId { get => fields.UserId[this]; set => fields.UserId[this] = value; }

    [DisplayName("Username"), Expression("u.[Username]")]
    public string Username { get => fields.Username[this]; set => fields.Username[this] = value; }

    [DisplayName("Employee Number"), Expression("u.[EmployeeNumber]"), Insertable(false), Updatable(false)]
    public string EmployeeNumber { get => fields.EmployeeNumber[this]; set => fields.EmployeeNumber[this] = value; }

    [DisplayName("Full Name"), Expression("u.[DisplayName]"), NameProperty]
    public string UserDisplayName { get => fields.UserDisplayName[this]; set => fields.UserDisplayName[this] = value; }

    [DisplayName("Mobile"), Size(20), NotNull, QuickSearch]
    public string Mobile { get => fields.Mobile[this]; set => fields.Mobile[this] = value; }

    [DisplayName("English Level"), NotNull]
    public EnglishLevel? EnglishLevel { get => fields.EnglishLevel[this]; set => fields.EnglishLevel[this] = value; }

    [DisplayName("Address"), Size(500), NotNull, TextAreaEditor(Rows = 2)]
    public string Address { get => fields.Address[this]; set => fields.Address[this] = value; }

    [DisplayName("Extension Number"), Size(8), NotNull]
    public string ExtensionNumber { get => fields.ExtensionNumber[this]; set => fields.ExtensionNumber[this] = value; }

    [DisplayName("Office Number"), Size(50), NotNull]
    public string OfficeNumber { get => fields.OfficeNumber[this]; set => fields.OfficeNumber[this] = value; }

    [DisplayName("Building Number"), Size(50), NotNull]
    public string BuildingNumber { get => fields.BuildingNumber[this]; set => fields.BuildingNumber[this] = value; }

    [DisplayName("Last Updated"), Expression("coalesce(T0.UpdateDate, T0.InsertDate)"), Insertable(false), Updatable(false)]
    public DateTime? CvUpdatedOn { get => fields.CvUpdatedOn[this]; set => fields.CvUpdatedOn[this] = value; }

    [DisplayName("Qualifications"), MasterDetailRelation(foreignKey: "EmployeeCvId"), NotMapped]
    public List<EmployeeQualificationRow> Qualifications { get => fields.Qualifications[this]; set => fields.Qualifications[this] = value; }

    [DisplayName("Experiences"), MasterDetailRelation(foreignKey: "EmployeeCvId"), NotMapped]
    public List<EmployeeExperienceRow> Experiences { get => fields.Experiences[this]; set => fields.Experiences[this] = value; }

    [DisplayName("Courses"), MasterDetailRelation(foreignKey: "EmployeeCvId"), NotMapped]
    public List<EmployeeCourseRow> Courses { get => fields.Courses[this]; set => fields.Courses[this] = value; }

    public class RowFields : Serenity.Extensions.Entities.LoggingRowFields
    {
        public Int32Field EmployeeCvId;
        public Int32Field UserId;
        public StringField Username;
        public StringField EmployeeNumber;
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
