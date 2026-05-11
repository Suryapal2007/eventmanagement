"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration attempt", formData);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl glass-morphism p-10 rounded-[2.5rem] relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-zinc-400">Join the CampusSphere community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-brand-indigo transition-colors" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-indigo/50 focus:ring-4 focus:ring-brand-indigo/10 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-indigo/50 focus:ring-4 focus:ring-brand-indigo/10 transition-all appearance-none cursor-pointer"
                >
                  <option value="student" className="bg-zinc-900">Student</option>
                  <option value="organizer" className="bg-zinc-900">Event Organizer</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-brand-indigo transition-colors" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-indigo/50 focus:ring-4 focus:ring-brand-indigo/10 transition-all"
                  placeholder="name@university.edu"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-brand-indigo transition-colors" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-indigo/50 focus:ring-4 focus:ring-brand-indigo/10 transition-all"
                  placeholder="Minimum 8 characters"
                  required
                />
              </div>
            </div>

            <div className="flex items-start gap-3 px-1 py-2">
              <input type="checkbox" id="terms" required className="mt-1 accent-brand-indigo" />
              <label htmlFor="terms" className="text-sm text-zinc-400">
                I agree to the <a href="#" className="text-zinc-300 underline">Terms of Service</a> and <a href="#" className="text-zinc-300 underline">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white font-bold shadow-lg shadow-brand-indigo/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              Create Account
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="mt-10 text-center text-zinc-400 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-indigo font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-indigo/10 blur-[100px] -z-0" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-purple/10 blur-[100px] -z-0" />
      </motion.div>
    </div>
  );
}
