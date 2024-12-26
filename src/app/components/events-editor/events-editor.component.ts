import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CalendarEvent } from '../../interfaces';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-events-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './events-editor.component.html',
  styleUrl: './events-editor.component.css'
})
export class EventsEditorComponent implements OnChanges {
  @Input() events: CalendarEvent[] = [];
  @Output() eventsUpdate = new EventEmitter<CalendarEvent[]>();

  protected form: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    start: new FormGroup({
      day: new FormControl(null),
      month: new FormControl(null)
    }),
    end: new FormGroup({
      day: new FormControl(null),
      month: new FormControl(null)
    })
  });
  // TODO form validation.

  protected eventsList: CalendarEvent[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['events']) {
      this.eventsList = structuredClone<CalendarEvent[]>(this.events);
    }
  }

  addHandler(): void {
    if (this.form.invalid) {
      return;
    }

    this.eventsList.push(this.form.value);
    this.eventsUpdate.emit(this.eventsList);
    this.form.reset();
  }

  updateHandler(index: number): void {
    this.eventsList[index] = this.form.value;
    this.eventsUpdate.emit(this.eventsList);
  }

  removeHandler(index: number): void {
    this.eventsList.splice(index, 1);
    this.eventsUpdate.emit(this.eventsList);
  }
}
