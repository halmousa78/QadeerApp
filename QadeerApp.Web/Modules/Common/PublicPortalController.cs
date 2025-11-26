using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QadeerApp.Administration;
using Serenity.Data;
using Serenity.Services;
using System.Linq;

namespace QadeerApp.Common.Pages;

[AllowAnonymous]
public class PublicPortalController : Controller
{
    private readonly ISqlConnections sqlConnections;

    public PublicPortalController(ISqlConnections sqlConnections)
    {
        this.sqlConnections = sqlConnections ?? throw new ArgumentNullException(nameof(sqlConnections));
    }

    [Route("Public/Portal")]
    public ActionResult Index()
    {
        var model = BuildCalendarViewModel();
        return View("~/Views/Public/Portal.cshtml", model);
    }

    private PortalCalendarViewModel BuildCalendarViewModel()
    {
        using var connection = sqlConnections.NewByKey("Default");

        var activeCalendar = connection.List<TrainingCalendarRow>(q =>
        {
            var f = TrainingCalendarRow.Fields;
            q.SelectTableFields()
             .Where(f.IsActive == (short)1 & f.IsEnabled == (short)1)
             .OrderBy(f.StartDate, true);
        }).FirstOrDefault();

        var links = connection.List<PortalLinkRow>(q =>
        {
            var f = PortalLinkRow.Fields;
            q.SelectTableFields()
             .Select(f.DepartmentName)
             .Select(f.SpecializationName)
             .Where(f.IsActive == (short)1)
             .OrderBy(f.DepartmentName)
             .OrderBy(f.SpecializationName)
             .OrderBy(f.DisplayOrder);
        });

        var groupedLinks = links
            .GroupBy(l =>
            {
                var dept = l.DepartmentName ?? string.Empty;
                var spec = l.SpecializationName;
                return string.IsNullOrWhiteSpace(spec) ? dept : $"{dept} - {spec}";
            })
            .Select(g => new PortalLinkSection
            {
                Title = g.Key,
                Links = g.Select(x => new PortalLinkItem
                {
                    Title = x.Title,
                    Url = x.Url,
                    DepartmentName = x.DepartmentName,
                    SpecializationName = x.SpecializationName
                }).ToList()
            })
            .ToList();

        if (activeCalendar == null)
        {
            return new PortalCalendarViewModel
            {
                HasCalendar = false,
                LinkSections = groupedLinks
            };
        }

        var breaks = connection.List<TrainingCalendarBreakRow>(q =>
        {
            var f = TrainingCalendarBreakRow.Fields;
            q.SelectTableFields()
             .Where(f.TrainingCalendarId == activeCalendar.TrainingCalendarId.Value & f.IsActive == (short)1)
             .OrderBy(f.StartDate);
        });

        var notes = connection.List<TrainingCalendarNoteRow>(q =>
        {
            var f = TrainingCalendarNoteRow.Fields;
            q.SelectTableFields()
             .Where(f.TrainingCalendarId == activeCalendar.TrainingCalendarId.Value & f.IsActive == (short)1)
             .OrderBy(f.NoteDate);
        });

        var trainingDays = new List<PortalTrainingDay>();
        var startDate = activeCalendar.StartDate.Value.Date;
        var endDate = activeCalendar.EndDate.Value.Date;

        DateTime cursor = startDate;
        while (cursor <= endDate)
        {
            var isWeekend = cursor.DayOfWeek is DayOfWeek.Friday or DayOfWeek.Saturday;
            var isBreak = breaks.Any(b => cursor >= b.StartDate.Value.Date && cursor <= b.EndDate.Value.Date);

            if (!isWeekend && !isBreak)
            {
                var note = notes.FirstOrDefault(n => n.NoteDate.Value.Date == cursor);
                trainingDays.Add(new PortalTrainingDay
                {
                    Date = cursor,
                    NoteTitle = note?.Title,
                    NoteText = note?.NoteText
                });
            }

            cursor = cursor.AddDays(1);
        }

        var weeks = new List<PortalCalendarWeek>();
        PortalCalendarWeek currentWeek = null;
        foreach (var day in trainingDays)
        {
            var isSunday = day.Date.DayOfWeek == DayOfWeek.Sunday;
            if (currentWeek == null || (isSunday && currentWeek.Days.Count > 0) || currentWeek.Days.Count >= 5)
            {
                currentWeek = new PortalCalendarWeek
                {
                    WeekNumber = weeks.Count + 1
                };
                weeks.Add(currentWeek);
            }

            currentWeek.Days.Add(day);
        }

        var breakModels = breaks.Select(b => new PortalCalendarBreak
        {
            Title = b.Title,
            StartDate = b.StartDate.Value.Date,
            EndDate = b.EndDate.Value.Date
        }).ToList();

        return new PortalCalendarViewModel
        {
            CalendarName = activeCalendar.Name,
            StartDate = startDate,
            EndDate = endDate,
            Weeks = weeks,
            Breaks = breakModels,
            HasCalendar = activeCalendar.IsEnabled == (short)1 && activeCalendar.IsActive == (short)1,
            LinkSections = groupedLinks
        };
    }

    public class PortalCalendarViewModel
    {
        public string CalendarName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public List<PortalCalendarWeek> Weeks { get; set; } = new();
        public List<PortalCalendarBreak> Breaks { get; set; } = new();
        public bool HasCalendar { get; set; }
        public List<PortalLinkSection> LinkSections { get; set; } = new();
    }

    public class PortalCalendarWeek
    {
        public int WeekNumber { get; set; }
        public List<PortalTrainingDay> Days { get; set; } = new();
    }

    public class PortalTrainingDay
    {
        public DateTime Date { get; set; }
        public string NoteTitle { get; set; }
        public string NoteText { get; set; }
    }

    public class PortalCalendarBreak
    {
        public string Title { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class PortalLinkSection
    {
        public string Title { get; set; }
        public List<PortalLinkItem> Links { get; set; } = new();
    }

    public class PortalLinkItem
    {
        public string Title { get; set; }
        public string Url { get; set; }
        public string DepartmentName { get; set; }
        public string SpecializationName { get; set; }
    }
}
