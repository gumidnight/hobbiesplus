import Image from "next/image";
import RegistrationForm from "@/components/RegistrationForm";

export const runtime = "edge";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background gradient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-brand-600/20 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-pink-600/10 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 text-lg font-bold text-white shadow-lg shadow-brand-500/25">
            H+
          </div>
          <span className="text-xl font-bold text-white">
            Hobbies<span className="gradient-text">+</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#register"
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
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
          <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
            </span>
            Beta launching soon
          </div>

          <h1 className="animate-slide-up text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Discover Your
            <br />
            <span className="gradient-text">Next Passion</span>
          </h1>

          <p className="mt-6 max-w-lg animate-slide-up text-lg leading-relaxed text-gray-400 [animation-delay:0.1s]">
            Hobbies+ is your personal companion for exploring, tracking, and
            mastering the things you love. Join the beta and be the first to
            experience a smarter way to pursue your passions.
          </p>

          {/* Stats */}
          <div className="mt-8 flex animate-slide-up gap-8 [animation-delay:0.2s]">
            <div>
              <p className="text-2xl font-bold text-white">50+</p>
              <p className="text-sm text-gray-500">Hobby categories</p>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-white">Free</p>
              <p className="text-sm text-gray-500">During beta</p>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-white">Early</p>
              <p className="text-sm text-gray-500">Access perks</p>
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
          <div className="absolute h-[350px] w-[350px] rounded-full bg-gradient-to-tr from-brand-600/30 to-purple-500/20 blur-3xl sm:h-[420px] sm:w-[420px]" />
          <div className="relative animate-float">
            <Image
              src="/images/character.png"
              alt="Hobbies+ Mascot"
              width={460}
              height={460}
              className="relative z-10 drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="glass glow relative overflow-hidden rounded-3xl p-12 text-center sm:p-16">
          {/* Background gradient inside CTA */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 to-purple-600/10" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to discover what&apos;s next?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-400">
              Be among the first to experience Hobbies+. Sign up for the beta
              and get exclusive early access, plus special perks when we launch.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="#register"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:from-brand-500 hover:to-purple-500 hover:shadow-brand-500/25"
              >
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
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 text-sm font-bold text-white">
              H+
            </div>
            <span className="text-sm font-semibold text-gray-400">
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
