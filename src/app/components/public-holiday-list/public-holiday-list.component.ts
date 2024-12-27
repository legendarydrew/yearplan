import { Component, Input } from '@angular/core';
import { PublicHoliday } from '../../interfaces';

@Component({
  selector: 'app-public-holiday-list',
  standalone: true,
  imports: [],
  templateUrl: './public-holiday-list.component.html',
  styleUrl: './public-holiday-list.component.css'
})
export class PublicHolidayListComponent {
  @Input() events: PublicHoliday[] = [];

  getEventDate(event: PublicHoliday) {
    const date = new Date();
    date.setMonth(event.month);
    date.setDate(event.day);
    return date.toLocaleString('default', { month: 'short', day: '2-digit' });
  }

  getEventName(event: PublicHoliday) {
    return event.title.split(' ').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  }
}
