using QadeerApp.Cv;
using CvPages = QadeerApp.Cv.Pages;

[assembly: NavigationMenu(3000, "CV", icon: "fa-id-card-o")]
[assembly: NavigationLink(3010, "CV/My Profile", typeof(CvPages.EmployeeCvPage), icon: "fa-address-card")]
[assembly: NavigationLink(3020, "CV/Completion Report", typeof(CvPages.EmployeeCvStatusPage), icon: "fa-flag-checkered", Permission = CvPermissionKeys.Report)]
