namespace QadeerApp.Administration.Columns;

[ColumnsScript("Administration.TrainingScheduleImport")]
[BasedOnRow(typeof(TrainingScheduleImportRow), CheckNames = true)]
public class TrainingScheduleImportColumns
{
    [EditLink, AlignRight]
    public int TrainingScheduleImportId { get; set; }

    [EditLink, Width(160)]
    public string TrainingTerm { get; set; }

    [Width(140)]
    public string TrainingUnit { get; set; }

    [Width(140)]
    public string Department { get; set; }

    [Width(120)]
    public string TrainingType { get; set; }

    [Width(120)]
    public string TrainerName { get; set; }

    [Width(100)]
    public int TrainerNumber { get; set; }

    [Width(90)]
    public string Day { get; set; }

    [Width(120)]
    public string Time { get; set; }

    [Width(90)]
    public int LectureCount { get; set; }

    [Width(140)]
    public string Course { get; set; }

    [Width(90)]
    public short IsActive { get; set; }
}
