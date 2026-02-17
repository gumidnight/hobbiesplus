"use client";

import { useState, type FormEvent } from "react";

export default function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim() }),
      });

      const data = (await res.json()) as { message?: string; error?: string };

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the list! 🎉");
        setEmail("");
        setName("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="animate-fade-in text-center">
        <div className="glass glow-sm inline-flex items-center gap-3 rounded-2xl px-8 py-6">
          <span className="text-3xl">🎉</span>
          <div className="text-left">
            <p className="text-lg font-semibold text-gray-900">{message}</p>
            <p className="mt-1 text-sm text-brand-700">
              We&apos;ll notify you when beta launches.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-gray-900
                     placeholder-gray-700 backdrop-blur-sm transition-all duration-300
                     focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-gray-900
                     placeholder-gray-700 backdrop-blur-sm transition-all duration-300
                     focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-brand-600 to-brand-500
                   px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300
                   hover:from-brand-500 hover:to-brand-400 hover:shadow-brand-500/25
                   disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {status === "loading" ? (
            <>
              <svg
                className="h-5 w-5 animate-spin"
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
              Joining...
            </>
          ) : (
            <>
              Join the Beta
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </>
          )}
        </span>
        {/* Animated shine effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </button>

      {status === "error" && (
        <p className="animate-fade-in text-center text-sm text-red-600">
          {message}
        </p>
      )}

      <p className="text-center text-xs text-gray-600">
        No spam, ever. Unsubscribe anytime.
      </p>
    </form>
  );
}
