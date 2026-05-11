"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Plus, Sparkles } from "lucide-react";
import EventCard from "@/components/EventCard";
import Link from "next/link";

const MOCK_EVENTS = [
  {
    _id: "1",
    title: "Technova Hackathon 2024",
    description: "The ultimate 24-hour coding challenge. Show your skills and win big.",
    date: "2024-06-15",
    deadline: "2024-06-10",
    venue: "Main Auditorium",
    category: "Technical",
    image: "/technova.png",
    price: 0
  },
  {
    _id: "2",
    title: "Euphoria Cultural Fest",
    description: "Celebrate the spirit of campus life with music, dance, and fashion.",
    date: "2024-06-20",
    deadline: "2024-06-18",
    venue: "Open Air Theater",
    category: "Cultural",
    image: "/euphoria.png",
    price: 199
  },
  {
    _id: "3",
    title: "Innovision Tech Expo",
    description: "Witness the future of technology with groundbreaking projects and exhibits.",
    date: "2024-06-25",
    deadline: "2024-06-22",
    venue: "Lab Block C",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
    price: 0
  },
  {
    _id: "4",
    title: "Crescendo Battle of Bands",
    description: "The loudest competition in campus. May the best band win!",
    date: "2024-07-05",
    deadline: "2024-07-02",
    venue: "Sports Complex",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80",
    price: 99
  },
  {
    _id: "5",
    title: "Zenith Cricket Tournament",
    description: "Gear up for the most intense inter-college cricket league.",
    date: "2024-07-10",
    deadline: "2024-07-05",
    venue: "College Grounds",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80",
    price: 250
  },
  {
    _id: "6",
    title: "Ignite Startup Pitch",
    description: "Turn your ideas into reality. Pitch to real investors and founders.",
    date: "2024-07-15",
    deadline: "2024-07-12",
    venue: "Innovation Hub",
    category: "Business",
    image: "/ignite.png",
    price: 0
  }
];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Technical",
    "Cultural",
    "Workshop",
    "Business",
    "Sports",
    "Social",
    "Fitness"
  ];

  const filteredEvents = MOCK_EVENTS.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">

      {/* ── Hero Section with Sparkler Background ── */}
      <div className="relative w-full h-[480px] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('/events-bg.png')" }}
        />

        {/* Multi-layer dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-indigo/20 via-transparent to-brand-violet/20" />

        {/* Bokeh glow orbs */}
        <motion.div
          className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-amber-500/10 blur-[100px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-1/4 w-48 h-48 rounded-full bg-brand-violet/20 blur-[80px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-sm font-medium text-amber-300 mb-5"
          >
            <Sparkles className="w-4 h-4" />
            CampusEsoul Events — Live Now
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight"
          >
            Discover{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #f59e0b, #a855f7, #6366f1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Events
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-zinc-300 text-lg max-w-xl mb-8"
          >
            Explore ongoing and upcoming events in your college. Join the pulse of campus life!
          </motion.p>

          {/* Hero search bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex items-center w-full max-w-xl gap-3"
          >
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-brand-indigo transition-colors" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-brand-indigo/60 transition-all text-white placeholder:text-zinc-400"
              />
            </div>
            <button className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
              <SlidersHorizontal className="w-5 h-5 text-white" />
            </button>
            <Link
              href="/events/create"
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-brand-indigo text-white font-bold shadow-lg shadow-brand-indigo/30 hover:scale-105 transition-all whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Create
            </Link>
          </motion.div>
        </div>

        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
      </div>

      {/* ── Content Section ── */}
      <div className="px-6 max-w-7xl mx-auto pb-20">

        {/* Category filter + live count */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pt-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full border transition-all whitespace-nowrap text-sm font-medium ${
                  selectedCategory === category
                    ? "bg-brand-indigo border-brand-indigo text-white shadow-lg shadow-brand-indigo/20"
                    : "glass border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-500 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {filteredEvents.length} Events Live Now
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredEvents.map((event, i) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 glass rounded-[3rem] border-white/5">
            <h3 className="text-xl font-bold mb-2">No events found</h3>
            <p className="text-zinc-400">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}


const MOCK_EVENTS = [
  {
    _id: "1",
    title: "Technova Hackathon 2024",
    description: "The ultimate 24-hour coding challenge. Show your skills and win big.",
    date: "2024-06-15",
    deadline: "2024-06-10",
    venue: "Main Auditorium",
    category: "Technical",
    image: "/technova.png",
    price: 0
  },
  {
    _id: "2",
    title: "Euphoria Cultural Fest",
    description: "Celebrate the spirit of campus life with music, dance, and fashion.",
    date: "2024-06-20",
    deadline: "2024-06-18",
    venue: "Open Air Theater",
    category: "Cultural",
    image: "/euphoria.png",
    price: 199
  },
  {
    _id: "3",
    title: "Innovision Tech Expo",
    description: "Witness the future of technology with groundbreaking projects and exhibits.",
    date: "2024-06-25",
    deadline: "2024-06-22",
    venue: "Lab Block C",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
    price: 0
  },
  {
    _id: "4",
    title: "Crescendo Battle of Bands",
    description: "The loudest competition in campus. May the best band win!",
    date: "2024-07-05",
    deadline: "2024-07-02",
    venue: "Sports Complex",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80",
    price: 99
  },
  {
    _id: "5",
    title: "Zenith Cricket Tournament",
    description: "Gear up for the most intense inter-college cricket league.",
    date: "2024-07-10",
    deadline: "2024-07-05",
    venue: "College Grounds",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80",
    price: 250
  },
  {
    _id: "6",
    title: "Ignite Startup Pitch",
    description: "Turn your ideas into reality. Pitch to real investors and founders.",
    date: "2024-07-15",
    deadline: "2024-07-12",
    venue: "Innovation Hub",
    category: "Business",
    image: "/ignite.png",
    price: 0
  }
];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All", 
    "Technical", 
    "Cultural", 
    "Workshop", 
    "Business", 
    "Sports", 
    "Social", 
    "Fitness"
  ];

  const filteredEvents = MOCK_EVENTS.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold mb-4">Discover Events</h1>
          <p className="text-zinc-400">Explore ongoing and upcoming events in your college. Join the pulse of campus life!</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <Link 
            href="/events/create" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-brand-indigo text-white font-bold shadow-lg shadow-brand-indigo/20 hover:scale-105 transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Event
          </Link>
          <div className="relative w-full sm:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-brand-indigo transition-colors" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-brand-indigo/50 transition-all"
            />
          </div>
          <button className="p-3 rounded-2xl glass border-white/10 hover:bg-white/5 transition-all">
            <SlidersHorizontal className="w-6 h-6 text-zinc-400" />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full border transition-all whitespace-nowrap text-sm font-medium ${
                selectedCategory === category
                  ? "bg-brand-indigo border-brand-indigo text-white shadow-lg shadow-brand-indigo/20"
                  : "glass border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          {filteredEvents.length} Events Live Now
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-[3rem] border-white/5">
          <h3 className="text-xl font-bold mb-2">No events found</h3>
          <p className="text-zinc-400">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  );
}
