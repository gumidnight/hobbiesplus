import Image from "next/image";
import RegistrationForm from "@/components/RegistrationForm";

export const runtime = "edge";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background gradient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-gray-400/15 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-[450px] w-[450px] rounded-full bg-gray-300/12 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-gray-300/8 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-lg font-bold text-white shadow-lg shadow-brand-500/25">
            H+
          </div>
          <span className="text-xl font-bold text-gray-900">
            Hobbies<span className="gradient-text">+</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#register"
            className="rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:from-brand-500 hover:to-brand-400 hover:shadow-brand-500/40"
          >
            Get Early Access
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 pb-20 pt-12 lg:flex-row lg:gap-16 lg:pt-20">
        {/* Left side — Copy + Form */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          {/* Badge */}
          <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm text-brand-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
            </span>
            Beta launching soon
          </div>

          <h1 className="animate-slide-up text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Discover Your
            <br />
            <span className="gradient-text">Next Passion</span>
          </h1>

          <p className="mt-6 max-w-lg animate-slide-up text-lg leading-relaxed text-gray-900 [animation-delay:0.1s]">
            Hobbies+ is your personal companion for exploring, tracking, and
            mastering the things you love. Join the beta and be the first to
            experience a smarter way to pursue your passions.
          </p>

          {/* Stats */}
          <div className="mt-8 flex animate-slide-up gap-8 [animation-delay:0.2s]">
            <div>
              <p className="text-2xl font-bold text-gray-900">50+</p>
              <p className="text-sm text-gray-800">Hobby categories</p>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div>
              <p className="text-2xl font-bold text-gray-900">Free</p>
              <p className="text-sm text-gray-800">During beta</p>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div>
              <p className="text-2xl font-bold text-gray-900">Early</p>
              <p className="text-sm text-gray-800">Access perks</p>
            </div>
          </div>

          {/* Registration Form */}
          <div
            id="register"
            className="mt-10 w-full max-w-md animate-slide-up [animation-delay:0.3s]"
          >
            <RegistrationForm />
          </div>
        </div>

        {/* Right side — Character/Mascot */}
        <div className="relative flex flex-1 items-center justify-center">
          {/* Glow ring behind character */}
          <div className="absolute h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-brand-500/25 to-brand-400/20 blur-3xl sm:h-[650px] sm:w-[650px]" />
          <div className="relative animate-float">
            <Image
              src="/images/character.png"
              alt="Hobbies+ Mascot"
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
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-sm font-bold text-white">
              H+
            </div>
            <span className="text-sm font-semibold text-gray-700">
              Hobbies+
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
