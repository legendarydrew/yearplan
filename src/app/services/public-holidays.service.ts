import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncSubject, Observable } from 'rxjs';
import { GovUkHolidayResponse, PublicHoliday } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PublicHolidaysService {

  private holidays$?: AsyncSubject<{ [key: number]: PublicHoliday[] }>;

  readonly regions: string[] = ['england-and-wales'];

  constructor(private readonly http: HttpClient) {
  }

  fetch(): Observable<{ [key: number]: PublicHoliday[] }> {
    if (!this.holidays$) {

      this.holidays$ = new AsyncSubject<{ [key: number]: PublicHoliday[] }>()

      this.http.get<GovUkHolidayResponse>('https://www.gov.uk/bank-holidays.json')
        .subscribe({
          next: ((response: any) => {
            const holidays: { [key: number]: PublicHoliday[] } = {};

            this.extractHolidays(response, holidays);
            this.holidays$!.next(holidays);
            this.holidays$!.complete();
          })
        });
    }

    return this.holidays$;
  }

  private extractHolidays(response: any, holidays: { [p: number]: PublicHoliday[] }) {
    this.regions.forEach((region: string) => {
      let events = response[region]['events'] ?? [];
      events.forEach((row: any) => {
        let [year, month, day] = row.date.split('-').map((v: string) => parseInt(v));
        holidays[year] = holidays[year] ?? [];
        holidays[year].push({
          title: row.title.split(' ').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
          day,
          month: month - 1
        });
      });

    });
  }
}
