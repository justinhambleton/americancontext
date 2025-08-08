"use client";

import { useState } from "react";

function isValidEmail(value: string): boolean {
  const email = value.trim();
  // Reasonable email validity check without being overly strict
  // Reference: RFC5322-inspired, simplified for UX
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(email);
}

export default function EmailCaptureForm() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = isValidEmail(email);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    setError(null);

    if (!valid) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setError(data?.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Email subscribe failed", error);
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <p className="mt-2 text-white-400 animate-fade-in">
        America thanks you for your curiosity. We will be in touch.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-2 w-full flex flex-col sm:flex-row items-center gap-3"
      noValidate
    >
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched(true)}
        aria-invalid={touched && !valid}
        aria-describedby="email-error"
        disabled={submitting}
        className="w-full sm:flex-1 rounded-md bg-white/5 text-gray-100 placeholder-gray-400 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-white/30 disabled:opacity-60 disabled:cursor-not-allowed transition"
      />
      <button
        type="submit"
        disabled={submitting || !valid}
        className="w-full sm:w-auto rounded-md bg-red-600 hover:bg-red-700 disabled:bg-red-800/60 disabled:hover:bg-red-800/60 text-white px-5 py-3 font-medium transition-colors"
      >
        {submitting ? "Submitting…" : "Request access"}
      </button>
      {touched && !valid ? (
        <span id="email-error" className="text-red-400 text-sm w-full text-left">
          Please enter a valid email address.
        </span>
      ) : null}
      {error ? (
        <span className="text-red-400 text-sm w-full text-left">{error}</span>
      ) : null}
    </form>
  );
}
