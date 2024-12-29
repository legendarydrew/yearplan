export interface YearPlan {
  year: number;
  events: CalendarEvent[];
}

export interface CalendarSpot {
  date: number | null;
  hasEvent: boolean;
  hasHoliday?: boolean;
  events?: string[];
}

export interface CalendarMonth {
  name: string;
  days: CalendarSpot[];
}

export interface CalendarEvent {
  name: string;
  start: {
    day: number;
    month: number; // 0-based!
  };
  end: {
    day: number | null;
    month: number | null; // 0-based!
  };
}

export interface PublicHoliday {
  title: string;
  day: number;
  month: number; // 0-based!
}

export interface GovUkHolidayResponse {
  [key: string]: {
    events: GovUkEvent[]
  }[];
}

export interface GovUkEvent {
  title: string;
  date: string; // yyyy-mm-dd
  notes: string;
  bunting: boolean;
}
