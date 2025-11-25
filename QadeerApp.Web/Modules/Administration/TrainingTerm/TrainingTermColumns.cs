namespace QadeerApp.Administration.Columns;

[ColumnsScript("Administration.TrainingTerm")]
[BasedOnRow(typeof(TrainingTermRow), CheckNames = true)]
public class TrainingTermColumns
{
    [EditLink, AlignRight, Width(60)]
    public int TrainingTermId { get; set; }

    [EditLink, Width(200)]
    public string Name { get; set; }

    [Width(80), QuickFilter]
    public short IsActive { get; set; }
}
