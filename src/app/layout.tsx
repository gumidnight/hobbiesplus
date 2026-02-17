import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hobbies+ | Discover Your Next Passion",
  description:
    "Join the Hobbies+ beta and discover a smarter way to explore, track, and master your hobbies. Sign up for early access today.",
  keywords: ["hobbies", "passion", "beta", "community", "activities", "interests"],
  openGraph: {
    title: "Hobbies+ | Discover Your Next Passion",
    description:
      "Join the Hobbies+ beta and discover a smarter way to explore, track, and master your hobbies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="noise bg-grid min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
