"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Tag, Clock, ArrowUpRight, X, CheckCircle, User, Mail, Phone } from "lucide-react";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  category: string;
  image: string;
  price: number;
  deadline?: string;
}

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
    setTimeout(() => {
      setShowModal(false);
      setRegistered(false);
    }, 2500);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-morphism group overflow-hidden rounded-3xl hover:border-brand-indigo/30 transition-all flex flex-col h-full"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80"}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full glass border-white/20 text-xs font-bold text-white backdrop-blur-md capitalize">
              {event.category}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${
              event.price === 0 ? "bg-green-500/80 text-white" : "bg-brand-indigo/80 text-white"
            }`}>
              {event.price === 0 ? "FREE" : `₹${event.price}`}
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-brand-indigo text-xs font-bold">
              <Calendar className="w-4 h-4" />
              <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            {event.deadline && (
              <div className="flex items-center gap-1 text-rose-400 text-[10px] font-bold uppercase tracking-wider">
                <Clock className="w-3 h-3" />
                <span>Ends {new Date(event.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
            )}
          </div>

          <h3 className="text-xl font-bold mb-3 line-clamp-1 group-hover:text-brand-indigo transition-colors">
            {event.title}
          </h3>

          <p className="text-zinc-400 text-sm line-clamp-2 mb-6 flex-grow">
            {event.description}
          </p>

          <div className="flex items-center gap-2 text-zinc-500 text-xs mb-6">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white font-bold shadow-lg shadow-brand-indigo/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm"
            >
              Register Now
            </button>
            <button className="px-4 py-3 rounded-2xl glass border-white/10 hover:bg-white/5 transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Registration Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-morphism w-full max-w-md rounded-[2.5rem] p-8 relative border-brand-indigo/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full glass border-white/10 hover:bg-white/10 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              {registered ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">You're Registered! 🎉</h3>
                  <p className="text-zinc-400 text-sm">Check your email for confirmation and event details.</p>
                </motion.div>
              ) : (
                <>
                  {/* Event info at top of modal */}
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                    <img src={event.image} alt={event.title} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{event.title}</h3>
                      <p className="text-zinc-400 text-xs mt-1">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                      <p className="text-brand-indigo text-xs font-bold mt-1">{event.venue}</p>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold mb-6">Complete Registration</h4>

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-brand-indigo transition-colors" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-brand-indigo/50 transition-all text-sm"
                        required
                      />
                    </div>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-brand-indigo transition-colors" />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-brand-indigo/50 transition-all text-sm"
                        required
                      />
                    </div>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-brand-indigo transition-colors" />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-brand-indigo/50 transition-all text-sm"
                        required
                      />
                    </div>

                    {event.deadline && (
                      <div className="flex items-center gap-2 text-rose-400 text-xs bg-rose-500/10 rounded-2xl px-4 py-3 border border-rose-500/20">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span>Registration closes on <strong>{new Date(event.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</strong></span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white font-bold shadow-lg shadow-brand-indigo/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      {event.price === 0 ? "Confirm Free Registration" : `Pay ₹${event.price} & Register`}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
