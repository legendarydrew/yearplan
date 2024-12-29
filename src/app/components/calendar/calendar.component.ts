import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CalendarMonth, CalendarSpot, PublicHoliday, YearPlan } from '../../interfaces';
import { CalendarHeaderComponent } from '../calendar-header/calendar-header.component';
import { CalendarFooterComponent } from '../calendar-footer/calendar-footer.component';
import { EventsListComponent } from '../events-list/events-list.component';
import { PublicHolidayListComponent } from '../public-holiday-list/public-holiday-list.component';
import { PublicHolidaysService } from '../../services/public-holidays.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  imports: [
    CalendarHeaderComponent,
    CalendarFooterComponent,
    EventsListComponent,
    PublicHolidayListComponent
  ],
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnChanges {
  @Input() plan!: YearPlan;

  holidays: { [key: number]: PublicHoliday[] } = {};
  months: CalendarMonth[] = [];
  weekdayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekdaySpots: null[] = [];

  constructor(private readonly Holidays: PublicHolidaysService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['plan']) {
      this.generateYearCalendar();
    }
  }

  generateYearCalendar(): void {
    // Before building the calendar, attempt to fetch a list of public holidays.
    this.Holidays.fetch()
      .pipe(catchError((err) => of({})))
      .subscribe({
        next: (holidays) => {
          this.holidays = holidays;
          // Regardless of whether we have public holidays, build the calendar with what we have.
          this.buildCalendar();
        }
      });
  }

  protected buildCalendar(): void {
    const currentYear = this.plan.year;
    let spotCount = 0;
    let months: CalendarMonth[] = [];

    for (let month = 0; month < 12; month++) {
      const days: CalendarSpot[] = [];
      const firstDayOfMonth = new Date(currentYear, month, 1).getDay();
      const daysInMonth = new Date(currentYear, month + 1, 0).getDate();

      // Add empty slots for days before the first of the month
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push({ date: null, hasEvent: false });
      }

      // Add the days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        days.push({ date: day, hasEvent: false }); // Modify "hasEvent" logic if needed
      }

      months.push({
        name: new Date(currentYear, month).toLocaleString('default', { month: 'long' }),
        days
      });

      spotCount = Math.max(spotCount, days.length);
    }

    this.months = months;
    this.weekdaySpots = Array(spotCount);

    this.matchEventsToSpots();
    this.matchHolidaysToSpots();
  }

  isWeekend(dayIndex: number): boolean {
    return [0, 6].includes(dayIndex % 7);
  }

  get hasEvents(): boolean {
    return this.plan.events.length > 0 || this.holidays[this.plan.year]?.length > 0;
  }

  matchEventsToSpots(): void {
    this.plan.events.forEach((event) => {
      const matchingDays = this.months[event.start.month].days.filter((day) => {
        if (day.date) {
          if (event.end.day && event.end.month) {
            return event.start.day <= day.date && event.end.day >= day.date;
          } else {
            return event.start.day === day.date;
          }
          // TODO address events that span more than one month.
        }
        return false;
      });
      matchingDays.forEach((day) => {
        day.hasEvent = true;
        day.events = day.events ?? [];
        day.events.push(event.name);
      });
    });
  }

  matchHolidaysToSpots(): void {
    if (!this.holidays[this.plan.year]) {
      return;
    }

    this.holidays[this.plan.year].forEach((event: PublicHoliday) => {
      const matchingDay = this.months[event.month].days.find((day) => event.day === day.date);
      if (matchingDay) {
        matchingDay.hasHoliday = true;
        matchingDay.events = matchingDay.events ?? [];
        matchingDay.events.unshift(event.title);
      }
    });
  }
}
