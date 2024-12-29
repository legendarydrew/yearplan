import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncSubject, Observable } from 'rxjs';
import { PublicHoliday } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PublicHolidaysService {

  private holidays$?: AsyncSubject<{ [key: number]: PublicHoliday[] }>;

  constructor(private readonly http: HttpClient) {
  }

  fetch(): Observable<{ [key: number]: PublicHoliday[] }> {
    if (!this.holidays$) {

      this.holidays$ = new AsyncSubject<{ [key: number]: PublicHoliday[] }>()

      this.http.get('https://www.gov.uk/bank-holidays.json')
        .subscribe({
          next: ((response: any) => {
            const holidays: { [key: number]: PublicHoliday[] } = {};
            let events = response['england-and-wales']['events'];
            events.forEach((row: any) => {
              let [year, month, day] = row.date.split('-').map((v: string) => parseInt(v));
              holidays[year] = holidays[year] ?? [];
              holidays[year].push({
                title: row.title, day, month
              });
            });
            this.holidays$!.next(holidays);
            this.holidays$!.complete();
          })
        });
    }

    return this.holidays$;
  }
}
