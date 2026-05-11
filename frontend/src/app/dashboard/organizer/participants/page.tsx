"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, CheckCircle, XCircle, Mail, Download, Eye, Users, QrCode } from "lucide-react";
import OrganizerSidebar from "@/components/OrganizerSidebar";

const participants = [
  { id: 1, name: "Priya Sharma", email: "priya@college.edu", event: "Technova Hackathon", date: "Jun 15", status: "Confirmed", attended: true },
  { id: 2, name: "Rahul Mehta", email: "rahul@college.edu", event: "Technova Hackathon", date: "Jun 15", status: "Confirmed", attended: false },
  { id: 3, name: "Ananya Iyer", email: "ananya@college.edu", event: "Euphoria Cultural Fest", date: "Jun 20", status: "Pending", attended: false },
  { id: 4, name: "Vikram Singh", email: "vikram@college.edu", event: "Euphoria Cultural Fest", date: "Jun 20", status: "Confirmed", attended: true },
  { id: 5, name: "Diya Patel", email: "diya@college.edu", event: "Ignite Startup Pitch", date: "Jul 15", status: "Pending", attended: false },
];

export default function ParticipantsPage() {
  const [search, setSearch] = useState("");
  const filtered = participants.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <OrganizerSidebar />
      <main className="flex-1 space-y-6 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Participants</h1>
            <p className="text-zinc-400 text-sm">Track and manage all event registrations.</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl glass border-white/10 text-sm font-bold hover:bg-white/5 transition-all">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total", value: participants.length, color: "text-white" },
            { label: "Confirmed", value: participants.filter(p => p.status === "Confirmed").length, color: "text-green-400" },
            { label: "Attended", value: participants.filter(p => p.attended).length, color: "text-brand-indigo" },
          ].map((s, i) => (
            <div key={i} className="glass p-5 rounded-3xl border-white/5 text-center">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-zinc-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-brand-violet transition-colors" />
          <input
            type="text"
            placeholder="Search participants..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-brand-violet/50 transition-all"
          />
        </div>

        {/* Table */}
        <div className="glass rounded-3xl border-white/5 overflow-hidden">
          <div className="grid grid-cols-6 px-6 py-3 border-b border-white/5 text-xs text-zinc-500 font-bold uppercase tracking-wider">
            <span className="col-span-2">Participant</span>
            <span>Event</span>
            <span>Status</span>
            <span>Attended</span>
            <span>Actions</span>
          </div>
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-6 px-6 py-4 border-b border-white/5 last:border-0 items-center hover:bg-white/3 transition-all"
            >
              <div className="col-span-2 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-violet/20 flex items-center justify-center text-brand-violet font-bold text-sm flex-shrink-0">
                  {p.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm truncate">{p.name}</p>
                  <p className="text-zinc-500 text-xs truncate">{p.email}</p>
                </div>
              </div>
              <div className="text-zinc-400 text-sm truncate pr-2">{p.event.split(" ")[0]}</div>
              <div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                  p.status === "Confirmed"
                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                }`}>
                  {p.status}
                </span>
              </div>
              <div>
                {p.attended
                  ? <CheckCircle className="w-5 h-5 text-green-400" />
                  : <XCircle className="w-5 h-5 text-zinc-600" />
                }
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-xl glass border-white/10 hover:bg-white/10 transition-all" title="Send Email">
                  <Mail className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 rounded-xl glass border-white/10 hover:bg-white/10 transition-all" title="View QR">
                  <QrCode className="w-3.5 h-3.5" />
                </button>
                {p.status === "Pending" && (
                  <button className="p-1.5 rounded-xl bg-green-500/20 border border-green-500/20 text-green-400 hover:bg-green-500/30 transition-all" title="Approve">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
