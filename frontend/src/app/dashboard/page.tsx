"use client";

import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Ticket, 
  Heart, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Plus,
  Calendar
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { label: "Registered", value: "3", icon: <Ticket className="w-5 h-5" />, color: "text-blue-400" },
    { label: "Wishlist", value: "12", icon: <Heart className="w-5 h-5" />, color: "text-rose-400" },
    { label: "Notifications", value: "5", icon: <Bell className="w-5 h-5" />, color: "text-amber-400" },
  ];

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 flex flex-col gap-2">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-brand-indigo text-white font-bold shadow-lg shadow-brand-indigo/20"
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>
        <Link 
          href="/dashboard/tickets" 
          className="flex items-center gap-3 px-6 py-4 rounded-2xl glass border-white/5 text-zinc-400 hover:text-white transition-all"
        >
          <Ticket className="w-5 h-5" />
          My Tickets
        </Link>
        <Link 
          href="/dashboard/wishlist" 
          className="flex items-center gap-3 px-6 py-4 rounded-2xl glass border-white/5 text-zinc-400 hover:text-white transition-all"
        >
          <Heart className="w-5 h-5" />
          Wishlist
        </Link>
        <Link 
          href="/dashboard/settings" 
          className="flex items-center gap-3 px-6 py-4 rounded-2xl glass border-white/5 text-zinc-400 hover:text-white transition-all"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
        <hr className="my-4 border-white/5" />
        <button className="flex items-center gap-3 px-6 py-4 rounded-2xl glass border-white/5 text-rose-400 hover:bg-rose-400/10 transition-all">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 space-y-10">
        {/* Header / Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-gradient">Welcome back, John!</h1>
            <p className="text-zinc-400 text-sm">Here's what's happening on campus.</p>
          </div>
          <Link 
            href="/events" 
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-bold hover:scale-105 transition-all text-sm self-start sm:self-auto"
          >
            <Plus className="w-5 h-5" />
            Explore More
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-3xl border-white/5 flex items-center justify-between"
            >
              <div>
                <p className="text-zinc-500 text-xs font-medium mb-1 uppercase tracking-wider">{stat.label}</p>
                <h4 className="text-3xl font-bold">{stat.value}</h4>
              </div>
              <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                {stat.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Registrations Placeholder */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Upcoming Events</h3>
            <Link href="/dashboard/tickets" className="text-brand-indigo text-sm font-bold hover:underline">View All</Link>
          </div>
          
          <div className="glass-morphism rounded-[2.5rem] p-10 text-center border-white/5">
            <div className="w-16 h-16 rounded-full bg-brand-indigo/10 flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-brand-indigo" />
            </div>
            <h4 className="text-lg font-bold mb-2">No upcoming events</h4>
            <p className="text-zinc-400 text-sm max-w-xs mx-auto mb-8">
              You haven't registered for any events yet. Explore the campus and find something you love!
            </p>
            <Link 
              href="/events" 
              className="inline-block px-8 py-3 rounded-full border border-brand-indigo/30 text-brand-indigo font-bold hover:bg-brand-indigo hover:text-white transition-all"
            >
              Browse Events
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
