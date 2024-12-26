export interface CalendarSpot {
  date: number|null;
  hasEvent: boolean;
}

export interface CalendarMonth {
  name: string;
  days: CalendarSpot[];
}

export interface CalendarEvent {
  name: string;
  start: {
    day: number|null;
    month: number|null;
  };
  end: {
    day: number|null;
    month: number|null;
  };
}
