using FluentMigrator;

namespace QadeerApp.Migrations.DefaultDB;

[DefaultDB, MigrationKey(20250309_1200)]
public class DefaultDB_20250309_1200_TrainingCalendar : AutoReversingMigration
{
    public override void Up()
    {
        Create.Table("TrainingCalendars")
            .WithColumn("TrainingCalendarId").AsInt32().IdentityKey(this)
            .WithColumn("TrainingTermId").AsInt32().NotNullable()
            .WithColumn("Name").AsString(200).NotNullable()
            .WithColumn("StartDate").AsDate().NotNullable()
            .WithColumn("EndDate").AsDate().NotNullable()
            .WithColumn("IsActive").AsInt16().NotNullable().WithDefaultValue(1)
            .WithColumn("IsEnabled").AsInt16().NotNullable().WithDefaultValue(1)
            .WithColumn("InsertDate").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
            .WithColumn("InsertUserId").AsInt32().NotNullable().WithDefaultValue(1)
            .WithColumn("UpdateDate").AsDateTime().Nullable()
            .WithColumn("UpdateUserId").AsInt32().Nullable()
            .WithColumn("DeleteDate").AsDateTime().Nullable()
            .WithColumn("DeleteUserId").AsInt32().Nullable();

        Create.ForeignKey("FK_TrainingCalendars_TrainingTerms")
            .FromTable("TrainingCalendars").ForeignColumn("TrainingTermId")
            .ToTable("TrainingTerms").PrimaryColumn("TrainingTermId");

        Create.Table("TrainingCalendarBreaks")
            .WithColumn("TrainingCalendarBreakId").AsInt32().IdentityKey(this)
            .WithColumn("TrainingCalendarId").AsInt32().NotNullable()
            .WithColumn("Title").AsString(200).NotNullable().WithDefaultValue("Break")
            .WithColumn("StartDate").AsDate().NotNullable()
            .WithColumn("EndDate").AsDate().NotNullable()
            .WithColumn("IsActive").AsInt16().NotNullable().WithDefaultValue(1)
            .WithColumn("InsertDate").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
            .WithColumn("InsertUserId").AsInt32().NotNullable().WithDefaultValue(1)
            .WithColumn("UpdateDate").AsDateTime().Nullable()
            .WithColumn("UpdateUserId").AsInt32().Nullable()
            .WithColumn("DeleteDate").AsDateTime().Nullable()
            .WithColumn("DeleteUserId").AsInt32().Nullable();

        Create.ForeignKey("FK_TrainingCalendarBreaks_TrainingCalendars")
            .FromTable("TrainingCalendarBreaks").ForeignColumn("TrainingCalendarId")
            .ToTable("TrainingCalendars").PrimaryColumn("TrainingCalendarId");

        Create.Table("TrainingCalendarNotes")
            .WithColumn("TrainingCalendarNoteId").AsInt32().IdentityKey(this)
            .WithColumn("TrainingCalendarId").AsInt32().NotNullable()
            .WithColumn("Title").AsString(200).NotNullable()
            .WithColumn("NoteText").AsString(500).Nullable()
            .WithColumn("NoteDate").AsDate().NotNullable()
            .WithColumn("IsActive").AsInt16().NotNullable().WithDefaultValue(1)
            .WithColumn("InsertDate").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
            .WithColumn("InsertUserId").AsInt32().NotNullable().WithDefaultValue(1)
            .WithColumn("UpdateDate").AsDateTime().Nullable()
            .WithColumn("UpdateUserId").AsInt32().Nullable()
            .WithColumn("DeleteDate").AsDateTime().Nullable()
            .WithColumn("DeleteUserId").AsInt32().Nullable();

        Create.ForeignKey("FK_TrainingCalendarNotes_TrainingCalendars")
            .FromTable("TrainingCalendarNotes").ForeignColumn("TrainingCalendarId")
            .ToTable("TrainingCalendars").PrimaryColumn("TrainingCalendarId");
    }
}
