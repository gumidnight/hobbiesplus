"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Registration {
  id: number;
  email: string;
  name: string | null;
  created_at: string;
  ip: string | null;
  user_agent: string | null;
}

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchRegistrations = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/registrations");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch");
      const data = (await res.json()) as { registrations: Registration[] };
      setRegistrations(data.registrations);
    } catch {
      setError("Failed to load registrations.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  async function handleExport() {
    const res = await fetch("/api/admin/export");
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <main className="min-h-screen">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-brand-600/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/2 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 text-sm font-bold text-white">
              H+
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Admin Dashboard</h1>
              <p className="text-xs text-gray-500">
                Hobbies+ Beta Registrations
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:text-white"
            >
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="glass rounded-xl p-6">
            <p className="text-sm text-gray-400">Total Registrations</p>
            <p className="mt-1 text-3xl font-bold text-white">
              {loading ? "—" : registrations.length}
            </p>
          </div>
          <div className="glass rounded-xl p-6">
            <p className="text-sm text-gray-400">Latest Registration</p>
            <p className="mt-1 text-lg font-semibold text-white">
              {loading || registrations.length === 0
                ? "—"
                : formatDate(registrations[0].created_at)}
            </p>
          </div>
          <div className="glass rounded-xl p-6">
            <p className="text-sm text-gray-400">With Name Provided</p>
            <p className="mt-1 text-3xl font-bold text-white">
              {loading
                ? "—"
                : registrations.filter((r) => r.name).length}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Registrations</h2>
          <div className="flex gap-3">
            <button
              onClick={fetchRegistrations}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-white/10"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>
            <button
              onClick={handleExport}
              disabled={registrations.length === 0}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-brand-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="glass flex items-center justify-center rounded-xl p-16">
            <div className="flex items-center gap-3 text-gray-400">
              <svg
                className="h-6 w-6 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Loading registrations...
            </div>
          </div>
        ) : error ? (
          <div className="glass rounded-xl p-8 text-center">
            <p className="text-red-400">{error}</p>
            <button
              onClick={fetchRegistrations}
              className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
            >
              Retry
            </button>
          </div>
        ) : registrations.length === 0 ? (
          <div className="glass rounded-xl p-16 text-center">
            <p className="text-lg text-gray-400">No registrations yet.</p>
            <p className="mt-2 text-sm text-gray-600">
              Share your landing page to start collecting signups.
            </p>
          </div>
        ) : (
          <div className="glass overflow-hidden rounded-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                      Registered At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                      IP
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {registrations.map((reg, index) => (
                    <tr
                      key={reg.id}
                      className="transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                        {reg.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                        {reg.name || (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                        {formatDate(reg.created_at)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {reg.ip || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
