import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CampusEsoul | Elevate Your Campus Life",
  description: "The ultimate platform for college events, workshops, and networking.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "CampusEsoul",
    description: "The ultimate college event management platform.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <div className="bg-mesh min-h-screen flex flex-col relative overflow-x-hidden">
          {/* Glassmorphic Navbar */}
          <nav className="glass sticky top-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
                <img src="/logo.png" alt="CampusEsoul" className="w-9 h-9 rounded-xl object-cover" />
                <span className="text-xl font-bold text-gradient">CampusEsoul</span>
              </Link>
              <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <Link href="/events" className="hover:text-brand-violet transition-colors">Explore Events</Link>
                <Link href="#clubs" className="hover:text-brand-violet transition-colors">Clubs</Link>
                <Link href="/login" className="px-5 py-2 rounded-full glass border-brand-indigo/30 hover:bg-brand-indigo/10 transition-all">Login</Link>
                <Link href="/register" className="px-5 py-2 rounded-full bg-gradient-to-r from-brand-indigo to-brand-purple text-white shadow-lg shadow-brand-indigo/20 hover:scale-105 transition-all">Sign Up</Link>
              </div>
            </div>
          </nav>

          <main className="flex-grow">
            {children}
          </main>

          <footer className="glass py-12 px-6 mt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-zinc-400">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2.5 mb-4">
                  <img src="/logo.png" alt="CampusEsoul" className="w-9 h-9 rounded-xl object-cover" />
                  <span className="text-2xl font-bold text-gradient">CampusEsoul</span>
                </div>
                <p className="max-w-xs text-sm leading-relaxed">Empowering students to discover, create, and manage events with ease. Your gateway to a vibrant campus life.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm">Platform</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Explore Events</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Create Event</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Clubs Directory</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm">Support</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-xs text-zinc-500">
              &copy; {new Date().getFullYear()} CampusEsoul. All rights reserved.
            </div>
          </footer>
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
