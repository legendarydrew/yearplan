import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventsEditorComponent } from './components/events-editor/events-editor.component';
import { CalendarEvent, YearPlan } from './interfaces';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarComponent, EventsEditorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'yearplan';

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

  updateEventsHandler(events: CalendarEvent[]): void {
    this.plan.events = events;
    localStorage.setItem('yp', JSON.stringify(this.plan));
  }
}
