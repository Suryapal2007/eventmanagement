"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, GraduationCap, Briefcase } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "organizer">("student");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Route based on selected role
    if (role === "student") {
      router.push("/dashboard/student");
    } else {
      router.push("/dashboard/organizer");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-morphism p-10 rounded-[2.5rem] relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-zinc-400">Login to your CampusSphere account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selector */}
            <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl glass border-white/10">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                  role === "student"
                    ? "bg-brand-indigo text-white shadow-lg shadow-brand-indigo/20"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                <GraduationCap className="w-4 h-4" /> Student
              </button>
              <button
                type="button"
                onClick={() => setRole("organizer")}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                  role === "organizer"
                    ? "bg-brand-violet text-white shadow-lg shadow-brand-violet/20"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                <Briefcase className="w-4 h-4" /> Organizer
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-brand-indigo transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-indigo/50 focus:ring-4 focus:ring-brand-indigo/10 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white font-bold shadow-lg shadow-brand-indigo/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-zinc-500">Or continue with</span>
              </div>
            </div>

            <button className="w-full py-4 rounded-2xl glass border-white/10 font-medium hover:bg-white/5 transition-all flex items-center justify-center gap-3">
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
              Google Account
            </button>
          </div>

          <p className="mt-10 text-center text-zinc-400 text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-brand-indigo font-bold hover:underline">
              Create one
            </Link>
          </p>
        </div>

        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-indigo/10 blur-3xl -z-0" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-purple/10 blur-3xl -z-0" />
      </motion.div>
    </div>
  );
}
