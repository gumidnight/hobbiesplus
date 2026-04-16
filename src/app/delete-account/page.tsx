import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Account Deletion Policy – Hobbies+",
  description: "Learn how to permanently delete your Hobbies+ account and what happens to your data.",
};

export default function DeleteAccountPage() {
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
          <a href="/" className="text-xl font-bold text-gray-900">
            Hobbies<span className="gradient-text">+</span>
          </a>
        </div>
      </nav>

      {/* Content */}
      <section className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-24 pt-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Account Deletion Policy
        </h1>
        <p className="mt-3 text-gray-500 text-sm">Hobbies+</p>

        <p className="mt-6 text-gray-700 leading-relaxed">
          At Hobbies+, users have full control over their data and account. You
          can permanently delete your account at any time by following the steps
          below.
        </p>

        {/* How to Delete */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900">How to Delete Your Account</h2>
          <ol className="mt-4 list-decimal list-inside space-y-2 text-gray-700 leading-relaxed">
            <li>Navigate to your <span className="font-medium">Application Profile</span></li>
            <li>Scroll down and select <span className="font-medium">Delete Account</span></li>
            <li>Click <span className="font-medium">Continue</span> and type <span className="font-mono bg-gray-100 px-1 rounded text-sm">"Delete"</span> to confirm</li>
            <li>Enter the <span className="font-medium">One-Time Password (OTP)</span> sent to your registered device</li>
            <li>Confirm the deletion request</li>
          </ol>
        </div>

        {/* What Happens After */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900">What Happens After Deletion</h2>
          <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
            <li>Your account will be permanently deleted</li>
            <li>All associated personal data will be removed from our active systems</li>
            <li>You will lose access to your account and all related features</li>
            <li className="font-medium text-gray-900">This action is irreversible</li>
          </ul>
        </div>

        {/* Data Retention */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900">Data Retention &amp; Legal Obligations</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Certain data may be retained for a limited period if required for:
          </p>
          <ul className="mt-3 list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
            <li>Legal compliance</li>
            <li>Fraud prevention</li>
            <li>Security and auditing purposes</li>
          </ul>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Retained data will be restricted and not used for commercial purposes.
          </p>
        </div>

        {/* Processing Time */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900">Processing Time</h2>
          <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
            <li>Account deletion is typically processed immediately</li>
            <li>Full removal from backups and logs may take up to <span className="font-medium">30 days</span></li>
          </ul>
        </div>

        {/* Need Help */}
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white/60 p-6 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-gray-900">Need Help?</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            If you are unable to delete your account or experience issues during
            deletion, please contact our support team.
          </p>
        </div>
      </section>
    </main>
  );
}
