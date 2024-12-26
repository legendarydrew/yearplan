import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CalendarEvent } from '../../interfaces';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-events-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe
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
  }, this.validate);

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

  protected validate(form: AbstractControl) {
    let errors: {[key: string]: string} = {};
    const startDay = form.value.start.day;
    const startMonth = form.value.start.month;
    const endDay = form.value.end.day ?? startDay;
    const endMonth = form.value.end.month ?? startMonth;
    if (startDay < 1 || startDay > 31) {
      errors['start.day'] = 'Invalid start day.';
    }
    if (startMonth < 1 || startMonth > 12) {
      errors['start.month'] = 'Invalid start month.';
    }

    if (endDay < 1 || endDay > 31) {
      errors['end.day'] = 'Invalid end day.';
    }
    if (endMonth < 1 || endMonth > 12) {
      errors['end.month'] = 'Invalid end month.';
    }
    if (`${endMonth}${endDay}` < `${startMonth}${startDay}`) {
      errors['end'] = 'End must be after or the same as start.';
    }

    return Object.keys(errors).length ? errors : null;
  }
}
