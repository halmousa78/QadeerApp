using FluentMigrator;

namespace QadeerApp.Migrations.DefaultDB;

[DefaultDB, MigrationKey(20250310_1230)]
public class DefaultDB_20250310_1230_LinksDepartment : AutoReversingMigration
{
    public override void Up()
    {
        Alter.Table("PortalLinks")
            .AlterColumn("Section").AsString(100).Nullable()
            .AddColumn("DepartmentId").AsInt32().NotNullable().WithDefaultValue(1)
            .AddColumn("SpecializationId").AsInt32().Nullable();

        Create.ForeignKey("FK_PortalLinks_Department")
            .FromTable("PortalLinks").ForeignColumn("DepartmentId")
            .ToTable("Departments").PrimaryColumn("DepartmentId");

        Create.ForeignKey("FK_PortalLinks_Specialization")
            .FromTable("PortalLinks").ForeignColumn("SpecializationId")
            .ToTable("Specializations").PrimaryColumn("SpecializationId");
    }
}
