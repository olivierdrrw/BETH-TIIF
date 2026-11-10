"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Calendar as CalendarIcon, User, Clock, Video } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { TherapyRepository } from "@/features/therapist/repositories/therapy-repository";
import type { Therapist, TherapyBooking } from "@/features/therapist/therapist.type";

const TIME_SLOTS = ["09:00", "10:30", "13:00", "14:30", "16:00"];

const STATUS_COLOR: Record<TherapyBooking["status"], string> = {
  pending: "bg-navy-500/10 text-navy-300",
  confirmed: "bg-navy-500/10 text-navy-300",
  completed: "bg-success-500/10 text-success-400",
  cancelled: "bg-rose-500/10 text-rose-300",
};

export default function TherapyPage() {
  const user = useAuthStore((state) => state.user);
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [bookings, setBookings] = useState<TherapyBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(TIME_SLOTS[0]);
  const [isBooking, setIsBooking] = useState(false);

  async function load() {
    setIsLoading(true);
    const [therapistList, userBookings] = await Promise.all([
      TherapyRepository.getTherapists(),
      user?.uid ? TherapyRepository.getUserBookings(user.uid) : Promise.resolve([]),
    ]);
    setTherapists(therapistList);
    setBookings(userBookings);
    setIsLoading(false);
  }

  useEffect(() => {
    load();
  }, [user?.uid]);

  async function handleBook() {
    if (!selectedTherapist || !date || !user?.uid || isBooking) return;

    setIsBooking(true);
    await TherapyRepository.createBooking({
      userId: user.uid,
      therapistId: selectedTherapist.id,
      therapistName: selectedTherapist.fullName,
      date,
      time,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    setSelectedTherapist(null);
    setDate("");
    setIsBooking(false);
    load();
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-white">Therapy</h1>
        <p className="mt-1 text-slate-400">Book a session with a licensed therapist.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12 text-slate-500">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          {bookings.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-400">
                Your sessions
              </h3>
              <div className="space-y-2">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm"
                  >
                    <div>
                      <p className="text-white">{b.therapistName}</p>
                      <p className="text-xs text-slate-500">
                        {b.date} at {b.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {b.status === "confirmed" && (
                        <Link
                          href={`/dashboard/video/booking-${b.id}`}
                          className="flex items-center gap-1.5 rounded-full bg-navy-500 px-3 py-1 text-xs font-medium text-white transition hover:bg-navy-400"
                        >
                          <Video size={12} /> Join call
                        </Link>
                      )}
                      <span className={`rounded-full px-3 py-1 text-xs capitalize ${STATUS_COLOR[b.status]}`}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-400">
              Available therapists
            </h3>

            {therapists.length === 0 ? (
              <p className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center text-sm text-slate-500">
                No therapists are listed yet. Check back soon.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {therapists.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTherapist(t)}
                    className={`rounded-3xl border p-6 text-left transition ${
                      selectedTherapist?.id === t.id
                        ? "border-navy-400/50 bg-navy-500/5"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-500/10">
                        <User size={18} className="text-navy-300" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{t.fullName}</p>
                        <p className="text-xs text-slate-500">{t.specialization}</p>
                      </div>
                    </div>
                    {t.bio && <p className="mt-3 text-sm text-slate-400">{t.bio}</p>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedTherapist && (
            <div className="rounded-3xl border border-navy-400/30 bg-navy-500/5 p-6">
              <h3 className="font-medium text-white">
                Book with {selectedTherapist.fullName}
              </h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <CalendarIcon size={12} /> Date
                  </span>
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => setDate(e.target.value)}
                    className="input"
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock size={12} /> Time
                  </span>
                  <select value={time} onChange={(e) => setTime(e.target.value)} className="input">
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </label>
              </div>

              <button
                onClick={handleBook}
                disabled={!date || isBooking}
                className="mt-4 flex items-center gap-2 rounded-xl bg-navy-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-navy-400 disabled:opacity-50"
              >
                {isBooking && <Loader2 size={14} className="animate-spin" />}
                Confirm booking
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
