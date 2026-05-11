"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Plus, Flame, Zap, Music, Trophy, Briefcase } from "lucide-react";
import EventCard from "@/components/EventCard";
import StudentSidebar from "@/components/StudentSidebar";
import Link from "next/link";

const ALL_EVENTS = [
  { _id: "1", title: "Technova Hackathon 2024", description: "The ultimate 24-hour coding challenge. Show your skills and win big.", date: "2024-06-15", deadline: "2024-06-10", venue: "Main Auditorium", category: "Technical", image: "/technova.png", price: 0 },
  { _id: "2", title: "Euphoria Cultural Fest", description: "Celebrate the spirit of campus life with music, dance, and fashion.", date: "2024-06-20", deadline: "2024-06-18", venue: "Open Air Theater", category: "Cultural", image: "/euphoria.png", price: 199 },
  { _id: "3", title: "Innovision Tech Expo", description: "Witness the future of technology with groundbreaking projects and exhibits.", date: "2024-06-25", deadline: "2024-06-22", venue: "Lab Block C", category: "Technical", image: "/technova.png", price: 0 },
  { _id: "4", title: "Crescendo Battle of Bands", description: "The loudest competition in campus. May the best band win!", date: "2024-07-05", deadline: "2024-07-02", venue: "Sports Complex", category: "Cultural", image: "/euphoria.png", price: 99 },
  { _id: "5", title: "Zenith Cricket Tournament", description: "Gear up for the most intense inter-college cricket league.", date: "2024-07-10", deadline: "2024-07-05", venue: "College Grounds", category: "Sports", image: "/technova.png", price: 250 },
  { _id: "6", title: "Ignite Startup Pitch", description: "Turn your ideas into reality. Pitch to real investors and founders.", date: "2024-07-15", deadline: "2024-07-12", venue: "Innovation Hub", category: "Business", image: "/ignite.png", price: 0 },
  { _id: "7", title: "AI & ML Workshop", description: "Deep dive into artificial intelligence with hands-on labs.", date: "2024-07-20", deadline: "2024-07-18", venue: "Lab Block A", category: "Workshop", image: "/technova.png", price: 499 },
  { _id: "8", title: "Udaan Sports Day", description: "Annual inter-department sports competition with 15+ events.", date: "2024-07-25", deadline: "2024-07-22", venue: "Sports Ground", category: "Sports", image: "/ignite.png", price: 0 },
];

const CATEGORIES = [
  { label: "All Events", value: "All", icon: Flame },
  { label: "Technical", value: "Technical", icon: Zap },
  { label: "Cultural", value: "Cultural", icon: Music },
  { label: "Sports", value: "Sports", icon: Trophy },
  { label: "Business", value: "Business", icon: Briefcase },
  { label: "Workshop", value: "Workshop", icon: SlidersHorizontal },
];

export default function StudentBrowseEvents() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = ALL_EVENTS.filter(ev => {
    const matchSearch = ev.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || ev.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <StudentSidebar />
      <main className="flex-1 space-y-8 min-w-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Browse Events</h1>
            <p className="text-zinc-400 text-sm">Discover and register for events happening in your college.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 bg-white/5 px-4 py-2 rounded-2xl">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {filtered.length} events live
          </div>
        </div>

        {/* Search + Filter Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-brand-indigo transition-colors" />
            <input
              type="text"
              placeholder="Search events by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-brand-indigo/50 transition-all"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = category === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-brand-indigo border-brand-indigo text-white shadow-lg shadow-brand-indigo/20"
                    : "glass border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Events Grid */}
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filtered.map((ev, i) => (
              <motion.div
                key={ev._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <EventCard event={ev} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="glass rounded-[2.5rem] p-16 text-center border-white/5">
            <Search className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No events found</h3>
            <p className="text-zinc-400 text-sm">Try different filters or search terms.</p>
          </div>
        )}
      </main>
    </div>
  );
}
