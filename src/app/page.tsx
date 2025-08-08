import type { Metadata } from "next";
import Image from "next/image";
import BackgroundRotator from "@/components/BackgroundRotator";
import Typewriter from "@/components/Typewriter";
import EmailCaptureForm from "@/components/EmailCaptureForm";

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
        <EmailCaptureForm />
      </section>
      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-gray-500 text-xs text-center select-none">
        <span>
          Copyright © 2025 FRNTR, LLC. All rights reserved.
        </span>
        <span className="mx-2">•</span>
        <a href="/privacy" className="underline hover:text-gray-300 transition-colors">Privacy Policy</a>
      </footer>
    </main>
  );
}
