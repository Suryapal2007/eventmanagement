"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper, Search, User, Users, Clock, X, BookOpen, Tag, Eye
} from "lucide-react";
import StudentSidebar from "@/components/StudentSidebar";

const UPDATES = [
  {
    id: 1,
    eventName: "Technova Hackathon 2024",
    category: "Technical",
    date: "Jun 15, 2024",
    teamLeader: "Rahul Mehta",
    members: [
      { name: "Priya Sharma", role: "Frontend Dev" },
      { name: "Karan Singh", role: "Backend Dev" },
      { name: "Aisha Khan", role: "UI/UX Designer" },
    ],
    summary: "A spectacular 24-hour hackathon with 128 participants and groundbreaking innovations.",
    description: `The Technova Hackathon 2024 kicked off on June 15th at 9:00 AM in the Main Auditorium with tremendous energy. Over 128 participants formed 32 teams across domains like AI/ML, Web3, IoT, and Sustainability.

Opening Ceremony: Chief Guest Dr. Arvind Patel (CTO, InnovateTech) inaugurated the event with an inspiring keynote on the future of technology. Teams received their problem statements spanning 5 categories.

During the Hackathon: Teams worked tirelessly through the night. The organizing team ensured smooth operations — providing meals, mentorship sessions every 3 hours, and technical support. Notable moments included a midnight coding frenzy and a spontaneous debugging workshop by industry mentor Sneha Kapoor.

Judging Round: 12 shortlisted teams presented their solutions to a panel of 5 judges from top tech companies. Evaluation criteria included innovation (30%), technical complexity (30%), business viability (20%), and presentation (20%).

Results: Team "BitBusters" won first place with their AI-powered crop disease detection app. Runner-up "CodeNova" built a real-time sign language translator. The event concluded with prize distribution, certificates, and a group photo session.

Impact: Participants reported a 94% satisfaction rate. Several projects are being incubated at the college's startup cell.`,
    image: "/technova.png",
    views: 214,
  },
  {
    id: 2,
    eventName: "Euphoria Cultural Fest",
    category: "Cultural",
    date: "Jun 20, 2024",
    teamLeader: "Ananya Iyer",
    members: [
      { name: "Vikram Patel", role: "Stage Manager" },
      { name: "Diya Sharma", role: "Choreographer" },
      { name: "Arjun Nair", role: "Sound Engineer" },
      { name: "Meera Joshi", role: "Decoration Head" },
    ],
    summary: "A vibrant 2-day cultural extravaganza celebrating arts, music, dance, and fashion.",
    description: `Euphoria Cultural Fest 2024 was a grand celebration of campus talent and culture, held on June 20-21 at the Open Air Theater with over 95 registered participants and 500+ audience members.

Day 1 Highlights: The fest began with a traditional lamp-lighting ceremony. The day featured a Battle of Bands competition (6 bands performed), a solo singing contest, and a mesmerizing classical dance recital. The crowd favorite was the impromptu flash mob organized by the dance club.

Fashion Show: The evening culminated in the most awaited "Threads of India" fashion show, showcasing fusion traditional wear designed by students. It received a standing ovation from the audience.

Day 2 Highlights: Day 2 opened with an Open Mic Night that saw 15 performers share poetry, stand-up comedy, and storytelling. The afternoon hosted group dance competitions where 8 teams competed in styles ranging from Bollywood to contemporary.

Behind the Scenes: The core team of 20 volunteers worked for 3 weeks in preparation — building stage props, coordinating with vendors, managing registrations, and rehearsing performances. Special mention to the sound and lighting team for their flawless execution.

Closing Ceremony: Trophies were distributed to winners. The fest ended with a DJ night that carried the celebration past midnight.`,
    image: "/euphoria.png",
    views: 187,
  },
  {
    id: 3,
    eventName: "Ignite Startup Pitch 2024",
    category: "Business",
    date: "Jul 15, 2024",
    teamLeader: "Karan Bhatia",
    members: [
      { name: "Riya Desai", role: "Marketing" },
      { name: "Aryan Gupta", role: "Finance" },
      { name: "Sneha Patel", role: "Logistics" },
    ],
    summary: "30 student startups pitched their ideas to a panel of investors and industry mentors.",
    description: `Ignite Startup Pitch 2024 was the flagship entrepreneurship event of the year, organized at the Innovation Hub on July 15th. It brought together 30 student startup teams to present their business ideas to a distinguished panel.

Pre-Event Preparation: Teams underwent a rigorous 2-week bootcamp covering pitch deck design, financial modeling, and presentation skills. Mentors from IIT Bombay and IIM Ahmedabad conducted workshops during this period.

The Pitch Day: The event was structured in 3 rounds — Elevator Pitch (2 minutes), Full Pitch (8 minutes), and Q&A (5 minutes). Domains ranged from EdTech and HealthTech to AgriTech and Sustainability.

Notable Startups: "EduPath" (AI-driven personalized learning), "MedAlert" (smart medication reminder app), and "FarmEase" (drone-based crop monitoring) stood out with their innovative approaches.

Panel of Judges: The 5-member jury included two angel investors, a startup founder, a venture capitalist, and a professor from the entrepreneurship cell.

Results & Awards: EduPath won the Best Startup award and a seed funding offer of ₹5 lakhs. MedAlert received the Social Impact Award. 8 teams were selected for the college's incubation program.

Post-Event Impact: 3 teams have already filed for startup registration with DPIIT. The event was covered by 2 regional newspapers and a startup-focused YouTube channel.`,
    image: "/ignite.png",
    views: 142,
  },
];

const CATEGORIES = ["All", "Technical", "Cultural", "Business", "Sports", "Workshop"];

export default function StudentUpdatesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [openId, setOpenId] = useState<number | null>(null);

  const filtered = UPDATES.filter(u => {
    const matchSearch = u.eventName.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || u.category === category;
    return matchSearch && matchCat;
  });

  const open = UPDATES.find(u => u.id === openId);

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <StudentSidebar />
      <main className="flex-1 space-y-6 min-w-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1 flex items-center gap-3">
              <Newspaper className="w-7 h-7 text-brand-indigo" /> Event Updates
            </h1>
            <p className="text-zinc-400 text-sm">Read detailed reports posted by event organizers.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 bg-white/5 px-4 py-2 rounded-2xl whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {UPDATES.length} updates live
          </div>
        </div>

        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-brand-indigo transition-colors" />
          <input
            type="text"
            placeholder="Search event updates..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-brand-indigo/50 transition-all"
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition-all whitespace-nowrap ${
                category === cat
                  ? "bg-brand-indigo border-brand-indigo text-white shadow-lg shadow-brand-indigo/20"
                  : "glass border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Updates List */}
        <div className="space-y-5">
          {filtered.map((upd, i) => (
            <motion.div
              key={upd.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-3xl border-white/5 overflow-hidden cursor-pointer hover:border-white/10 transition-all group"
              onClick={() => setOpenId(upd.id)}
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-56 h-44 md:h-auto flex-shrink-0 overflow-hidden">
                  <img src={upd.image} alt={upd.eventName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
                </div>
                <div className="flex-1 p-6 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-brand-indigo/20 border border-brand-indigo/30 text-brand-indigo text-[10px] font-bold uppercase tracking-wider">{upd.category}</span>
                    <span className="flex items-center gap-1 text-xs text-zinc-500"><Clock className="w-3 h-3" />{upd.date}</span>
                    <span className="flex items-center gap-1 text-xs text-zinc-600 ml-auto"><Eye className="w-3 h-3" />{upd.views} views</span>
                  </div>

                  <h3 className="font-bold text-xl mb-2 group-hover:text-brand-indigo transition-colors">{upd.eventName}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">{upd.summary}</p>

                  {/* Team preview */}
                  <div className="flex flex-wrap gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-brand-indigo flex items-center justify-center text-white text-xs font-bold">{upd.teamLeader[0]}</div>
                      <div>
                        <p className="text-[10px] text-zinc-500">Team Leader</p>
                        <p className="font-bold text-xs">{upd.teamLeader}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 pl-2 border-l border-white/10">
                      {upd.members.slice(0, 3).map((m, i) => (
                        <div key={i} className="w-7 h-7 rounded-full bg-brand-violet/20 border border-brand-violet/30 flex items-center justify-center text-brand-violet text-[10px] font-bold -ml-1 first:ml-0">
                          {m.name[0]}
                        </div>
                      ))}
                      {upd.members.length > 3 && (
                        <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-zinc-400 text-[10px] font-bold -ml-1">
                          +{upd.members.length - 3}
                        </div>
                      )}
                      <span className="text-xs text-zinc-500 ml-1">{upd.members.length} members</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-brand-indigo text-sm font-bold group-hover:gap-3 transition-all">
                    <BookOpen className="w-4 h-4" /> Read Full Report →
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="glass rounded-[2.5rem] p-16 text-center border-white/5">
              <Newspaper className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No updates found</h3>
              <p className="text-zinc-400 text-sm">Try a different search or category.</p>
            </div>
          )}
        </div>
      </main>

      {/* Full Article Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setOpenId(null)}
          >
            <motion.article
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="glass-morphism w-full max-w-3xl rounded-[2.5rem] overflow-hidden my-8 border-white/10 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Banner */}
              <div className="relative h-64">
                <img src={open.image} alt={open.eventName} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <button onClick={() => setOpenId(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all">
                  <X className="w-5 h-5 text-white" />
                </button>
                <div className="absolute bottom-6 left-8 right-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-brand-violet/80 text-white text-[10px] font-bold uppercase tracking-wider">{open.category}</span>
                    <span className="text-white/70 text-xs">{open.date}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">{open.eventName}</h2>
                </div>
              </div>

              <div className="p-8 space-y-7">
                {/* Summary */}
                <p className="text-zinc-300 text-base leading-relaxed border-l-4 border-brand-indigo pl-4 italic">{open.summary}</p>

                {/* Organizing Team */}
                <div className="glass rounded-3xl border-white/5 p-6">
                  <h4 className="font-bold text-base mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-brand-violet" /> Organizing Team
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {/* Leader */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-brand-indigo/10 border border-brand-indigo/30">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-indigo to-brand-purple flex items-center justify-center text-white font-bold">
                        {open.teamLeader[0]}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{open.teamLeader}</p>
                        <p className="text-[10px] text-brand-indigo font-bold uppercase tracking-wide">Team Leader</p>
                      </div>
                    </div>
                    {/* Members */}
                    {open.members.map((m, i) => (
                      <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10">
                        <div className="w-10 h-10 rounded-full bg-brand-violet/20 border border-brand-violet/20 flex items-center justify-center text-brand-violet font-bold">
                          {m.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{m.name}</p>
                          <p className="text-[10px] text-zinc-500">{m.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Report */}
                <div>
                  <h4 className="font-bold text-xl mb-5 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-brand-indigo" /> Detailed Event Report
                  </h4>
                  <div className="space-y-5">
                    {open.description.split("\n\n").map((para, i) => {
                      const isBold = para.match(/^[A-Z][^a-z]*:/);
                      const [heading, ...rest] = isBold ? para.split(": ") : ["", para];
                      return (
                        <div key={i}>
                          {heading && <h5 className="font-bold text-brand-indigo mb-1">{heading}:</h5>}
                          <p className="text-zinc-300 text-sm leading-relaxed">{rest.join(": ") || para}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Read-only notice */}
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-brand-indigo/5 border border-brand-indigo/20 text-sm text-zinc-400">
                  <Tag className="w-4 h-4 text-brand-indigo flex-shrink-0" />
                  This update was posted by the event organizer. Students can view only.
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
