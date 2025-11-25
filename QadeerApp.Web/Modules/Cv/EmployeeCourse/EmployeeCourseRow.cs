namespace QadeerApp.Cv;

[ConnectionKey("Default"), Module("Cv"), TableName("EmployeeCourses")]
[DisplayName("دورات الموظف"), InstanceName("دورة")]
[ReadPermission("*")]
[ModifyPermission("*")]
public sealed class EmployeeCourseRow : Serenity.Extensions.Entities.LoggingRow<EmployeeCourseRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("رقم الدورة"), Identity, IdProperty]
    public int? EmployeeCourseId { get => fields.EmployeeCourseId[this]; set => fields.EmployeeCourseId[this] = value; }

    [DisplayName("السيرة الذاتية"), NotNull, ForeignKey(typeof(EmployeeCvRow)), LeftJoin("cv"), Updatable(false)]
    public int? EmployeeCvId { get => fields.EmployeeCvId[this]; set => fields.EmployeeCvId[this] = value; }

    [DisplayName("اسم الدورة"), Size(200), NotNull, QuickSearch, NameProperty]
    public string Name { get => fields.Name[this]; set => fields.Name[this] = value; }

    [DisplayName("اسم الموظف"), Expression("cv.[UserId]")]
    public int? UserId { get => fields.UserId[this]; set => fields.UserId[this] = value; }

    public class RowFields : Serenity.Extensions.Entities.LoggingRowFields
    {
        public Int32Field EmployeeCourseId;
        public Int32Field EmployeeCvId;
        public StringField Name;
        public Int32Field UserId;
    }
}
