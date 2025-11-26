using FluentMigrator;

namespace QadeerApp.Migrations.DefaultDB;

[DefaultDB, MigrationKey(20250307_1200)]
public class DefaultDB_20250307_1200_TrainingGradesStatuses : AutoReversingMigration
{
    public override void Up()
    {
        Alter.Table("TrainingGrades")
            .AddColumn("RegistrationStatus").AsString(200).Nullable()
            .AddColumn("TraineeStatus").AsString(200).Nullable();
    }
}
