import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventsEditorComponent } from './components/events-editor/events-editor.component';
import { CalendarEvent } from './interfaces';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarComponent, EventsEditorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'yearplan';

  eventsList: CalendarEvent[] = [];

  ngOnInit() {
    // Fetch any saved events from localStorage.
    const yp = localStorage.getItem('yp');
    this.eventsList = yp ? JSON.parse(yp)['events'] : [];
  }

  updateEventsHandler(events: CalendarEvent[]): void {
    this.eventsList = events;
    localStorage.setItem('yp', JSON.stringify({ events: events }));
  }
}
