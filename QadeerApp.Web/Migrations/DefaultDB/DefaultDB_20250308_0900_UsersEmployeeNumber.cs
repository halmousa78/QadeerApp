using FluentMigrator;

namespace QadeerApp.Migrations.DefaultDB;

[DefaultDB, MigrationKey(20250308_0900)]
public class DefaultDB_20250308_0900_UsersEmployeeNumber : AutoReversingMigration
{
    public override void Up()
    {
        Alter.Table("Users")
            .AddColumn("EmployeeNumber").AsString(50).Nullable();
    }
}
