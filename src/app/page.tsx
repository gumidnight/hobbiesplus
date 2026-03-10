import Image from "next/image";
import RegistrationForm from "@/components/RegistrationForm";

export const runtime = "edge";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Background gradient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-gray-400/15 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-[450px] w-[450px] rounded-full bg-gray-300/12 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-gray-300/8 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">
            Hobbies<span className="gradient-text">+</span>
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto flex max-w-7xl flex-grow flex-col items-center gap-12 px-6 pb-20 pt-0 lg:flex-row lg:gap-16 lg:pt-0">
        {/* Left side — Copy + Form */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="animate-slide-up text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            <span className="block whitespace-nowrap">Find your next <span className="gradient-text">activity</span></span>
            <span className="block whitespace-nowrap">Find your <span className="gradient-text">people</span></span>
          </h1>

          <p className="mt-6 max-w-lg animate-slide-up text-lg leading-relaxed text-gray-900 [animation-delay:0.1s]">
            Discover, join, and create real-world activities based on your
            hobbies &mdash; and meet like-minded people near you.
          </p>

          {/* App Store button */}
          <a
            href="#"
            className="mt-1 flex justify-center animate-slide-up [animation-delay:0.2s]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/app-store-badge.svg"
              alt="Download on the App Store"
              className="h-[180px] w-auto"
            />
          </a>

          {/* Registration Form */}
          <div
            id="register"
            className="mt-1 w-full max-w-md animate-slide-up [animation-delay:0.3s]"
          >
            <p className="mb-4 text-center text-base font-semibold text-gray-900">
              Not on iOS? Join the waitlist.
            </p>
            <RegistrationForm />
          </div>
        </div>

        {/* Right side — Character/Mascot */}
        <div className="relative flex flex-1 items-center justify-center">
          {/* Glow ring behind character */}
          <div className="absolute h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-brand-500/25 to-brand-400/20 blur-3xl sm:h-[650px] sm:w-[650px]" />
          <div className="relative animate-float">
            <Image
              src="/images/board-games.png"
              alt="Board games illustration"
              width={650}
              height={650}
              className="relative z-10 drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              Hobbies<span className="gradient-text">+</span>
            </span>
          </div>
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Hobbies+. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
