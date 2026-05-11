"use client";

import { motion } from "framer-motion";
import { 
  Calendar, 
  Users, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Trophy,
  Globe
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-brand-indigo" />,
      title: "Seamless Management",
      description: "Create and manage events effortlessly with our intuitive dashboard."
    },
    {
      icon: <Users className="w-6 h-6 text-brand-violet" />,
      title: "Club Collaboration",
      description: "Dedicated spaces for clubs to coordinate and grow their community."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-purple" />,
      title: "Secure Ticketing",
      description: "QR-based secure entry and automated certificate generation."
    },
    {
      icon: <Zap className="w-6 h-6 text-brand-indigo" />,
      title: "Real-time Analytics",
      description: "Track registrations and engagement with live data insights."
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-brand-indigo/20 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4 text-brand-indigo" />
            <span className="text-zinc-400">Revolutionizing Campus Engagement</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight"
          >
            Where Campus Life <br />
            <span className="text-gradient">Comes Alive</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Discover exclusive workshops, hackathons, and cultural fests. 
            The all-in-one platform for students, organizers, and college clubs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a
              href="#events"
              className="group flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-indigo to-brand-purple text-white font-bold shadow-xl shadow-brand-indigo/20 hover:scale-105 transition-all"
            >
              Explore Events
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/events/create"
              className="px-8 py-4 rounded-full glass border-white/10 font-bold hover:bg-white/5 transition-all"
            >
              Create Event
            </Link>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-0 opacity-20 blur-[120px]">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-indigo rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-purple rounded-full" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-zinc-400">Everything you need to run successful events.</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-morphism p-8 rounded-3xl hover:border-brand-indigo/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass p-12 rounded-[3rem] grid grid-cols-1 md:grid-cols-3 gap-12 text-center border-white/5">
            <div>
              <div className="text-4xl font-extrabold text-gradient mb-2">500+</div>
              <div className="text-zinc-400 font-medium">Events Hosted</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-gradient mb-2">10k+</div>
              <div className="text-zinc-400 font-medium">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-gradient mb-2">50+</div>
              <div className="text-zinc-400 font-medium">Partner Clubs</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto glass-morphism p-16 rounded-[4rem] relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to transform <br /> your campus?</h2>
            <p className="text-xl text-zinc-400 mb-12">Join CampusSphere today and start building amazing experiences.</p>
            <a
              href="/register"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white text-black font-extrabold hover:scale-105 transition-all"
            >
              Get Started Now
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-indigo/20 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-purple/20 blur-[100px]" />
        </div>
      </section>
    </div>
  );
}
