import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-calendar-header',
    imports: [],
    templateUrl: './calendar-header.component.html',
    styleUrl: './calendar-header.component.css'
})
export class CalendarHeaderComponent {
  @Input() year!: number;
}
