import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CalendarEvent } from '../../interfaces';

// @ts-ignore
@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent implements OnChanges {
  @Input() events: CalendarEvent[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['events']) {
      // Display a sorted list of events.
      this.events.sort((a: CalendarEvent, b: CalendarEvent) =>
        a.start.month - b.start.month || a.start.day - b.start.day);
    }
  }

  getEventDate(event: CalendarEvent): string {
    const dates: string[] = [];

    const startDate = new Date();
    startDate.setMonth(event.start.month);
    startDate.setDate(event.start.day);

    dates.push(startDate.toLocaleString('default', { month: 'short', day: '2-digit' }));

    if (event.end.day && event.end.month) {
      const endDate = new Date();
      endDate.setMonth(event.end.month);
      endDate.setDate(event.end.day);
      dates.push(endDate.toLocaleString('default', { month: 'short', day: '2-digit' }));
    }

    return dates.join('-');
  }

}
