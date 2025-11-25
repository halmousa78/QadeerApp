using FluentMigrator;

namespace QadeerApp.Migrations.DefaultDB;

[DefaultDB, MigrationKey(20250306_1500)]
public class DefaultDB_20250306_1500_TrainingGradesIsActive : AutoReversingMigration
{
    public override void Up()
    {
        Alter.Table("TrainingGrades")
            .AddColumn("IsActive").AsInt16().NotNullable().WithDefaultValue(1);
    }
}
