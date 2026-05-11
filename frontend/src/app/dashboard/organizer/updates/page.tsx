"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper, Plus, X, User, Users, CalendarDays,
  Tag, AlignLeft, CheckCircle, Edit, Trash2, Eye, Clock, ImageIcon
} from "lucide-react";
import OrganizerSidebar from "@/components/OrganizerSidebar";

interface Member {
  name: string;
  role: string;
}

interface Update {
  id: number;
  eventName: string;
  category: string;
  date: string;
  teamLeader: string;
  members: Member[];
  summary: string;
  description: string;
  image: string;
  published: boolean;
}

const INITIAL_UPDATES: Update[] = [
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

**Opening Ceremony:** Chief Guest Dr. Arvind Patel (CTO, InnovateTech) inaugurated the event with an inspiring keynote on the future of technology. Teams received their problem statements spanning 5 categories.

**During the Hackathon:** Teams worked tirelessly through the night. The organizing team ensured smooth operations — providing meals, mentorship sessions every 3 hours, and technical support. Notable moments included a midnight coding frenzy and a spontaneous debugging workshop by industry mentor Sneha Kapoor.

**Judging Round:** 12 shortlisted teams presented their solutions to a panel of 5 judges from top tech companies. Evaluation criteria included innovation (30%), technical complexity (30%), business viability (20%), and presentation (20%).

**Results:** Team "BitBusters" won first place with their AI-powered crop disease detection app. Runner-up "CodeNova" built a real-time sign language translator. The event concluded with prize distribution, certificates, and a group photo session.

**Impact:** Participants reported a 94% satisfaction rate. Several projects are being incubated at the college's startup cell.`,
    image: "/technova.png",
    published: true,
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

**Day 1 Highlights:** The fest began with a traditional lamp-lighting ceremony. The day featured a Battle of Bands competition (6 bands performed), a solo singing contest, and a mesmerizing classical dance recital. The crowd favorite was the impromptu flash mob organized by the dance club.

**Fashion Show:** The evening culminated in the most awaited "Threads of India" fashion show, showcasing fusion traditional wear designed by students. It received a standing ovation from the audience.

**Day 2 Highlights:** Day 2 opened with an Open Mic Night that saw 15 performers share poetry, stand-up comedy, and storytelling. The afternoon hosted group dance competitions where 8 teams competed in styles ranging from Bollywood to contemporary.

**Behind the Scenes:** The core team of 20 volunteers worked for 3 weeks in preparation — building stage props, coordinating with vendors, managing registrations, and rehearsing performances. Special mention to the sound and lighting team for their flawless execution.

**Closing Ceremony:** Trophies were distributed to winners. The fest ended with a DJ night that carried the celebration past midnight.`,
    image: "/euphoria.png",
    published: true,
  },
];

const CATEGORIES = ["Technical", "Cultural", "Sports", "Business", "Workshop", "Social"];

export default function OrganizerUpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>(INITIAL_UPDATES);
  const [showForm, setShowForm] = useState(false);
  const [previewId, setPreviewId] = useState<number | null>(null);
  const [form, setForm] = useState({
    eventName: "",
    category: "Technical",
    date: "",
    teamLeader: "",
    members: [{ name: "", role: "" }] as Member[],
    summary: "",
    description: "",
  });

  const addMember = () => setForm(f => ({ ...f, members: [...f.members, { name: "", role: "" }] }));
  const removeMember = (i: number) => setForm(f => ({ ...f, members: f.members.filter((_, idx) => idx !== i) }));
  const updateMember = (i: number, field: keyof Member, val: string) =>
    setForm(f => ({ ...f, members: f.members.map((m, idx) => idx === i ? { ...m, [field]: val } : m) }));

  const handlePublish = () => {
    if (!form.eventName || !form.description) return;
    const newUpdate: Update = {
      id: Date.now(),
      ...form,
      image: "/technova.png",
      published: true,
      date: form.date || new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    };
    setUpdates(prev => [newUpdate, ...prev]);
    setShowForm(false);
    setForm({ eventName: "", category: "Technical", date: "", teamLeader: "", members: [{ name: "", role: "" }], summary: "", description: "" });
  };

  const deleteUpdate = (id: number) => setUpdates(prev => prev.filter(u => u.id !== id));
  const preview = updates.find(u => u.id === previewId);

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <OrganizerSidebar />
      <main className="flex-1 space-y-6 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Event Updates</h1>
            <p className="text-zinc-400 text-sm">Post detailed event reports. Students can view these updates.</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-violet text-white font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-brand-violet/20"
          >
            <Plus className="w-4 h-4" /> Post Update
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Updates", value: updates.length },
            { label: "Published", value: updates.filter(u => u.published).length },
            { label: "Events Covered", value: updates.length },
          ].map((s, i) => (
            <div key={i} className="glass p-5 rounded-3xl border-white/5 text-center">
              <p className="text-3xl font-bold">{s.value}</p>
              <p className="text-zinc-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Updates Grid */}
        <div className="space-y-5">
          <AnimatePresence>
            {updates.map((upd, i) => (
              <motion.div
                key={upd.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.06 }}
                className="glass rounded-3xl border-white/5 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row gap-0">
                  {/* Image */}
                  <img src={upd.image} alt={upd.eventName} className="w-full md:w-48 h-40 md:h-auto object-cover flex-shrink-0" />

                  {/* Content */}
                  <div className="flex-1 p-6 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="px-3 py-1 rounded-full bg-brand-violet/20 border border-brand-violet/30 text-brand-violet text-[10px] font-bold uppercase tracking-wider">{upd.category}</span>
                          <span className="flex items-center gap-1 text-xs text-zinc-500"><Clock className="w-3 h-3" />{upd.date}</span>
                          {upd.published && <span className="flex items-center gap-1 text-[10px] text-green-400 font-bold"><CheckCircle className="w-3 h-3" /> Published</span>}
                        </div>
                        <h3 className="font-bold text-xl">{upd.eventName}</h3>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => setPreviewId(upd.id)} className="p-2 rounded-xl glass border-white/10 hover:bg-white/10 transition-all" title="Preview">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteUpdate(upd.id)} className="p-2 rounded-xl hover:bg-rose-500/10 text-zinc-500 hover:text-rose-400 transition-all glass border-white/10" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{upd.summary}</p>

                    {/* Team */}
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-brand-indigo/20 flex items-center justify-center">
                          <User className="w-3.5 h-3.5 text-brand-indigo" />
                        </div>
                        <div>
                          <p className="text-[10px] text-zinc-500 leading-none">Team Leader</p>
                          <p className="font-bold text-xs">{upd.teamLeader}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-brand-violet/20 flex items-center justify-center">
                          <Users className="w-3.5 h-3.5 text-brand-violet" />
                        </div>
                        <div>
                          <p className="text-[10px] text-zinc-500 leading-none">Team Members</p>
                          <p className="font-bold text-xs">{upd.members.length} members</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Create Update Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="glass-morphism w-full max-w-2xl rounded-[2.5rem] p-8 my-8 border-brand-violet/20 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">Post Event Update</h3>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-full glass border-white/10 hover:bg-white/10 transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5">
                {/* Event Name + Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 block">Event Name</label>
                    <div className="relative">
                      <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input type="text" placeholder="e.g. Technova Hackathon 2024"
                        value={form.eventName} onChange={e => setForm({ ...form, eventName: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-brand-violet/50 text-sm transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 block">Category</label>
                    <div className="relative">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-brand-violet/50 text-sm appearance-none transition-all">
                        {CATEGORIES.map(c => <option key={c} className="bg-zinc-900">{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Date + Team Leader */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 block">Event Date</label>
                    <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-brand-violet/50 text-sm transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 block">Team Leader Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input type="text" placeholder="e.g. Rahul Mehta"
                        value={form.teamLeader} onChange={e => setForm({ ...form, teamLeader: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-brand-violet/50 text-sm transition-all" />
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Team Members</label>
                    <button type="button" onClick={addMember}
                      className="flex items-center gap-1 text-xs font-bold text-brand-violet hover:text-brand-purple transition-colors">
                      <Plus className="w-3.5 h-3.5" /> Add Member
                    </button>
                  </div>
                  <div className="space-y-2">
                    {form.members.map((m, i) => (
                      <div key={i} className="flex gap-2">
                        <input type="text" placeholder="Member name"
                          value={m.name} onChange={e => updateMember(i, "name", e.target.value)}
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 outline-none focus:border-brand-violet/50 text-sm transition-all" />
                        <input type="text" placeholder="Role (e.g. Dev)"
                          value={m.role} onChange={e => updateMember(i, "role", e.target.value)}
                          className="w-36 bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 outline-none focus:border-brand-violet/50 text-sm transition-all" />
                        {form.members.length > 1 && (
                          <button onClick={() => removeMember(i)} className="p-2.5 rounded-xl hover:bg-rose-500/10 text-zinc-500 hover:text-rose-400 transition-all glass border-white/10">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 block">Short Summary</label>
                  <input type="text" placeholder="One-line overview of the event..."
                    value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-brand-violet/50 text-sm transition-all" />
                </div>

                {/* Full Description */}
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 block">Detailed Description</label>
                  <textarea rows={7} placeholder="Describe what happened, how it was organized, key highlights, results, impact..."
                    value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-brand-violet/50 text-sm resize-none transition-all" />
                </div>

                {/* Upload Banner */}
                <div className="relative">
                  <div className="w-full h-24 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center gap-3 bg-white/3 hover:bg-white/5 cursor-pointer transition-all">
                    <ImageIcon className="w-6 h-6 text-zinc-500" />
                    <span className="text-sm text-zinc-400">Upload event photo (optional)</span>
                  </div>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                </div>

                <button onClick={handlePublish}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-violet to-brand-purple text-white font-bold shadow-lg shadow-brand-violet/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                  <Newspaper className="w-5 h-5" /> Publish Update
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
            onClick={() => setPreviewId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="glass-morphism w-full max-w-3xl rounded-[2.5rem] overflow-hidden my-8 border-white/10 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <img src={preview.image} alt={preview.eventName} className="w-full h-56 object-cover" />
              <div className="p-8">
                <button onClick={() => setPreviewId(null)} className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-all">
                  <X className="w-4 h-4 text-white" />
                </button>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-brand-violet/20 border border-brand-violet/30 text-brand-violet text-[10px] font-bold uppercase tracking-wider">{preview.category}</span>
                  <span className="text-xs text-zinc-500">{preview.date}</span>
                </div>
                <h2 className="text-3xl font-bold mb-2">{preview.eventName}</h2>
                <p className="text-zinc-400 mb-6">{preview.summary}</p>

                {/* Team */}
                <div className="glass rounded-3xl border-white/5 p-5 mb-6">
                  <h4 className="font-bold mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-brand-violet" /> Organizing Team</h4>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-brand-indigo/10 border border-brand-indigo/20">
                      <div className="w-7 h-7 rounded-full bg-brand-indigo flex items-center justify-center text-white text-xs font-bold">{preview.teamLeader[0]}</div>
                      <div>
                        <p className="font-bold text-xs">{preview.teamLeader}</p>
                        <p className="text-[10px] text-brand-indigo">Team Leader</p>
                      </div>
                    </div>
                    {preview.members.map((m, i) => (
                      <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
                        <div className="w-7 h-7 rounded-full bg-brand-violet/20 flex items-center justify-center text-brand-violet text-xs font-bold">{m.name[0]}</div>
                        <div>
                          <p className="font-bold text-xs">{m.name}</p>
                          <p className="text-[10px] text-zinc-500">{m.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h4 className="font-bold text-lg">Event Report</h4>
                  {preview.description.split("\n\n").map((para, i) => (
                    <p key={i} className="text-zinc-300 text-sm leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
