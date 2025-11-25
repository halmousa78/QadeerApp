using FluentMigrator;
using System.Data;

namespace QadeerApp.Migrations.DefaultDB;

[DefaultDB, MigrationKey(20250306_1300)]
public class DefaultDB_20250306_1300_TrainingCourses : AutoReversingMigration
{
    public override void Up()
    {
        Create.Table("TrainingCourses")
            .WithColumn("TrainingCourseId").AsInt32().IdentityKey(this)
            .WithColumn("DepartmentId").AsInt32().NotNullable()
                .ForeignKey("FK_TrainingCourses_DepartmentId", "Departments", "DepartmentId")
            .WithColumn("SpecializationId").AsInt32().Nullable()
                .ForeignKey("FK_TrainingCourses_SpecializationId", "Specializations", "SpecializationId")
            .WithColumn("Name").AsString(200).NotNullable()
            .WithColumn("Code").AsString(50).NotNullable()
            .WithColumn("IsActive").AsInt16().NotNullable().WithDefaultValue(1)
            .WithColumn("InsertDate").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
            .WithColumn("InsertUserId").AsInt32().NotNullable().WithDefaultValue(1)
            .WithColumn("UpdateDate").AsDateTime().Nullable()
            .WithColumn("UpdateUserId").AsInt32().Nullable()
            .WithColumn("DeleteDate").AsDateTime().Nullable()
            .WithColumn("DeleteUserId").AsInt32().Nullable();

        Create.Index("IX_TrainingCourses_Department_Specialization")
            .OnTable("TrainingCourses")
            .OnColumn("DepartmentId").Ascending()
            .OnColumn("SpecializationId").Ascending();
    }
}
