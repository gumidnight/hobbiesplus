"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";

declare const grecaptcha: {
  render: (
    container: HTMLElement,
    params: {
      sitekey: string;
      size: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
    }
  ) => number;
  execute: (widgetId?: number) => void;
  reset: (widgetId?: number) => void;
};

export default function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const resolveRef = useRef<((token: string) => void) | null>(null);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) return;

    const init = () => {
      if (
        containerRef.current &&
        typeof grecaptcha !== "undefined" &&
        widgetIdRef.current === null
      ) {
        widgetIdRef.current = grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          size: "invisible",
          callback: (token: string) => {
            resolveRef.current?.(token);
            resolveRef.current = null;
          },
          "expired-callback": () => {
            if (widgetIdRef.current !== null)
              grecaptcha.reset(widgetIdRef.current);
          },
        });
      }
    };

    if (typeof grecaptcha !== "undefined") {
      init();
    } else {
      const interval = setInterval(() => {
        if (typeof grecaptcha !== "undefined") {
          clearInterval(interval);
          init();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  function getRecaptchaToken(): Promise<string> {
    return new Promise((resolve) => {
      if (widgetIdRef.current === null) {
        resolve("");
        return;
      }
      resolveRef.current = resolve;
      grecaptcha.execute(widgetIdRef.current);
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const recaptchaToken = await getRecaptchaToken();

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), recaptchaToken }),
      });

      const data = (await res.json()) as { message?: string; error?: string };

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the list.");
        setEmail("");
        if (widgetIdRef.current !== null) grecaptcha.reset(widgetIdRef.current);
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
        <div className="rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-8 py-6 shadow-lg shadow-brand-500/25">
          <p className="text-base font-semibold text-white">You&apos;re on the list.</p>
          <p className="mt-1 text-sm text-orange-100">
            We&apos;ll reach out when we launch. Stay tuned.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      {/* Hidden container for reCAPTCHA v2 Invisible widget */}
      <div ref={containerRef} />
      <div className="space-y-3">
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
              Join the waitlist
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

    </form>
  );
}
