"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Ticket, Star, Megaphone, AlertCircle, CheckCircle, Trash2 } from "lucide-react";
import StudentSidebar from "@/components/StudentSidebar";

const NOTIFICATIONS = [
  { id: 1, type: "registration", icon: Ticket, title: "Registration Confirmed", message: "Your registration for Technova Hackathon 2024 is confirmed. Check your ticket!", time: "2 hours ago", read: false, color: "text-brand-indigo", bg: "bg-brand-indigo/10" },
  { id: 2, type: "reminder", icon: AlertCircle, title: "Event Reminder", message: "Euphoria Cultural Fest starts in 2 days. Don't miss it at Open Air Theater.", time: "5 hours ago", read: false, color: "text-amber-400", bg: "bg-amber-400/10" },
  { id: 3, type: "announcement", icon: Megaphone, title: "New Event: Udaan Sports Day", message: "Registrations are now open for Udaan Sports Day. Free entry for all students!", time: "1 day ago", read: true, color: "text-green-400", bg: "bg-green-400/10" },
  { id: 4, type: "feedback", icon: Star, title: "Rate Your Experience", message: "You attended 'Ignite Startup Pitch'. Share your feedback and help future attendees.", time: "3 days ago", read: true, color: "text-purple-400", bg: "bg-purple-400/10" },
  { id: 5, type: "system", icon: CheckCircle, title: "Certificate Ready", message: "Your participation certificate for 'AI & ML Workshop' is now available for download.", time: "5 days ago", read: true, color: "text-teal-400", bg: "bg-teal-400/10" },
];

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const displayed = filter === "unread"
    ? notifications.filter(n => !n.read)
    : notifications;

  const markAllRead = () => setNotifications(n => n.map(notif => ({ ...notif, read: true })));
  const deleteNotif = (id: number) => setNotifications(n => n.filter(notif => notif.id !== id));
  const markRead = (id: number) => setNotifications(n => n.map(notif => notif.id === id ? { ...notif, read: true } : notif));

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <StudentSidebar />
      <main className="flex-1 space-y-6 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1 flex items-center gap-3">
              Notifications
              {unreadCount > 0 && (
                <span className="px-2.5 py-1 rounded-full bg-brand-indigo text-white text-sm font-bold">{unreadCount}</span>
              )}
            </h1>
            <p className="text-zinc-400 text-sm">Stay up to date with your events and registrations.</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-brand-indigo text-sm font-bold hover:underline whitespace-nowrap">
              Mark all as read
            </button>
          )}
        </div>

        {/* Filter */}
        <div className="flex gap-3">
          {(["all", "unread"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all capitalize ${
                filter === f
                  ? "bg-brand-indigo border-brand-indigo text-white"
                  : "glass border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              {f === "all" ? `All (${notifications.length})` : `Unread (${unreadCount})`}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="space-y-3">
          <AnimatePresence>
            {displayed.length === 0 ? (
              <div className="glass rounded-[2.5rem] p-16 text-center border-white/5">
                <Bell className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">All caught up!</h3>
                <p className="text-zinc-400 text-sm">No unread notifications.</p>
              </div>
            ) : (
              displayed.map((notif, i) => {
                const Icon = notif.icon;
                return (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`glass rounded-2xl border-white/5 p-5 flex items-start gap-4 transition-all ${
                      !notif.read ? "border-l-2 border-l-brand-indigo" : ""
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-2xl ${notif.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Icon className={`w-5 h-5 ${notif.color}`} />
                    </div>
                    <div className="flex-1 min-w-0" onClick={() => markRead(notif.id)}>
                      <div className="flex items-center gap-2 mb-1">
                        <p className={`font-bold text-sm ${!notif.read ? "text-white" : "text-zinc-300"}`}>{notif.title}</p>
                        {!notif.read && <span className="w-2 h-2 rounded-full bg-brand-indigo flex-shrink-0" />}
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
              })
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
