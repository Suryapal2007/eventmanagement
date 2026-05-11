"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, Send, Plus, Trash2, Pin, X, Calendar, Users, Tag } from "lucide-react";
import OrganizerSidebar from "@/components/OrganizerSidebar";

const INITIAL_ANNOUNCEMENTS = [
  { id: 1, title: "Venue Change for Technova Hackathon", body: "Due to maintenance, the hackathon will now be held in Lab Block B instead of Main Auditorium.", audience: "Technova Hackathon", time: "2 hours ago", pinned: true },
  { id: 2, title: "Registration Extended: Euphoria Fest", body: "We have extended the registration deadline by 3 days. Sign up before June 21st!", audience: "All Participants", time: "1 day ago", pinned: false },
  { id: 3, title: "Schedule Released: Startup Pitch", body: "The finalized schedule for Ignite Startup Pitch has been published. Check your email for details.", audience: "Ignite Startup Pitch", time: "3 days ago", pinned: false },
];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [showCompose, setShowCompose] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", audience: "All Participants", pin: false });
  const [sending, setSending] = useState(false);

  const handleSend = () => {
    if (!form.title || !form.body) return;
    setSending(true);
    setTimeout(() => {
      setAnnouncements(prev => [{
        id: Date.now(),
        title: form.title,
        body: form.body,
        audience: form.audience,
        time: "Just now",
        pinned: form.pin,
      }, ...prev]);
      setShowCompose(false);
      setSending(false);
      setForm({ title: "", body: "", audience: "All Participants", pin: false });
    }, 1000);
  };

  const deleteAnnouncement = (id: number) => setAnnouncements(prev => prev.filter(a => a.id !== id));
  const togglePin = (id: number) => setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, pinned: !a.pinned } : a));

  const sorted = [...announcements].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <OrganizerSidebar />
      <main className="flex-1 space-y-6 min-w-0">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Announcements</h1>
            <p className="text-zinc-400 text-sm">Post updates and important notices to your participants.</p>
          </div>
          <button
            onClick={() => setShowCompose(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-violet text-white font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-brand-violet/20"
          >
            <Plus className="w-4 h-4" /> New Announcement
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Posted", value: announcements.length },
            { label: "Pinned", value: announcements.filter(a => a.pinned).length },
            { label: "Reach (est.)", value: "268" },
          ].map((s, i) => (
            <div key={i} className="glass p-5 rounded-3xl border-white/5 text-center">
              <p className="text-3xl font-bold">{s.value}</p>
              <p className="text-zinc-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          <AnimatePresence>
            {sorted.map((ann, i) => (
              <motion.div
                key={ann.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, height: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`glass rounded-3xl border-white/5 p-6 relative ${ann.pinned ? "border-brand-violet/20 border" : ""}`}
              >
                {ann.pinned && (
                  <div className="absolute top-4 left-4">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-brand-violet bg-brand-violet/10 border border-brand-violet/20 px-2 py-1 rounded-full">
                      <Pin className="w-2.5 h-2.5" /> Pinned
                    </span>
                  </div>
                )}
                <div className="flex items-start justify-between gap-4 mt-1">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-brand-violet/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Megaphone className="w-5 h-5 text-brand-violet" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base">{ann.title}</h3>
                      <p className="text-zinc-400 text-sm mt-1 leading-relaxed">{ann.body}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                          <Users className="w-3.5 h-3.5" /> {ann.audience}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-zinc-600">
                          <Calendar className="w-3.5 h-3.5" /> {ann.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => togglePin(ann.id)}
                      className={`p-2 rounded-xl transition-all ${ann.pinned ? "bg-brand-violet/20 text-brand-violet" : "glass border-white/10 text-zinc-500 hover:text-white hover:bg-white/10"}`}
                      title={ann.pinned ? "Unpin" : "Pin"}
                    >
                      <Pin className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteAnnouncement(ann.id)}
                      className="p-2 rounded-xl glass border-white/10 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Compose Modal */}
      <AnimatePresence>
        {showCompose && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCompose(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-morphism w-full max-w-lg rounded-[2.5rem] p-8 border-brand-violet/20 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2"><Megaphone className="w-5 h-5 text-brand-violet" /> New Announcement</h3>
                <button onClick={() => setShowCompose(false)} className="p-2 rounded-full glass border-white/10 hover:bg-white/10 transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Audience */}
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 block">Audience</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <select
                      value={form.audience}
                      onChange={e => setForm({ ...form, audience: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 outline-none focus:border-brand-violet/50 transition-all text-sm appearance-none"
                    >
                      <option className="bg-zinc-900">All Participants</option>
                      <option className="bg-zinc-900">Technova Hackathon</option>
                      <option className="bg-zinc-900">Euphoria Cultural Fest</option>
                      <option className="bg-zinc-900">Ignite Startup Pitch</option>
                    </select>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 block">Title</label>
                  <input
                    type="text"
                    placeholder="Announcement subject..."
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-brand-violet/50 transition-all text-sm"
                  />
                </div>

                {/* Body */}
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 block">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Write your announcement here..."
                    value={form.body}
                    onChange={e => setForm({ ...form, body: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-brand-violet/50 transition-all text-sm resize-none"
                  />
                </div>

                {/* Pin Toggle */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setForm({ ...form, pin: !form.pin })}
                    className={`relative w-11 h-6 rounded-full transition-colors ${form.pin ? "bg-brand-violet" : "bg-white/10"}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${form.pin ? "translate-x-6" : "translate-x-1"}`} />
                  </div>
                  <span className="text-sm font-medium">Pin this announcement</span>
                </label>

                <button
                  onClick={handleSend}
                  disabled={sending || !form.title || !form.body}
                  className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    sending || !form.title || !form.body
                      ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-brand-violet to-brand-purple text-white shadow-lg shadow-brand-violet/20 hover:scale-[1.02]"
                  }`}
                >
                  {sending ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Post Announcement</>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
