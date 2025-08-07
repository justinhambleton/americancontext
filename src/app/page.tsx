import type { Metadata } from "next";
import Image from "next/image";
import BackgroundRotator from "@/components/BackgroundRotator";
import Typewriter from "@/components/Typewriter";

export const metadata: Metadata = {
  title: "AmericanContext.ai",
  description: "The Republic, Rendered in Context.",
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-gray-200 flex items-center justify-center overflow-hidden font-sans">
      <BackgroundRotator />
      <div aria-hidden="true" className="animated-bg"></div>
      {/* Top-centered logo */}
      <header className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
        <Image
          src="/images/ac_logo_2.png"
          alt="American Context"
          width={200}
          height={60}
          priority
          className="h-10 w-auto opacity-90"
        />
      </header>
      <section className="relative z-10 w-full max-w-3xl px-6 sm:px-8 text-center flex flex-col items-center gap-6">
        <h1 className="fade-in-up text-4xl md:text-5xl font-semibold tracking-tight">
          The Republic, Rendered in Context.
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl">
          <em>
            <Typewriter text="The model is listening..." />
          </em>
          <span className="cursor ml-1" aria-hidden>_</span>
        </p>
        <form
          action="https://formspree.io/f/yourFormId"
          method="POST"
          className="mt-2 w-full flex flex-col sm:flex-row items-center gap-3"
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
            className="w-full sm:flex-1 rounded-md bg-white/5 text-gray-100 placeholder-gray-400 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-white/30 transition"
          />
          <button
            type="submit"
            className="w-full sm:w-auto rounded-md bg-red-600 hover:bg-red-700 text-white px-5 py-3 font-medium transition-colors"
          >
            Request access
          </button>
        </form>
      </section>
    </main>
  );
}
