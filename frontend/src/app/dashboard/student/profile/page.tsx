"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, GraduationCap, BookOpen, Edit3, Camera, Save, Key, Shield } from "lucide-react";
import StudentSidebar from "@/components/StudentSidebar";

export default function StudentProfilePage() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Sharma",
    email: "john.sharma@college.edu",
    phone: "+91 98765 43210",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    rollNo: "CSE/2022/047",
    bio: "Passionate about technology, startups, and building cool things. Always up for a hackathon!",
  });

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <StudentSidebar />
      <main className="flex-1 space-y-6 min-w-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">My Profile</h1>
            <p className="text-zinc-400 text-sm">Manage your student account details.</p>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
              editing
                ? "bg-green-500 text-white shadow-lg shadow-green-500/20 hover:scale-105"
                : "glass border-white/10 hover:bg-white/5"
            }`}
          >
            {editing ? <><Save className="w-4 h-4" /> Save Changes</> : <><Edit3 className="w-4 h-4" /> Edit Profile</>}
          </button>
        </div>

        {/* Avatar + Role Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl border-white/5 overflow-hidden"
        >
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-purple relative">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3C/g%3E%3C/svg%3E\")" }} />
          </div>
          <div className="px-8 pb-8 -mt-12 flex flex-col sm:flex-row items-start sm:items-end gap-6">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-3xl border-4 border-zinc-900 overflow-hidden shadow-xl">
                <img
                  src="/avatar.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {editing && (
                <label className="absolute inset-0 rounded-3xl bg-black/60 flex flex-col items-center justify-center cursor-pointer gap-1 opacity-0 hover:opacity-100 transition-opacity">
                  <Camera className="w-5 h-5 text-white" />
                  <span className="text-[10px] text-white font-bold">Change</span>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              )}
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-indigo/20 border border-brand-indigo/30 text-brand-indigo text-xs font-bold">
                  <GraduationCap className="w-3 h-3" /> Student
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/20 text-green-400 text-xs font-bold">
                  <Shield className="w-3 h-3" /> Verified
                </span>
              </div>
              <p className="text-zinc-400 text-sm mt-1">{profile.department} · {profile.year}</p>
              <p className="text-zinc-600 text-xs mt-0.5">Roll No: {profile.rollNo}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Info Form */}
          <div className="lg:col-span-2 glass rounded-3xl border-white/5 p-6 space-y-5">
            <h3 className="font-bold text-lg">Personal Information</h3>
            {[
              { label: "Full Name", key: "name", icon: User, type: "text" },
              { label: "Email Address", key: "email", icon: Mail, type: "email" },
              { label: "Phone Number", key: "phone", icon: Phone, type: "tel" },
              { label: "Department", key: "department", icon: BookOpen, type: "text" },
            ].map(field => {
              const Icon = field.icon;
              return (
                <div key={field.key} className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{field.label}</label>
                  <div className="relative group">
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-brand-indigo transition-colors" />
                    <input
                      type={field.type}
                      value={(profile as any)[field.key]}
                      disabled={!editing}
                      onChange={e => setProfile({ ...profile, [field.key]: e.target.value })}
                      className={`w-full border rounded-2xl py-3.5 pl-11 pr-4 outline-none transition-all text-sm ${
                        editing
                          ? "bg-white/5 border-white/10 focus:border-brand-indigo/50"
                          : "bg-transparent border-transparent text-zinc-300"
                      }`}
                    />
                  </div>
                </div>
              );
            })}

            {/* Bio */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Bio</label>
              <textarea
                rows={3}
                value={profile.bio}
                disabled={!editing}
                onChange={e => setProfile({ ...profile, bio: e.target.value })}
                className={`w-full border rounded-2xl py-3.5 px-4 outline-none transition-all text-sm resize-none ${
                  editing
                    ? "bg-white/5 border-white/10 focus:border-brand-indigo/50"
                    : "bg-transparent border-transparent text-zinc-300"
                }`}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="glass rounded-3xl border-white/5 p-6">
              <h3 className="font-bold text-lg mb-4">Activity Stats</h3>
              <div className="space-y-4">
                {[
                  { label: "Events Registered", value: "3" },
                  { label: "Events Attended", value: "5" },
                  { label: "Certificates Earned", value: "2" },
                  { label: "Reviews Given", value: "4" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-zinc-400 text-sm">{s.label}</span>
                    <span className="font-bold">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Change Password */}
            <div className="glass rounded-3xl border-white/5 p-6 space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Key className="w-5 h-5 text-brand-indigo" /> Security
              </h3>
              <input type="password" placeholder="Current password" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-brand-indigo/50 text-sm transition-all" />
              <input type="password" placeholder="New password" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 outline-none focus:border-brand-indigo/50 text-sm transition-all" />
              <button className="w-full py-3 rounded-2xl bg-brand-indigo text-white font-bold text-sm hover:scale-[1.02] transition-all shadow-lg shadow-brand-indigo/20">
                Update Password
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
