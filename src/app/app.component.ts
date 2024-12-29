import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventsEditorComponent } from './components/events-editor/events-editor.component';
import { CalendarEvent, PublicHoliday, YearPlan } from './interfaces';
import { PublicHolidayListComponent } from './components/public-holiday-list/public-holiday-list.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { YearSelectComponent } from './components/year-select/year-select.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarComponent, EventsEditorComponent, PublicHolidayListComponent, EventsListComponent, YearSelectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'yearplan';

  publicHolidays: PublicHoliday[] = [];

  plan: YearPlan = {
    year: (new Date()).getFullYear(),
    events: []
  };

  ngOnInit() {
    // Fetch any saved events from localStorage.
    const yp = localStorage.getItem('yp');
    if (yp) {
      this.plan = { ...this.plan, ...JSON.parse(yp) };
    }
  }

  /**
   * Called when the year is updated from the year-select component.
   * @param year
   */
  updateYearHandler(year: number): void {
    this.plan = { ...this.plan, year };
    localStorage.setItem('yp', JSON.stringify(this.plan));
  }

  /**
   * Called when the list of events is updated from the events-editor component.
   * @param events
   */
  updateEventsHandler(events: CalendarEvent[]): void {
    this.plan = { ...this.plan, events };
    localStorage.setItem('yp', JSON.stringify(this.plan));
  }

  printHandler(): void {
    window.print();
  }
}
