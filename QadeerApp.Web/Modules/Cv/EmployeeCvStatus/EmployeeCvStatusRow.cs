using QadeerApp.Administration;

namespace QadeerApp.Cv;

[ConnectionKey("Default"), Module("Cv"), TableName("Users")]
[DisplayName("تقرير اكتمال السيرة الذاتية"), InstanceName("حالة السيرة الذاتية")]
[ReadPermission(CvPermissionKeys.Report)]
[LeftJoin("cv", "EmployeeCvs", "cv.UserId = T0.UserId")]
public sealed class EmployeeCvStatusRow : Row<EmployeeCvStatusRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("المعرف"), Identity, IdProperty]
    public int? UserId { get => fields.UserId[this]; set => fields.UserId[this] = value; }

    [DisplayName("اسم المستخدم"), Size(100)]
    public string Username { get => fields.Username[this]; set => fields.Username[this] = value; }

    [DisplayName("اسم الموظف"), Size(100), QuickSearch, NameProperty]
    public string DisplayName { get => fields.DisplayName[this]; set => fields.DisplayName[this] = value; }

    [DisplayName("فعال"), Expression("T0.[IsActive]")]
    public short? IsActive { get => fields.IsActive[this]; set => fields.IsActive[this] = value; }

    [DisplayName("القسم"), Expression("d.[Name]")]
    public string DepartmentName { get => fields.DepartmentName[this]; set => fields.DepartmentName[this] = value; }

    [DisplayName("التخصص"), Expression("s.[Name]")]
    public string SpecializationName { get => fields.SpecializationName[this]; set => fields.SpecializationName[this] = value; }

    [DisplayName("السيرة الذاتية"), Expression("cv.[EmployeeCvId]")]
    public int? EmployeeCvId { get => fields.EmployeeCvId[this]; set => fields.EmployeeCvId[this] = value; }

    [DisplayName("مكتملة"), Expression("""
        case
            when cv.[EmployeeCvId] is not null
                 and (select count(1) from EmployeeQualifications q where q.EmployeeCvId = cv.EmployeeCvId) > 0
                 and (select count(1) from EmployeeExperiences e where e.EmployeeCvId = cv.EmployeeCvId) > 0
                 and (select count(1) from EmployeeCourses c where c.EmployeeCvId = cv.EmployeeCvId) > 0
            then 1 else 0 end
        """)]
    public bool? IsCompleted { get => fields.IsCompleted[this]; set => fields.IsCompleted[this] = value; }

    [DisplayName("آخر تحديث"), Expression("coalesce(cv.[UpdateDate], cv.[InsertDate])")]
    public DateTime? CvUpdatedOn { get => fields.CvUpdatedOn[this]; set => fields.CvUpdatedOn[this] = value; }

    [DisplayName("عدد المؤهلات"), Expression("(select count(1) from EmployeeQualifications q where q.EmployeeCvId = cv.EmployeeCvId)")]
    public int? QualificationCount { get => fields.QualificationCount[this]; set => fields.QualificationCount[this] = value; }

    [DisplayName("عدد الخبرات"), Expression("(select count(1) from EmployeeExperiences e where e.EmployeeCvId = cv.EmployeeCvId)")]
    public int? ExperienceCount { get => fields.ExperienceCount[this]; set => fields.ExperienceCount[this] = value; }

    [DisplayName("عدد الدورات"), Expression("(select count(1) from EmployeeCourses c where c.EmployeeCvId = cv.EmployeeCvId)")]
    public int? CourseCount { get => fields.CourseCount[this]; set => fields.CourseCount[this] = value; }

    [DisplayName("القسم"), ForeignKey(typeof(DepartmentRow)), LeftJoin("d"), Insertable(false), Updatable(false)]
    public int? DepartmentId { get => fields.DepartmentId[this]; set => fields.DepartmentId[this] = value; }

    [DisplayName("التخصص"), ForeignKey(typeof(SpecializationRow)), LeftJoin("s"), Insertable(false), Updatable(false)]
    public int? SpecializationId { get => fields.SpecializationId[this]; set => fields.SpecializationId[this] = value; }

    public class RowFields : RowFieldsBase
    {
        public Int32Field UserId;
        public StringField Username;
        public StringField DisplayName;
        public Int16Field IsActive;
        public StringField DepartmentName;
        public StringField SpecializationName;
        public Int32Field DepartmentId;
        public Int32Field SpecializationId;
        public Int32Field EmployeeCvId;
        public BooleanField IsCompleted;
        public DateTimeField CvUpdatedOn;
        public Int32Field QualificationCount;
        public Int32Field ExperienceCount;
        public Int32Field CourseCount;

        public RowFields() : base("Users")
        {
            LocalTextPrefix = "Cv.EmployeeCvStatus";
        }
    }
}
