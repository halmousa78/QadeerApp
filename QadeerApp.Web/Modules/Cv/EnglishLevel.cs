namespace QadeerApp.Cv;

[EnumKey("Cv.EnglishLevel")]
public enum EnglishLevel
{
    [Description("ضعيف")]
    Weak = 1,
    [Description("جيد")]
    Good = 2,
    [Description("جيد جدا")]
    VeryGood = 3,
    [Description("ممتاز")]
    Excellent = 4
}
