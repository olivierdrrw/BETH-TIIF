export type CalendarEventType = "event" | "goal" | "journal" | "session";

export interface CalendarEvent {
  id: string;
  userId: string;
  title: string;
  date: string; // ISO date (yyyy-mm-dd)
  type: CalendarEventType;
  notes?: string;
}
