"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const data = (await res.json()) as { error?: string };
        setError(data.error || "Invalid password.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-brand-600/20 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-purple-600/15 blur-[120px]" />
      </div>

      <div className="glass relative z-10 w-full max-w-md rounded-2xl p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 text-xl font-bold text-white shadow-lg shadow-brand-500/25">
            H+
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="mt-2 text-sm text-gray-400">
            Enter your admin password to access the dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              placeholder="Enter admin password"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white
                         placeholder-gray-500 transition-all duration-300
                         focus:border-brand-400/50 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          {error && (
            <p className="animate-fade-in text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 px-6 py-3
                       font-semibold text-white transition-all duration-300
                       hover:from-brand-500 hover:to-purple-500 hover:shadow-lg hover:shadow-brand-500/25
                       disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-gray-500 transition-colors hover:text-brand-400"
          >
            &larr; Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
