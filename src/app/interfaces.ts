export interface CalendarSpot {
  date: number|null;
  hasEvent: boolean;
}

export interface CalendarMonth {
  name: string;
  days: CalendarSpot[];
}
