"use client";

import { motion } from "framer-motion";
import { Ticket, QrCode, Download, CheckCircle, Clock, XCircle } from "lucide-react";
import StudentSidebar from "@/components/StudentSidebar";

const registrations = [
  {
    id: "REG-2024-001",
    title: "Technova Hackathon 2024",
    date: "Jun 15, 2024",
    venue: "Main Auditorium",
    category: "Technical",
    status: "Confirmed",
    price: "Free",
    image: "/technova.png",
  },
  {
    id: "REG-2024-002",
    title: "Euphoria Cultural Fest",
    date: "Jun 20, 2024",
    venue: "Open Air Theater",
    category: "Cultural",
    status: "Confirmed",
    price: "₹199",
    image: "/euphoria.png",
  },
  {
    id: "REG-2024-003",
    title: "Crescendo Battle of Bands",
    date: "Jul 5, 2024",
    venue: "Sports Complex",
    category: "Cultural",
    status: "Pending",
    price: "₹99",
    image: "/euphoria.png",
  },
];

const statusConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  Confirmed: { icon: <CheckCircle className="w-4 h-4" />, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  Pending: { icon: <Clock className="w-4 h-4" />, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  Cancelled: { icon: <XCircle className="w-4 h-4" />, color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
};

export default function MyRegistrationsPage() {
  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <StudentSidebar />
      <main className="flex-1 space-y-6 min-w-0">
        <div>
          <h1 className="text-3xl font-bold mb-1">My Registrations</h1>
          <p className="text-zinc-400 text-sm">Manage your event tickets and registration statuses.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total", value: registrations.length, color: "text-white" },
            { label: "Confirmed", value: registrations.filter(r => r.status === "Confirmed").length, color: "text-green-400" },
            { label: "Pending", value: registrations.filter(r => r.status === "Pending").length, color: "text-amber-400" },
          ].map((s, i) => (
            <div key={i} className="glass p-5 rounded-3xl border-white/5 text-center">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-zinc-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Registrations List */}
        <div className="space-y-4">
          {registrations.map((reg, i) => {
            const sc = statusConfig[reg.status];
            return (
              <motion.div
                key={reg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl border-white/5 overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6">
                  <img src={reg.image} alt={reg.title} className="w-full sm:w-28 h-20 rounded-2xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg leading-tight">{reg.title}</h3>
                        <p className="text-zinc-400 text-sm mt-1">{reg.date} · {reg.venue}</p>
                        <p className="text-xs text-zinc-600 mt-1">ID: {reg.id}</p>
                      </div>
                      <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold ${sc.bg} ${sc.color} whitespace-nowrap flex-shrink-0`}>
                        {sc.icon} {reg.status}
                      </span>
                    </div>
                  </div>
                </div>
                {reg.status === "Confirmed" && (
                  <div className="px-6 pb-6 flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-indigo text-white text-sm font-bold hover:scale-105 transition-all shadow-lg shadow-brand-indigo/20">
                      <QrCode className="w-4 h-4" /> View QR Ticket
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl glass border-white/10 text-sm font-bold hover:bg-white/5 transition-all">
                      <Download className="w-4 h-4" /> Download Pass
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
