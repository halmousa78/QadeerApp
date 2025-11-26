using FluentMigrator;

namespace QadeerApp.Migrations.DefaultDB;

[DefaultDB, MigrationKey(20250310_1200)]
public class DefaultDB_20250310_1200_Links : AutoReversingMigration
{
    public override void Up()
    {
        Create.Table("PortalLinks")
            .WithColumn("PortalLinkId").AsInt32().IdentityKey(this)
            .WithColumn("Section").AsString(100).NotNullable()
            .WithColumn("Title").AsString(200).NotNullable()
            .WithColumn("Url").AsString(500).NotNullable()
            .WithColumn("DisplayOrder").AsInt32().NotNullable().WithDefaultValue(0)
            .WithColumn("IsActive").AsInt16().NotNullable().WithDefaultValue(1)
            .WithColumn("InsertDate").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
            .WithColumn("InsertUserId").AsInt32().NotNullable().WithDefaultValue(1)
            .WithColumn("UpdateDate").AsDateTime().Nullable()
            .WithColumn("UpdateUserId").AsInt32().Nullable()
            .WithColumn("DeleteDate").AsDateTime().Nullable()
            .WithColumn("DeleteUserId").AsInt32().Nullable();

        Create.Index("IX_PortalLinks_Section_DisplayOrder")
            .OnTable("PortalLinks")
            .OnColumn("Section").Ascending()
            .OnColumn("DisplayOrder").Ascending();
    }
}
