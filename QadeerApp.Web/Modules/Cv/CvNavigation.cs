using QadeerApp.Cv;
using CvPages = QadeerApp.Cv.Pages;

[assembly: NavigationMenu(3000, "السيرة الذاتية", icon: "fa-id-card-o")]
[assembly: NavigationLink(3010, "السيرة الذاتية/بياناتي", typeof(CvPages.EmployeeCvPage), icon: "fa-address-card")]
[assembly: NavigationLink(3020, "السيرة الذاتية/تقرير الإكمال", typeof(CvPages.EmployeeCvStatusPage), icon: "fa-flag-checkered", Permission = CvPermissionKeys.Report)]
