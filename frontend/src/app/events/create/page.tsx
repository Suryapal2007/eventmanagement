"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Image as ImageIcon, 
  Calendar, 
  MapPin, 
  Tag, 
  Type, 
  AlignLeft, 
  DollarSign, 
  Users, 
  ArrowRight,
  Sparkles,
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle,
  Clock
} from "lucide-react";
import Link from "next/link";

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    category: "Technical",
    price: 0,
    capacity: "",
    image: null as File | null
  });
  const [isFree, setIsFree] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [registrationDeadline, setRegistrationDeadline] = useState("");

  const categories = ["Technical", "Cultural", "Workshop", "Business", "Sports", "Other"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating event:", formData);
    // Logic to send to backend API
  };

  return (
    <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-morphism p-10 rounded-[3rem] border-white/5 relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-2">Create New Event</h1>
            <p className="text-zinc-400">Host an amazing experience for your fellow students.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload Area */}
            <div className="relative group">
              <div className="w-full h-64 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer overflow-hidden">
                <ImageIcon className="w-12 h-12 text-zinc-500 mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-zinc-400 text-sm">Click to upload event banner</p>
                <p className="text-zinc-600 text-xs mt-2">Recommended size: 1200x630px</p>
              </div>
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Event Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Event Title</label>
                <div className="relative group">
                  <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-brand-indigo transition-colors" />
                  <input
                    type="text"
                    placeholder="e.g. Hackathon 2024"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-indigo/50 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Category Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Category</label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-indigo/50 transition-all appearance-none cursor-pointer">
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-zinc-900">{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Date</label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="date"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-indigo/50 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 ml-1">Venue</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="e.g. Tech Park Lab 4"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-indigo/50 transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Description</label>
              <div className="relative group">
                <AlignLeft className="absolute left-4 top-6 w-5 h-5 text-zinc-500" />
                <textarea
                  rows={4}
                  placeholder="Tell students what this event is about..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-indigo/50 transition-all resize-none"
                  required
                />
              </div>
            </div>

            {/* Pricing + Payment Section */}
            <div className="space-y-5 p-6 rounded-3xl bg-white/3 border border-white/5">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-brand-indigo" /> Pricing & Payment
              </h3>

              {/* Free / Paid Toggle */}
              <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl glass border-white/10">
                <button
                  type="button"
                  onClick={() => setIsFree(true)}
                  className={`py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    isFree ? "bg-green-500 text-white shadow-lg shadow-green-500/20" : "text-zinc-500 hover:text-white"
                  }`}
                >
                  <CheckCircle className="w-4 h-4" /> Free Event
                </button>
                <button
                  type="button"
                  onClick={() => setIsFree(false)}
                  className={`py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    !isFree ? "bg-brand-indigo text-white shadow-lg shadow-brand-indigo/20" : "text-zinc-500 hover:text-white"
                  }`}
                >
                  <DollarSign className="w-4 h-4" /> Paid Event
                </button>
              </div>

              {!isFree && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-5"
                >
                  {/* Fee Input */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300 ml-1">Registration Fee (₹)</label>
                      <div className="relative group">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        <input
                          type="number"
                          placeholder="e.g. 299"
                          min={1}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-indigo/50 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300 ml-1">Registration Deadline</label>
                      <div className="relative group">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        <input
                          type="date"
                          value={registrationDeadline}
                          onChange={e => setRegistrationDeadline(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-indigo/50 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-zinc-300 ml-1">Accept Payment Via</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "razorpay", label: "Razorpay", desc: "Cards, UPI, Netbanking", icon: CreditCard, color: "text-blue-400" },
                        { id: "upi", label: "UPI Only", desc: "GPay, PhonePe, Paytm", icon: Smartphone, color: "text-green-400" },
                        { id: "bank", label: "Bank Transfer", desc: "NEFT / IMPS", icon: Building2, color: "text-amber-400" },
                      ].map(method => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-4 rounded-2xl border text-left transition-all ${
                            paymentMethod === method.id
                              ? "border-brand-indigo bg-brand-indigo/10 shadow-lg shadow-brand-indigo/10"
                              : "border-white/10 bg-white/3 hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <method.icon className={`w-5 h-5 ${method.color}`} />
                            {paymentMethod === method.id && (
                              <CheckCircle className="w-4 h-4 text-brand-indigo" />
                            )}
                          </div>
                          <p className="font-bold text-sm">{method.label}</p>
                          <p className="text-zinc-500 text-xs mt-0.5">{method.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="p-4 rounded-2xl bg-brand-indigo/5 border border-brand-indigo/20 text-sm">
                    <p className="font-bold text-brand-indigo mb-2">💡 Payment Summary</p>
                    <ul className="space-y-1 text-zinc-400 text-xs">
                      <li>• Platform fee: <strong className="text-white">2% per transaction</strong></li>
                      <li>• Payouts are processed within <strong className="text-white">T+2 business days</strong></li>
                      <li>• Refunds handled automatically by CampusEsoul</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Capacity */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Max Capacity</label>
              <div className="relative group">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="number"
                  placeholder="Total slots available"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-indigo/50 transition-all"
                  required
                />
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white font-bold shadow-xl shadow-brand-indigo/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Publish Event
                <Plus className="w-5 h-5" />
              </button>
              <Link
                href="/events"
                className="px-10 py-4 rounded-2xl glass border-white/10 font-bold hover:bg-white/5 transition-all text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-indigo/10 blur-[120px] -z-0" />
      </motion.div>

      {/* Chatbot Guide */}
      <div className="fixed bottom-8 right-8 z-50">
        <ChatbotGuide />
      </div>
    </div>
  );
}

function ChatbotGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm Sphere, your event guide. Need help naming your event or choosing a theme?" }
  ]);

  const suggestions = [
    "Give me unique name ideas",
    "Suggest a fest theme",
    "How to set the price?",
    "Tips for banner image"
  ];

  const handleSuggestion = (suggestion: string) => {
    setMessages([...messages, { role: "user", text: suggestion }]);
    
    // Mock bot responses
    setTimeout(() => {
      let response = "";
      if (suggestion.includes("name")) {
        response = "How about 'Ignite', 'Zenith', or 'Euphoria'? For a tech fest, 'Technova' or 'Innovision' are great!";
      } else if (suggestion.includes("theme")) {
        response = "Popular themes include 'Cyberpunk Future', 'Retro Campus', or 'Global Village'.";
      } else {
        response = "I'm here to help! Make sure your description is catchy and includes all key details.";
      }
      setMessages(prev => [...prev, { role: "bot", text: response }]);
    }, 600);
  };

  return (
    <div className="relative">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute bottom-20 right-0 w-80 glass-morphism rounded-3xl p-6 shadow-2xl border-brand-indigo/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-brand-indigo flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Sphere AI</h4>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Online</p>
            </div>
          </div>

          <div className="space-y-4 max-h-60 overflow-y-auto mb-6 pr-2 scrollbar-thin">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                  msg.role === 'user' ? 'bg-brand-indigo text-white' : 'glass border-white/5 text-zinc-300'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSuggestion(s)}
                className="text-[10px] px-3 py-1 rounded-full glass border-white/10 hover:border-brand-indigo/50 transition-all text-zinc-400"
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-brand-indigo to-brand-purple flex items-center justify-center text-white shadow-xl shadow-brand-indigo/20 hover:scale-110 active:scale-95 transition-all"
      >
        {isOpen ? <Plus className="w-8 h-8 rotate-45 transition-transform" /> : <Sparkles className="w-8 h-8" />}
      </button>
    </div>
  );
}
