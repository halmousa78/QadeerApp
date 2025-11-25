namespace QadeerApp.Cv;

[ConnectionKey("Default"), Module("Cv"), TableName("EmployeeQualifications")]
[DisplayName("مؤهلات الموظف"), InstanceName("مؤهل")]
[ReadPermission("*")]
[ModifyPermission("*")]
public sealed class EmployeeQualificationRow : Serenity.Extensions.Entities.LoggingRow<EmployeeQualificationRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("رقم المؤهل"), Identity, IdProperty]
    public int? EmployeeQualificationId { get => fields.EmployeeQualificationId[this]; set => fields.EmployeeQualificationId[this] = value; }

    [DisplayName("السيرة الذاتية"), NotNull, ForeignKey(typeof(EmployeeCvRow)), LeftJoin("cv"), Updatable(false)]
    public int? EmployeeCvId { get => fields.EmployeeCvId[this]; set => fields.EmployeeCvId[this] = value; }

    [DisplayName("اسم المؤهل"), Size(200), NotNull, QuickSearch, NameProperty]
    public string Name { get => fields.Name[this]; set => fields.Name[this] = value; }

    [DisplayName("اسم الموظف"), Expression("cv.[UserId]")]
    public int? UserId { get => fields.UserId[this]; set => fields.UserId[this] = value; }

    public class RowFields : Serenity.Extensions.Entities.LoggingRowFields
    {
        public Int32Field EmployeeQualificationId;
        public Int32Field EmployeeCvId;
        public StringField Name;
        public Int32Field UserId;
    }
}
