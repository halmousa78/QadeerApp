using FluentMigrator;

namespace QadeerApp.Migrations.DefaultDB;

[DefaultDB, MigrationKey(20250306_1600)]
public class DefaultDB_20250306_1600_LanguagesCleanup : Migration
{
    public override void Up()
    {
        Delete.FromTable("Languages").AllRows();

        Insert.IntoTable("Languages").Row(new
        {
            LanguageId = "en",
            LanguageName = "English"
        });

        Insert.IntoTable("Languages").Row(new
        {
            LanguageId = "ar",
            LanguageName = "العربية"
        });
    }

    public override void Down()
    {
        Delete.FromTable("Languages").AllRows();
    }
}
