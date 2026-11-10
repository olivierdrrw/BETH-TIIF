export interface Habit {
  id: string;
  userId: string;
  title: string;
  streak: number;
  lastCheckedAt: string | null;
  createdAt: string;
}
