import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventsEditorComponent } from './components/events-editor/events-editor.component';
import { CalendarEvent, PublicHoliday, YearPlan } from './interfaces';
import { PublicHolidaysService } from './services/public-holidays.service';
import { PublicHolidayListComponent } from './components/public-holiday-list/public-holiday-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarComponent, EventsEditorComponent, PublicHolidayListComponent],
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

  constructor(private readonly Holidays: PublicHolidaysService) {
  }

  ngOnInit() {
    // Fetch any saved events from localStorage.
    const yp = localStorage.getItem('yp');
    if (yp) {
      this.plan = { ...this.plan, ...JSON.parse(yp) };
    }

    // Fetch public holidays for the year.
    this.Holidays.fetch(this.plan.year)
      .subscribe({
        next: (events: PublicHoliday[]) => {
          this.publicHolidays = events;
        }
      });
  }

  updateEventsHandler(events: CalendarEvent[]): void {
    this.plan.events = events;
    localStorage.setItem('yp', JSON.stringify(this.plan));
  }
}
