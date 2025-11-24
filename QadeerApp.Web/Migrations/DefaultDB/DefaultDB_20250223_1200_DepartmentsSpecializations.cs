using FluentMigrator;

namespace QadeerApp.Migrations.DefaultDB;

[DefaultDB, MigrationKey(20250223_1200)]
public class DefaultDB_20250223_1200_DepartmentsSpecializations : AutoReversingMigration
{
    public override void Up()
    {
        Create.Table("Departments")
            .WithColumn("DepartmentId").AsInt32().IdentityKey(this)
            .WithColumn("Name").AsString(200).NotNullable()
            .WithColumn("IsActive").AsInt16().NotNullable().WithDefaultValue(1)
            .WithColumn("InsertDate").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
            .WithColumn("InsertUserId").AsInt32().NotNullable().WithDefaultValue(1)
            .WithColumn("UpdateDate").AsDateTime().Nullable()
            .WithColumn("UpdateUserId").AsInt32().Nullable()
            .WithColumn("DeleteDate").AsDateTime().Nullable()
            .WithColumn("DeleteUserId").AsInt32().Nullable();

        Insert.IntoTable("Departments").Row(new
        {
            Name = "Default",
            IsActive = 1,
            InsertDate = SystemMethods.CurrentDateTime,
            InsertUserId = 1
        });

        Create.Index("UQ_Departments_Name")
            .OnTable("Departments")
            .OnColumn("Name").Ascending()
            .WithOptions().Unique();

        Create.Table("Specializations")
            .WithColumn("SpecializationId").AsInt32().IdentityKey(this)
            .WithColumn("DepartmentId").AsInt32().NotNullable()
                .ForeignKey("FK_Specializations_DepartmentId", "Departments", "DepartmentId")
            .WithColumn("Name").AsString(200).NotNullable()
            .WithColumn("IsActive").AsInt16().NotNullable().WithDefaultValue(1)
            .WithColumn("InsertDate").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
            .WithColumn("InsertUserId").AsInt32().NotNullable().WithDefaultValue(1)
            .WithColumn("UpdateDate").AsDateTime().Nullable()
            .WithColumn("UpdateUserId").AsInt32().Nullable()
            .WithColumn("DeleteDate").AsDateTime().Nullable()
            .WithColumn("DeleteUserId").AsInt32().Nullable();

        Create.Index("UQ_Specializations_DepartmentId_Name")
            .OnTable("Specializations")
            .OnColumn("DepartmentId").Ascending()
            .OnColumn("Name").Ascending()
            .WithOptions().Unique();

        Alter.Table("Users")
            .AddColumn("DepartmentId").AsInt32().NotNullable().WithDefaultValue(1)
                .ForeignKey("FK_Users_DepartmentId", "Departments", "DepartmentId")
            .AddColumn("SpecializationId").AsInt32().Nullable()
                .ForeignKey("FK_Users_SpecializationId", "Specializations", "SpecializationId");
    }
}
