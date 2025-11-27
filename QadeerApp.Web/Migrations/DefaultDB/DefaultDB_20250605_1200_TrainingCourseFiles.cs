using FluentMigrator;

namespace QadeerApp.Migrations.DefaultDB;

[DefaultDB, MigrationKey(20250605_1200)]
public class DefaultDB_20250605_1200_TrainingCourseFiles : AutoReversingMigration
{
    public override void Up()
    {
        Create.Table("TrainingCourseFiles")
            .WithColumn("TrainingCourseFileId").AsInt32().IdentityKey(this)
            .WithColumn("TrainingTerm").AsString(200).NotNullable()
            .WithColumn("TrainingUnit").AsString(200).NotNullable()
            .WithColumn("Department").AsString(200).NotNullable()
            .WithColumn("TrainingType").AsString(200).NotNullable()
            .WithColumn("TrainerNumber").AsInt32().NotNullable()
            .WithColumn("TrainerName").AsString(200).NotNullable()
            .WithColumn("Day").AsString(50).NotNullable()
            .WithColumn("Time").AsString(100).NotNullable()
            .WithColumn("LectureCount").AsInt32().NotNullable()
            .WithColumn("Course").AsString(200).NotNullable()
            .WithColumn("CourseDescription").AsString(500).Nullable()
            .WithColumn("LectureDescription").AsString(500).Nullable()
            .WithColumn("ReferenceNumber").AsInt32().Nullable()
            .WithColumn("FromText").AsString(100).Nullable()
            .WithColumn("ToText").AsString(100).Nullable()
            .WithColumn("Building").AsInt32().Nullable()
            .WithColumn("RoomNumber").AsInt32().Nullable()
            .WithColumn("RoomName").AsString(200).Nullable()
            .WithColumn("ContactHours").AsInt32().Nullable()
            .WithColumn("CourseCoordinator").AsString(200).Nullable()
            .WithColumn("IsActive").AsInt16().NotNullable().WithDefaultValue(1)
            .WithColumn("InsertDate").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
            .WithColumn("InsertUserId").AsInt32().NotNullable().WithDefaultValue(1)
            .WithColumn("UpdateDate").AsDateTime().Nullable()
            .WithColumn("UpdateUserId").AsInt32().Nullable()
            .WithColumn("DeleteDate").AsDateTime().Nullable()
            .WithColumn("DeleteUserId").AsInt32().Nullable();
    }
}
