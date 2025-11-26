namespace QadeerApp.Cv;

[ConnectionKey("Default"), Module("Cv"), TableName("EmployeeExperiences")]
[DisplayName("Employee Experiences"), InstanceName("Experience")]
[ReadPermission(CvPermissionKeys.EmployeeExperience.View)]
[ModifyPermission(CvPermissionKeys.EmployeeExperience.Update)]
[InsertPermission(CvPermissionKeys.EmployeeExperience.Insert)]
[UpdatePermission(CvPermissionKeys.EmployeeExperience.Update)]
[DeletePermission(CvPermissionKeys.EmployeeExperience.Delete)]
public sealed class EmployeeExperienceRow : Serenity.Extensions.Entities.LoggingRow<EmployeeExperienceRow.RowFields>, IIdRow, INameRow
{
    [DisplayName("Experience Id"), Identity, IdProperty]
    public int? EmployeeExperienceId { get => fields.EmployeeExperienceId[this]; set => fields.EmployeeExperienceId[this] = value; }

    [DisplayName("Employee CV"), NotNull, ForeignKey(typeof(EmployeeCvRow)), LeftJoin("cv"), Updatable(false)]
    public int? EmployeeCvId { get => fields.EmployeeCvId[this]; set => fields.EmployeeCvId[this] = value; }

    [DisplayName("Experience Name"), Size(200), NotNull, QuickSearch, NameProperty]
    public string Name { get => fields.Name[this]; set => fields.Name[this] = value; }

    [DisplayName("User Id"), Expression("cv.[UserId]")]
    public int? UserId { get => fields.UserId[this]; set => fields.UserId[this] = value; }

    public class RowFields : Serenity.Extensions.Entities.LoggingRowFields
    {
        public Int32Field EmployeeExperienceId;
        public Int32Field EmployeeCvId;
        public StringField Name;
        public Int32Field UserId;
    }
}
