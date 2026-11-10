"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

import { TherapyRepository } from "@/features/therapist/repositories/therapy-repository";
import type { Therapist, TherapyBooking } from "@/features/therapist/therapist.type";

export default function TherapistDashboardPage() {
  const [therapist, setTherapist] = useState<Therapist | null>(null);
  const [bookings, setBookings] = useState<TherapyBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function load() {
    setIsLoading(true);
    const therapists = await TherapyRepository.getTherapists();
    const current = therapists[0] ?? null;
    setTherapist(current);

    if (current) {
      const theirBookings = await TherapyRepository.getTherapistBookings(current.id);
      setBookings(theirBookings);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleStatus(bookingId: string, status: TherapyBooking["status"]) {
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status } : b)));
    await TherapyRepository.updateBookingStatus(bookingId, status);
  }

  const pending = bookings.filter((b) => b.status === "pending");
  const confirmed = bookings.filter((b) => b.status === "confirmed");
  const completed = bookings.filter((b) => b.status === "completed");

  return (
    <div>
      <h1 className="text-2xl font-bold">Therapist Dashboard</h1>
      <p className="mt-1 text-sm text-slate-400">
        {therapist ? `Sessions and requests for ${therapist.fullName}.` : "Loading…"}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">Pending requests</p>
          <p className="mt-2 text-3xl font-bold text-navy-400">{pending.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">Upcoming sessions</p>
          <p className="mt-2 text-3xl font-bold">{confirmed.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-slate-400">Completed</p>
          <p className="mt-2 text-3xl font-bold text-success-400">{completed.length}</p>
        </div>
      </div>

      {!isLoading && bookings.length === 0 && (
        <p className="mt-6 text-sm text-slate-500">No bookings yet.</p>
      )}

      {pending.length > 0 && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-card p-5">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Needs your response
          </p>
          <div className="space-y-3">
            {pending.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4"
              >
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Clock size={14} className="text-navy-400" />
                  {b.date} at {b.time}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatus(b.id, "confirmed")}
                    className="flex items-center gap-1 rounded-full bg-success-500/10 px-3 py-1 text-xs font-semibold text-success-400"
                  >
                    <CheckCircle2 size={13} /> Confirm
                  </button>
                  <button
                    onClick={() => handleStatus(b.id, "cancelled")}
                    className="flex items-center gap-1 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-300"
                  >
                    <XCircle size={13} /> Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {confirmed.length > 0 && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-card p-5">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Upcoming sessions
          </p>
          <div className="space-y-3">
            {confirmed.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 text-sm text-slate-300"
              >
                <span>{b.date} at {b.time}</span>
                <button
                  onClick={() => handleStatus(b.id, "completed")}
                  className="rounded-full bg-navy-500/10 px-3 py-1 text-xs font-semibold text-navy-300"
                >
                  Mark completed
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
