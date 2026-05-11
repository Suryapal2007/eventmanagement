"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Users, Megaphone, AlertCircle, CheckCircle, Trash2, Send, X } from "lucide-react";
import OrganizerSidebar from "@/components/OrganizerSidebar";

const NOTIFICATIONS = [
  { id: 1, type: "registration", icon: Users, title: "New Registration Spike", message: "50 new registrations for 'Technova Hackathon 2024' in the last 24 hours.", time: "1 hour ago", read: false, color: "text-brand-violet", bg: "bg-brand-violet/10" },
  { id: 2, type: "alert", icon: AlertCircle, title: "Registration Closing Soon", message: "Euphoria Cultural Fest registration closes in 2 days. 55 slots remaining.", time: "3 hours ago", read: false, color: "text-amber-400", bg: "bg-amber-400/10" },
  { id: 3, type: "announcement", icon: Megaphone, title: "Event Approved", message: "Your event 'Ignite Startup Pitch' has been approved by the admin.", time: "1 day ago", read: true, color: "text-green-400", bg: "bg-green-400/10" },
  { id: 4, type: "system", icon: CheckCircle, title: "Certificates Generated", message: "220 certificates for 'Technova Hackathon 2023' have been auto-generated.", time: "3 days ago", read: true, color: "text-teal-400", bg: "bg-teal-400/10" },
];

export default function OrganizerNotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [showCompose, setShowCompose] = useState(false);
  const [announcement, setAnnouncement] = useState({ title: "", message: "", audience: "all" });

  const deleteNotif = (id: number) => setNotifications(n => n.filter(n => n.id !== id));
  const markRead = (id: number) => setNotifications(n => n.map(notif => notif.id === id ? { ...notif, read: true } : notif));
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <OrganizerSidebar />
      <main className="flex-1 space-y-6 min-w-0">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1 flex items-center gap-3">
              Notifications
              {unreadCount > 0 && <span className="px-2.5 py-1 rounded-full bg-brand-violet text-white text-sm font-bold">{unreadCount}</span>}
            </h1>
            <p className="text-zinc-400 text-sm">System alerts and event activity updates.</p>
          </div>
          <button
            onClick={() => setShowCompose(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-violet text-white font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-brand-violet/20"
          >
            <Send className="w-4 h-4" /> Send Announcement
          </button>
        </div>

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
                  <h3 className="text-xl font-bold">Send Announcement</h3>
                  <button onClick={() => setShowCompose(false)} className="p-2 rounded-full glass border-white/10 hover:bg-white/10 transition-all">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 block">Audience</label>
                    <select
                      value={announcement.audience}
                      onChange={e => setAnnouncement({ ...announcement, audience: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-brand-violet/50 transition-all text-sm appearance-none"
                    >
                      <option value="all" className="bg-zinc-900">All Registrants</option>
                      <option value="technova" className="bg-zinc-900">Technova Hackathon</option>
                      <option value="euphoria" className="bg-zinc-900">Euphoria Cultural Fest</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 block">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Important Schedule Update"
                      value={announcement.title}
                      onChange={e => setAnnouncement({ ...announcement, title: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-brand-violet/50 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 block">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Write your announcement here..."
                      value={announcement.message}
                      onChange={e => setAnnouncement({ ...announcement, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-brand-violet/50 transition-all text-sm resize-none"
                    />
                  </div>
                  <button
                    onClick={() => setShowCompose(false)}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-violet to-brand-purple text-white font-bold shadow-lg shadow-brand-violet/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" /> Send to Participants
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification List */}
        <div className="space-y-3">
          <AnimatePresence>
            {notifications.map((notif, i) => {
              const Icon = notif.icon;
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05 }}
                  className={`glass rounded-2xl border-white/5 p-5 flex items-start gap-4 ${!notif.read ? "border-l-2 border-l-brand-violet" : ""}`}
                >
                  <div className={`w-10 h-10 rounded-2xl ${notif.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${notif.color}`} />
                  </div>
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => markRead(notif.id)}>
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`font-bold text-sm ${!notif.read ? "text-white" : "text-zinc-300"}`}>{notif.title}</p>
                      {!notif.read && <span className="w-2 h-2 rounded-full bg-brand-violet flex-shrink-0" />}
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed">{notif.message}</p>
                    <p className="text-zinc-600 text-xs mt-2">{notif.time}</p>
                  </div>
                  <button
                    onClick={() => deleteNotif(notif.id)}
                    className="p-2 rounded-xl hover:bg-rose-500/10 hover:text-rose-400 text-zinc-600 transition-all flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
