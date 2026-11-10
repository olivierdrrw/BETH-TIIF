import { create } from "zustand";

import { Appointment }
from "@/features/appointment/appointment.type";

interface AppointmentState {
  appointments: Appointment[];

  createAppointment: (
    appointment: Appointment
  ) => void;
}

export const useAppointmentStore =
  create<AppointmentState>((set) => ({
    appointments: [],

    createAppointment: (
      appointment
    ) =>
      set((state) => ({
        appointments: [
          appointment,
          ...state.appointments,
        ],
      })),
  }));