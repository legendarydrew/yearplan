export interface YearPlan {
  year: number;
  events: CalendarEvent[];
}

export interface CalendarSpot {
  date: number | null;
  hasEvent: boolean;
}

export interface CalendarMonth {
  name: string;
  days: CalendarSpot[];
}

export interface CalendarEvent {
  name: string;
  start: {
    day: number | null;
    month: number | null;
  };
  end: {
    day: number | null;
    month: number | null;
  };
}

export interface PublicHoliday {
  title: string;
  day: number;
  month: number;
}

export interface GovUkEvent {
  title: string;
  date: string; // yyyy-mm-dd
  notes: string;
  bunting: boolean;
}
