namespace QadeerApp.Cv;

[ConnectionKey("Default"), Module("Cv"), TableName("EmployeeCourses")]
[DisplayName("Employee Courses"), InstanceName("Course")]
[ReadPermission(CvPermissionKeys.EmployeeCourse.View)]
[ModifyPermission(CvPermissionKeys.EmployeeCourse.Update)]
[InsertPermission(CvPermissionKeys.EmployeeCourse.Insert)]
[UpdatePermission(CvPermissionKeys.EmployeeCourse.Update)]
[DeletePermission(CvPermissionKeys.EmployeeCourse.Delete)]
public sealed class EmployeeCourseRow : Serenity.Extensions.Entities.LoggingRow<EmployeeCourseRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Course Id"), Identity, IdProperty]
    public int? EmployeeCourseId { get => fields.EmployeeCourseId[this]; set => fields.EmployeeCourseId[this] = value; }

    [DisplayName("Employee CV"), NotNull, ForeignKey(typeof(EmployeeCvRow)), LeftJoin("cv"), Updatable(false)]
    public int? EmployeeCvId { get => fields.EmployeeCvId[this]; set => fields.EmployeeCvId[this] = value; }

    [DisplayName("Course Name"), Size(200), NotNull, QuickSearch, NameProperty]
    public string Name { get => fields.Name[this]; set => fields.Name[this] = value; }

    [DisplayName("User Id"), Expression("cv.[UserId]")]
    public int? UserId { get => fields.UserId[this]; set => fields.UserId[this] = value; }

    public class RowFields : Serenity.Extensions.Entities.LoggingRowFields
    {
        public Int32Field EmployeeCourseId;
        public Int32Field EmployeeCvId;
        public StringField Name;
        public Int32Field UserId;
    }
}
