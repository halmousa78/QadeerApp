using FluentMigrator;

namespace QadeerApp.Migrations.DefaultDB;

[DefaultDB, MigrationKey(20250306_1200)]
public class DefaultDB_20250306_1200_TrainingTerms : AutoReversingMigration
{
    public override void Up()
    {
        Create.Table("TrainingTerms")
            .WithColumn("TrainingTermId").AsInt32().IdentityKey(this)
            .WithColumn("Name").AsString(200).NotNullable()
            .WithColumn("IsActive").AsInt16().NotNullable().WithDefaultValue(1)
            .WithColumn("InsertDate").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
            .WithColumn("InsertUserId").AsInt32().NotNullable().WithDefaultValue(1)
            .WithColumn("UpdateDate").AsDateTime().Nullable()
            .WithColumn("UpdateUserId").AsInt32().Nullable()
            .WithColumn("DeleteDate").AsDateTime().Nullable()
            .WithColumn("DeleteUserId").AsInt32().Nullable();

        Create.Index("UQ_TrainingTerms_Name")
            .OnTable("TrainingTerms")
            .OnColumn("Name").Ascending()
            .WithOptions().Unique();
    }
}
