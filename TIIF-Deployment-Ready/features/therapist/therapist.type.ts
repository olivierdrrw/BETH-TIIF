export interface Therapist {
  id: string;

  fullName: string;

  specialization: string;

  licenseNumber: string;

  bio?: string;

  availableDays?: string[];

  photoUrl?: string;
}

export interface TherapyBooking {
  id: string;
  userId: string;
  therapistId: string;
  therapistName: string;
  date: string; // yyyy-mm-dd
  time: string; // HH:mm
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  createdAt: string;
}
