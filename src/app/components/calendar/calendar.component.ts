import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CalendarMonth, CalendarSpot, YearPlan } from '../../interfaces';
import { CalendarHeaderComponent } from '../calendar-header/calendar-header.component';
import { CalendarFooterComponent } from '../calendar-footer/calendar-footer.component';
import { EventsListComponent } from '../events-list/events-list.component';
import { PublicHolidayListComponent } from '../public-holiday-list/public-holiday-list.component';

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

  months: CalendarMonth[] = [];
  weekdayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekdaySpots: null[] = [];


  ngOnChanges(changes: SimpleChanges) {
    if (changes['plan']) {
      this.generateYearCalendar();
    }
  }

  generateYearCalendar(): void {
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
  }

  isWeekend(dayIndex: number): boolean {
    return [0, 6].includes(dayIndex % 7);
  }

  get hasEvents(): boolean {
    return this.plan.events.length > 0;
  }
}
