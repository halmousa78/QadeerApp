using FluentMigrator;

namespace QadeerApp.Migrations.DefaultDB;

[DefaultDB, MigrationKey(20250306_1400)]
public class DefaultDB_20250306_1400_TrainingGrades : AutoReversingMigration
{
    public override void Up()
    {
        Create.Table("TrainingGrades")
            .WithColumn("TrainingGradeId").AsInt32().IdentityKey(this)
            .WithColumn("Grade").AsString(50).Nullable()
            .WithColumn("TrainerName").AsString(200).Nullable()
            .WithColumn("TrainerNumber").AsString(100).Nullable()
            .WithColumn("ReferenceNumber").AsString(100).Nullable()
            .WithColumn("ScheduleType").AsString(100).Nullable()
            .WithColumn("CourseName").AsString(200).Nullable()
            .WithColumn("CourseCode").AsString(100).Nullable()
            .WithColumn("Specialization").AsString(200).Nullable()
            .WithColumn("Department").AsString(200).Nullable()
            .WithColumn("TrainingLevel").AsString(100).Nullable()
            .WithColumn("TrainingTerm").AsString(200).Nullable()
            .WithColumn("InsertDate").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
            .WithColumn("InsertUserId").AsInt32().NotNullable().WithDefaultValue(1)
            .WithColumn("UpdateDate").AsDateTime().Nullable()
            .WithColumn("UpdateUserId").AsInt32().Nullable()
            .WithColumn("DeleteDate").AsDateTime().Nullable()
            .WithColumn("DeleteUserId").AsInt32().Nullable();
    }
}
