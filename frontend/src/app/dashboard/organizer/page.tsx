"use client";

import { motion } from "framer-motion";
import {
  CalendarDays, Users, TrendingUp, DollarSign,
  Eye, Edit, Trash2, CheckCircle, PlusCircle, ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import OrganizerSidebar from "@/components/OrganizerSidebar";

const stats = [
  { label: "Total Events", value: "8", trend: "+2 this month", icon: <CalendarDays className="w-5 h-5" />, color: "from-brand-indigo to-blue-500" },
  { label: "Total Registrations", value: "342", trend: "+58 this week", icon: <Users className="w-5 h-5" />, color: "from-brand-violet to-brand-purple" },
  { label: "Upcoming Events", value: "3", trend: "Next: Jun 15", icon: <TrendingUp className="w-5 h-5" />, color: "from-green-500 to-teal-500" },
  { label: "Total Revenue", value: "₹28,400", trend: "+₹4,200 this week", icon: <DollarSign className="w-5 h-5" />, color: "from-amber-500 to-orange-500" },
];

const recentEvents = [
  { id: 1, title: "Technova Hackathon 2024", date: "Jun 15", registrations: 128, capacity: 200, status: "Active", image: "/technova.png" },
  { id: 2, title: "Euphoria Cultural Fest", date: "Jun 20", registrations: 95, capacity: 150, status: "Active", image: "/euphoria.png" },
  { id: 3, title: "Ignite Startup Pitch", date: "Jul 15", registrations: 45, capacity: 60, status: "Draft", image: "/ignite.png" },
];

export default function OrganizerDashboard() {
  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <OrganizerSidebar />
      <main className="flex-1 space-y-8 min-w-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
            <p className="text-zinc-400 text-sm mt-1">Manage your events and track performance.</p>
          </div>
          <Link href="/dashboard/organizer/create" className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-violet text-white font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-brand-violet/20 whitespace-nowrap">
            <PlusCircle className="w-4 h-4" /> Create Event
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass p-5 rounded-3xl border-white/5"
            >
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-zinc-500 text-xs">{stat.label}</p>
              <p className="text-green-400 text-[10px] font-bold mt-1">{stat.trend}</p>
            </motion.div>
          ))}
        </div>

        {/* Events Table */}
        <div className="glass rounded-3xl p-6 border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-lg">My Events</h2>
            <Link href="/dashboard/organizer/manage" className="text-brand-violet text-xs font-bold hover:underline">Manage All →</Link>
          </div>
          <div className="space-y-4">
            {recentEvents.map((ev, i) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/8 transition-all group"
              >
                <img src={ev.image} alt={ev.title} className="w-14 h-14 rounded-2xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm truncate">{ev.title}</h3>
                  <p className="text-zinc-500 text-xs mt-0.5">Event Date: {ev.date}</p>
                  {/* Progress bar */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-indigo to-brand-purple"
                        style={{ width: `${(ev.registrations / ev.capacity) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-zinc-500 whitespace-nowrap">{ev.registrations}/{ev.capacity}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold border whitespace-nowrap ${
                  ev.status === "Active"
                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                    : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                }`}>
                  {ev.status}
                </span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-xl glass border-white/10 hover:bg-white/10 transition-all"><Eye className="w-4 h-4" /></button>
                  <button className="p-2 rounded-xl glass border-white/10 hover:bg-white/10 transition-all"><Edit className="w-4 h-4" /></button>
                  <button className="p-2 rounded-xl glass border-rose-500/20 hover:bg-rose-500/10 text-rose-400 transition-all"><Trash2 className="w-4 h-4" /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "View Participants", href: "/dashboard/organizer/participants", icon: Users, color: "text-brand-indigo" },
            { label: "Analytics Report", href: "/dashboard/organizer/reports", icon: TrendingUp, color: "text-green-400" },
            { label: "Issue Certificates", href: "/dashboard/organizer/certificates", icon: CheckCircle, color: "text-amber-400" },
          ].map((a, i) => (
            <Link key={i} href={a.href} className="glass p-6 rounded-3xl border-white/5 hover:border-white/10 transition-all flex flex-col items-center gap-3 text-center group">
              <a.icon className={`w-8 h-8 ${a.color} group-hover:scale-110 transition-transform`} />
              <span className="text-sm font-bold">{a.label}</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
