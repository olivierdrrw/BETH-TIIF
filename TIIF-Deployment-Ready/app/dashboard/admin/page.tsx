"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/auth";
import { Loader2, Plus } from "lucide-react";

import { TherapyRepository } from "@/features/therapist/repositories/therapy-repository";
import { AdminRoute } from "@/features/auth/components/admin-route";
import type { Therapist } from "@/features/therapist/therapist.type";
import type { UserRole } from "@/types/role";
import { useUserRole } from "@/hooks/use-user-role";

const ROLE_OPTIONS: UserRole[] = [
  "member",
  "therapist",
  "researcher",
  "institution_admin",
  "tenant_admin",
  "super_admin",
];

interface AdminUser {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
  [key: string]: unknown;
}

export default function AdminPage() {
  return (
    <AdminRoute>
      <AdminPageContent />
    </AdminRoute>
  );
}

function AdminPageContent() {
  const [counts, setCounts] = useState({
    users: 0,
    humanTwins: 0,
    assessments: 0,
    journals: 0,
  });
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [roles, setRoles] = useState<Record<string, UserRole>>({});
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [newTherapistName, setNewTherapistName] = useState("");
  const [newTherapistSpecialization, setNewTherapistSpecialization] = useState("");
  const [isAddingTherapist, setIsAddingTherapist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const { role: currentRole } = useUserRole();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setLoadError(null);
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error("Please sign in again.");
        const token = await currentUser.getIdToken();
        const headers = { Authorization: `Bearer ${token}` };

        const [summaryResponse, usersResponse, rolesResponse, therapistList] = await Promise.all([
          fetch("/api/admin/summary", { headers, cache: "no-store" }),
          fetch("/api/admin/users", { headers, cache: "no-store" }),
          fetch("/api/admin/roles", { headers, cache: "no-store" }),
          TherapyRepository.getTherapists(),
        ]);

        if (!summaryResponse.ok) throw new Error("Unable to load administrative metrics.");
        if (!usersResponse.ok) throw new Error("Unable to load the user directory.");
        const [summary, usersData] = await Promise.all([
          summaryResponse.json() as Promise<{ users: number; humanTwins: number; assessments: number; journals: number }>,
          usersResponse.json() as Promise<{ users: AdminUser[] }>,
        ]);

        let roleMap: Record<string, UserRole> = {};
        if (rolesResponse.ok) {
          const roleData = await rolesResponse.json() as { roles: Record<string, UserRole> };
          roleMap = roleData.roles ?? {};
        }

        if (!cancelled) {
          setCounts(summary);
          setUsers(usersData.users ?? []);
          setRoles(roleMap);
          setTherapists(therapistList);
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError(error instanceof Error ? error.message : "Unable to load the admin dashboard.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void load();
    return () => { cancelled = true; };
  }, []);

  async function handleRoleChange(userId: string, role: UserRole) {
    const previousRole = roles[userId] ?? "member";
    setRoles((prev) => ({ ...prev, [userId]: role }));
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Please sign in again.");
      const token = await currentUser.getIdToken();
      const response = await fetch("/api/admin/roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, role }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Role update failed.");
    } catch (error) {
      setRoles((prev) => ({ ...prev, [userId]: previousRole }));
      alert(error instanceof Error ? error.message : "Role update failed.");
    }
  }

  async function handleAddTherapist() {
    if (!newTherapistName.trim() || !newTherapistSpecialization.trim()) return;
    setIsAddingTherapist(true);
    try {
      await TherapyRepository.addTherapist({
        fullName: newTherapistName.trim(),
        specialization: newTherapistSpecialization.trim(),
        licenseNumber: "",
      });
      setNewTherapistName("");
      setNewTherapistSpecialization("");
      const list = await TherapyRepository.getTherapists();
      setTherapists(list);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unable to add therapist.");
    } finally {
      setIsAddingTherapist(false);
    }
  }

  const metrics = [
    { label: "Users", value: counts.users },
    { label: "Human Twins", value: counts.humanTwins },
    { label: "Assessments", value: counts.assessments },
    { label: "Journal Entries", value: counts.journals },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>

      {loadError && (
        <div role="alert" className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200">
          {loadError}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-6"
          >
            <p className="text-xs uppercase tracking-wide text-slate-400">
              {metric.label}
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {isLoading ? "—" : metric.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-slate-400">
          Users
        </h2>

        {isLoading ? (
          <div className="flex justify-center py-12 text-slate-500">
            <Loader2 className="animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">No users yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-slate-500">
                <th className="pb-3 font-normal">Name</th>
                <th className="pb-3 font-normal">Email</th>
                <th className="pb-3 font-normal">Joined</th>
                <th className="pb-3 font-normal">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-white/5 text-slate-300">
                  <td className="py-3">
                    {[u.firstName, u.lastName].filter(Boolean).join(" ") || "—"}
                  </td>
                  <td className="py-3 text-slate-400">{u.email ?? "—"}</td>
                  <td className="py-3 text-slate-500">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="py-3">
                    <select
                      value={roles[u.id] ?? "member"}
                      disabled={currentRole !== "super_admin" || isLoading}
                      onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                      className="rounded-lg border border-white/10 bg-white/[0.02] px-2 py-1 text-xs text-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {ROLE_OPTIONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-400">
          Population Insights
        </h2>
        <p className="text-sm text-slate-500">
          Aggregate forecasts will appear here after a privacy-reviewed analytics pipeline is configured. Individual mood and wellbeing records are not read directly by this dashboard.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-slate-400">
          Therapists
        </h2>

        <div className="mb-4 flex flex-wrap gap-2">
          <input
            value={newTherapistName}
            onChange={(e) => setNewTherapistName(e.target.value)}
            placeholder="Full name"
            className="input flex-1"
          />
          <input
            value={newTherapistSpecialization}
            onChange={(e) => setNewTherapistSpecialization(e.target.value)}
            placeholder="Specialization"
            className="input flex-1"
          />
          <button
            onClick={handleAddTherapist}
            disabled={isAddingTherapist}
            className="flex items-center gap-2 rounded-xl bg-navy-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-navy-400 disabled:opacity-50"
          >
            <Plus size={14} /> Add
          </button>
        </div>

        <div className="space-y-2">
          {therapists.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between rounded-xl border border-white/5 px-4 py-2.5 text-sm text-slate-300"
            >
              <span>{t.fullName}</span>
              <span className="text-xs text-slate-500">{t.specialization}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
