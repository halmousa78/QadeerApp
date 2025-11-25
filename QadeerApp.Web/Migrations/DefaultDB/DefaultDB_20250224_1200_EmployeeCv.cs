using FluentMigrator;
using System.Data;

namespace QadeerApp.Migrations.DefaultDB;

[DefaultDB, MigrationKey(20250224_1200)]
public class DefaultDB_20250224_1200_EmployeeCv : AutoReversingMigration
{
    public override void Up()
    {
        Create.Table("EmployeeCvs")
            .WithColumn("EmployeeCvId").AsInt32().IdentityKey(this)
            .WithColumn("UserId").AsInt32().NotNullable()
                .ForeignKey("FK_EmployeeCvs_UserId", "Users", "UserId")
            .WithColumn("Mobile").AsString(20).NotNullable()
            .WithColumn("EnglishLevel").AsInt16().NotNullable()
            .WithColumn("Address").AsString(500).NotNullable()
            .WithColumn("ExtensionNumber").AsString(8).NotNullable()
            .WithColumn("OfficeNumber").AsString(50).NotNullable()
            .WithColumn("BuildingNumber").AsString(50).NotNullable()
            .WithColumn("InsertDate").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
            .WithColumn("InsertUserId").AsInt32().NotNullable().WithDefaultValue(1)
            .WithColumn("UpdateDate").AsDateTime().Nullable()
            .WithColumn("UpdateUserId").AsInt32().Nullable()
            .WithColumn("DeleteDate").AsDateTime().Nullable()
            .WithColumn("DeleteUserId").AsInt32().Nullable();

        Create.Index("UQ_EmployeeCvs_UserId")
            .OnTable("EmployeeCvs")
            .OnColumn("UserId").Ascending()
            .WithOptions().Unique();

        Create.Table("EmployeeQualifications")
            .WithColumn("EmployeeQualificationId").AsInt32().IdentityKey(this)
            .WithColumn("EmployeeCvId").AsInt32().NotNullable()
                .ForeignKey("FK_EmployeeQualifications_EmployeeCvId", "EmployeeCvs", "EmployeeCvId").OnDeleteOrUpdate(Rule.Cascade)
            .WithColumn("Name").AsString(200).NotNullable()
            .WithColumn("InsertDate").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
            .WithColumn("InsertUserId").AsInt32().NotNullable().WithDefaultValue(1)
            .WithColumn("UpdateDate").AsDateTime().Nullable()
            .WithColumn("UpdateUserId").AsInt32().Nullable()
            .WithColumn("DeleteDate").AsDateTime().Nullable()
            .WithColumn("DeleteUserId").AsInt32().Nullable();

        Create.Table("EmployeeExperiences")
            .WithColumn("EmployeeExperienceId").AsInt32().IdentityKey(this)
            .WithColumn("EmployeeCvId").AsInt32().NotNullable()
                .ForeignKey("FK_EmployeeExperiences_EmployeeCvId", "EmployeeCvs", "EmployeeCvId").OnDeleteOrUpdate(Rule.Cascade)
            .WithColumn("Name").AsString(200).NotNullable()
            .WithColumn("InsertDate").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
            .WithColumn("InsertUserId").AsInt32().NotNullable().WithDefaultValue(1)
            .WithColumn("UpdateDate").AsDateTime().Nullable()
            .WithColumn("UpdateUserId").AsInt32().Nullable()
            .WithColumn("DeleteDate").AsDateTime().Nullable()
            .WithColumn("DeleteUserId").AsInt32().Nullable();

        Create.Table("EmployeeCourses")
            .WithColumn("EmployeeCourseId").AsInt32().IdentityKey(this)
            .WithColumn("EmployeeCvId").AsInt32().NotNullable()
                .ForeignKey("FK_EmployeeCourses_EmployeeCvId", "EmployeeCvs", "EmployeeCvId").OnDeleteOrUpdate(Rule.Cascade)
            .WithColumn("Name").AsString(200).NotNullable()
            .WithColumn("InsertDate").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
            .WithColumn("InsertUserId").AsInt32().NotNullable().WithDefaultValue(1)
            .WithColumn("UpdateDate").AsDateTime().Nullable()
            .WithColumn("UpdateUserId").AsInt32().Nullable()
            .WithColumn("DeleteDate").AsDateTime().Nullable()
            .WithColumn("DeleteUserId").AsInt32().Nullable();
    }
}
