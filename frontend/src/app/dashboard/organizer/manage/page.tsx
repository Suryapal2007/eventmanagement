"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit, Trash2, Eye, Users, Calendar, CheckCircle,
  XCircle, Plus, Search, MoreVertical, ToggleLeft, ToggleRight
} from "lucide-react";
import Link from "next/link";
import OrganizerSidebar from "@/components/OrganizerSidebar";

const EVENTS = [
  { id: 1, title: "Technova Hackathon 2024", date: "Jun 15, 2024", venue: "Main Auditorium", category: "Technical", registrations: 128, capacity: 200, status: "Active", price: 0, image: "/technova.png" },
  { id: 2, title: "Euphoria Cultural Fest", date: "Jun 20, 2024", venue: "Open Air Theater", category: "Cultural", registrations: 95, capacity: 150, status: "Active", price: 199, image: "/euphoria.png" },
  { id: 3, title: "Ignite Startup Pitch", date: "Jul 15, 2024", venue: "Innovation Hub", category: "Business", registrations: 45, capacity: 60, status: "Draft", price: 0, image: "/ignite.png" },
  { id: 4, title: "Zenith Cricket Tournament", date: "Jul 10, 2024", venue: "College Grounds", category: "Sports", registrations: 72, capacity: 100, status: "Closed", price: 250, image: "/technova.png" },
];

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-green-500/10 text-green-400 border-green-500/20",
  Draft: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  Closed: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

export default function ManageEventsPage() {
  const [events, setEvents] = useState(EVENTS);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  const filtered = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id: number) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    setDeleteId(null);
  };

  const toggleStatus = (id: number) => {
    setEvents(prev => prev.map(e =>
      e.id === id ? { ...e, status: e.status === "Active" ? "Draft" : "Active" } : e
    ));
  };

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <OrganizerSidebar />
      <main className="flex-1 space-y-6 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Manage Events</h1>
            <p className="text-zinc-400 text-sm">Edit, monitor, and control all your events.</p>
          </div>
          <Link href="/dashboard/organizer/create" className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-violet text-white font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-brand-violet/20">
            <Plus className="w-4 h-4" /> New Event
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Events", value: events.length },
            { label: "Active", value: events.filter(e => e.status === "Active").length },
            { label: "Total Registrations", value: events.reduce((sum, e) => sum + e.registrations, 0) },
          ].map((s, i) => (
            <div key={i} className="glass p-5 rounded-3xl border-white/5 text-center">
              <p className="text-3xl font-bold">{s.value}</p>
              <p className="text-zinc-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-brand-violet transition-colors" />
          <input
            type="text"
            placeholder="Search your events..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-brand-violet/50 transition-all"
          />
        </div>

        {/* Events List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filtered.map((ev, i) => (
              <motion.div
                key={ev.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.06 }}
                className="glass rounded-3xl border-white/5 overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6">
                  <img src={ev.image} alt={ev.title} className="w-full sm:w-28 h-20 rounded-2xl object-cover flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-bold text-lg leading-tight">{ev.title}</h3>
                      <div className="relative flex-shrink-0">
                        <button
                          onClick={() => setMenuOpen(menuOpen === ev.id ? null : ev.id)}
                          className="p-2 rounded-xl glass border-white/10 hover:bg-white/10 transition-all"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        <AnimatePresence>
                          {menuOpen === ev.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9, y: -5 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: -5 }}
                              className="absolute right-0 top-10 z-10 glass-morphism rounded-2xl p-2 w-44 border-white/10 shadow-xl"
                            >
                              {[
                                { label: "View Details", icon: Eye },
                                { label: "Edit Event", icon: Edit },
                                { label: ev.status === "Active" ? "Set to Draft" : "Set Active", icon: ev.status === "Active" ? ToggleLeft : ToggleRight },
                              ].map((item, j) => (
                                <button
                                  key={j}
                                  onClick={() => { if (item.label.includes("Draft") || item.label.includes("Active")) toggleStatus(ev.id); setMenuOpen(null); }}
                                  className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl hover:bg-white/10 transition-all text-sm text-left"
                                >
                                  <item.icon className="w-4 h-4 text-zinc-400" />
                                  {item.label}
                                </button>
                              ))}
                              <button
                                onClick={() => { setDeleteId(ev.id); setMenuOpen(null); }}
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl hover:bg-rose-500/10 text-rose-400 transition-all text-sm text-left"
                              >
                                <Trash2 className="w-4 h-4" /> Delete
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{ev.date}</span>
                      <span>· {ev.venue}</span>
                      <span className={`px-2.5 py-1 rounded-full border font-bold ${STATUS_STYLES[ev.status]}`}>{ev.status}</span>
                    </div>

                    {/* Progress bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(ev.registrations / ev.capacity) * 100}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          className={`h-full rounded-full ${
                            (ev.registrations / ev.capacity) > 0.8
                              ? "bg-rose-500"
                              : "bg-gradient-to-r from-brand-violet to-brand-indigo"
                          }`}
                        />
                      </div>
                      <span className="text-xs text-zinc-400 whitespace-nowrap">
                        <span className="font-bold text-white">{ev.registrations}</span>/{ev.capacity} slots
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-5 flex flex-wrap gap-3 border-t border-white/5 pt-4">
                  <Link href="/dashboard/organizer/participants" className="flex items-center gap-2 px-4 py-2 rounded-2xl glass border-white/10 text-xs font-bold hover:bg-white/5 transition-all">
                    <Users className="w-3.5 h-3.5" /> {ev.registrations} Participants
                  </Link>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-2xl glass border-white/10 text-xs font-bold hover:bg-white/5 transition-all">
                    <Edit className="w-3.5 h-3.5" /> Edit Event
                  </button>
                  <button
                    onClick={() => setDeleteId(ev.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold hover:bg-rose-500/20 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass-morphism rounded-3xl p-8 max-w-sm w-full text-center border-rose-500/20 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto mb-5">
                <Trash2 className="w-8 h-8 text-rose-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Delete Event?</h3>
              <p className="text-zinc-400 text-sm mb-6">This will permanently delete the event and all its registrations. This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-3 rounded-2xl glass border-white/10 font-bold hover:bg-white/5 transition-all">Cancel</button>
                <button onClick={() => handleDelete(deleteId)} className="flex-1 py-3 rounded-2xl bg-rose-500 text-white font-bold hover:scale-[1.02] transition-all shadow-lg shadow-rose-500/20">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
