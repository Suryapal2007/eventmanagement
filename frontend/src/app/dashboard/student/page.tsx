"use client";

import { motion } from "framer-motion";
import { 
  CalendarDays, Ticket, Bell, Award, TrendingUp, Clock, CheckCircle, Star
} from "lucide-react";
import Link from "next/link";
import StudentSidebar from "@/components/StudentSidebar";

const upcomingEvents = [
  { id: 1, title: "Technova Hackathon 2024", date: "Jun 15", venue: "Main Auditorium", category: "Technical", countdown: "4 days left" },
  { id: 2, title: "Euphoria Cultural Fest", date: "Jun 20", venue: "Open Air Theater", category: "Cultural", countdown: "9 days left" },
];

const recentRegistrations = [
  { id: 1, title: "Ignite Startup Pitch", status: "Confirmed", date: "Jul 15" },
  { id: 2, title: "Crescendo Battle of Bands", status: "Pending", date: "Jul 5" },
  { id: 3, title: "Zenith Cricket Tournament", status: "Confirmed", date: "Jul 10" },
];

export default function StudentDashboard() {
  const stats = [
    { label: "Registered Events", value: "3", icon: <Ticket className="w-5 h-5" />, color: "from-brand-indigo to-blue-500" },
    { label: "Certificates Earned", value: "2", icon: <Award className="w-5 h-5" />, color: "from-amber-500 to-orange-500" },
    { label: "Notifications", value: "3", icon: <Bell className="w-5 h-5" />, color: "from-brand-violet to-brand-purple" },
    { label: "Events Attended", value: "5", icon: <CheckCircle className="w-5 h-5" />, color: "from-green-500 to-teal-500" },
  ];

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <StudentSidebar />

      <main className="flex-1 space-y-8 min-w-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, John! 👋</h1>
            <p className="text-zinc-400 text-sm mt-1">Here's what's happening on your campus today.</p>
          </div>
          <Link href="/dashboard/student/events" className="px-5 py-2.5 rounded-2xl bg-brand-indigo text-white font-bold text-sm hover:scale-105 transition-all whitespace-nowrap shadow-lg shadow-brand-indigo/20">
            Browse Events
          </Link>
        </div>

        {/* Stats */}
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
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-zinc-500 text-xs">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <div className="glass rounded-3xl p-6 border-white/5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-lg">Upcoming Events</h2>
              <Link href="/dashboard/student/events" className="text-brand-indigo text-xs font-bold hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map(ev => (
                <div key={ev.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/8 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-indigo/20 flex flex-col items-center justify-center text-center flex-shrink-0">
                    <span className="text-brand-indigo font-bold text-xs">{ev.date.split(" ")[0].toUpperCase()}</span>
                    <span className="text-white font-bold text-sm leading-none">{ev.date.split(" ")[1]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate group-hover:text-brand-indigo transition-colors">{ev.title}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{ev.venue}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold whitespace-nowrap">
                    <Clock className="w-3 h-3" />
                    {ev.countdown}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Registrations */}
          <div className="glass rounded-3xl p-6 border-white/5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-lg">My Registrations</h2>
              <Link href="/dashboard/student/registrations" className="text-brand-indigo text-xs font-bold hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {recentRegistrations.map(reg => (
                <div key={reg.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{reg.title}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{reg.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    reg.status === "Confirmed" ? "bg-green-500/20 text-green-400 border border-green-500/20" : "bg-amber-500/20 text-amber-400 border border-amber-500/20"
                  }`}>
                    {reg.status}
                  </span>
                </div>
              ))}
            </div>
            <Link href="/dashboard/student/registrations" className="mt-5 w-full py-3 rounded-2xl glass border-white/10 flex items-center justify-center text-sm font-bold hover:bg-white/5 transition-all">
              Download Tickets →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass rounded-3xl p-6 border-white/5">
          <h2 className="font-bold text-lg mb-5">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Browse Technical", href: "/dashboard/student/events?cat=Technical", icon: TrendingUp, color: "text-brand-indigo" },
              { label: "Cultural Events", href: "/dashboard/student/events?cat=Cultural", icon: Star, color: "text-amber-400" },
              { label: "My Certificates", href: "/dashboard/student/certificates", icon: Award, color: "text-green-400" },
              { label: "Notifications", href: "/dashboard/student/notifications", icon: Bell, color: "text-brand-violet" },
            ].map((action, i) => (
              <Link key={i} href={action.href} className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center gap-3 text-center group">
                <action.icon className={`w-6 h-6 ${action.color} group-hover:scale-110 transition-transform`} />
                <span className="text-xs font-medium text-zinc-400">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
