"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Star } from "lucide-react";
import OrganizerSidebar from "@/components/OrganizerSidebar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";

const registrationData = [
  { week: "Wk 1", registrations: 20 },
  { week: "Wk 2", registrations: 45 },
  { week: "Wk 3", registrations: 78 },
  { week: "Wk 4", registrations: 120 },
  { week: "Wk 5", registrations: 95 },
  { week: "Wk 6", registrations: 142 },
];

const eventPopularity = [
  { name: "Technova", registrations: 128 },
  { name: "Euphoria", registrations: 95 },
  { name: "Ignite", registrations: 45 },
  { name: "Crescendo", registrations: 74 },
];

const feedbackData = [
  { event: "Technova Hackathon", rating: 4.8, reviews: 92 },
  { event: "Euphoria Cultural Fest", rating: 4.6, reviews: 78 },
  { event: "Ignite Startup Pitch", rating: 4.9, reviews: 40 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass-morphism px-4 py-3 rounded-2xl text-sm">
        <p className="font-bold text-brand-indigo">{payload[0].value} registrations</p>
      </div>
    );
  }
  return null;
};

export default function ReportsPage() {
  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <OrganizerSidebar />
      <main className="flex-1 space-y-8 min-w-0">
        <div>
          <h1 className="text-3xl font-bold mb-1">Reports & Analytics</h1>
          <p className="text-zinc-400 text-sm">Track performance across all your events.</p>
        </div>

        {/* Registration Trend */}
        <div className="glass p-6 rounded-3xl border-white/5">
          <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-indigo" /> Registration Trend
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={registrationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="week" tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="registrations"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ fill: "#6366f1", r: 5 }}
                activeDot={{ r: 8, fill: "#a855f7" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Event Popularity */}
        <div className="glass p-6 rounded-3xl border-white/5">
          <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand-violet" /> Event Popularity
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={eventPopularity} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="registrations" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Feedback */}
        <div className="glass p-6 rounded-3xl border-white/5">
          <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400" /> Feedback Analysis
          </h2>
          <div className="space-y-4">
            {feedbackData.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5">
                <div className="flex-1">
                  <p className="font-bold text-sm">{f.event}</p>
                  <p className="text-zinc-500 text-xs">{f.reviews} reviews</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-amber-400" style={{ width: `${(f.rating / 5) * 100}%` }} />
                  </div>
                  <span className="text-amber-400 font-bold text-sm">{f.rating}</span>
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
