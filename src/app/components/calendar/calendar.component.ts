import { Component, OnInit } from '@angular/core';
import { CalendarMonth, CalendarSpot } from '../../interfaces';

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {

  calendarYear: number;
  months: CalendarMonth[] = [];
  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // TODO use locale names?

  constructor() {
    // Automatically set the year to the current year.
    this.calendarYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.generateYearCalendar();
  }

  generateYearCalendar(): void {
    const currentYear = this.calendarYear;
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

      this.months.push({
        name: new Date(currentYear, month).toLocaleString('default', { month: 'long' }),
        days
      });
    }
  }
}
