namespace QadeerApp.Administration.Forms;

[FormScript("Administration.TrainingTerm")]
[BasedOnRow(typeof(TrainingTermRow), CheckNames = true)]
public class TrainingTermForm
{
    public string Name { get; set; }
    public bool IsActive { get; set; }
}
