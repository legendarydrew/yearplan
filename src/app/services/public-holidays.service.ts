import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { GovUkEvent, PublicHoliday } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PublicHolidaysService {

  constructor(private readonly http: HttpClient) {
  }

  fetch(year: number): Observable<PublicHoliday[]> {
    return this.http.get('https://www.gov.uk/bank-holidays.json')
      .pipe(switchMap((response: any) => {
        let events = response['england-and-wales']['events']
          .filter((event: GovUkEvent) => event.date.includes(year.toString()))
          .map((row: any) => {
            let [_, month, day] = row.date.split('-').map((v: string) => parseInt(v));
            return {
              name: row.title, day, month
            };
          });
        return of(events);
      }));
  }
}
