import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-year-select',
    imports: [
        FormsModule
    ],
    templateUrl: './year-select.component.html',
    styleUrl: './year-select.component.css'
})
export class YearSelectComponent implements OnInit {
  @Input() year?: number;
  @Output() yearUpdate = new EventEmitter<number>();

  protected years: number[] = [];

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 3; i++) {
      this.years.push(currentYear + i);
    }
  }

  updateHandler(): void {
    this.yearUpdate.emit(this.year);
  }
}
