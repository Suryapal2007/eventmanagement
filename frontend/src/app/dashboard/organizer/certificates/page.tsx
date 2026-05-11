"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Upload, Download, Send, CheckCircle, X, Plus, Eye, Trash2 } from "lucide-react";
import OrganizerSidebar from "@/components/OrganizerSidebar";

const EVENTS_WITH_CERTS = [
  { id: 1, title: "Technova Hackathon 2024", date: "Jun 15, 2024", participants: 128, certified: 92, image: "/technova.png" },
  { id: 2, title: "Euphoria Cultural Fest", date: "Jun 20, 2024", participants: 95, certified: 0, image: "/euphoria.png" },
  { id: 3, title: "Ignite Startup Pitch", date: "Jul 15, 2024", participants: 45, certified: 0, image: "/ignite.png" },
];

const CERT_TEMPLATES = [
  { id: 1, name: "Classic Gold", preview: "bg-gradient-to-br from-amber-900 to-yellow-700" },
  { id: 2, name: "Modern Purple", preview: "bg-gradient-to-br from-brand-indigo to-brand-purple" },
  { id: 3, name: "Elegant Blue", preview: "bg-gradient-to-br from-blue-900 to-cyan-700" },
];

export default function OrganizerCertificatesPage() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  const selectedEventData = EVENTS_WITH_CERTS.find(e => e.id === selectedEvent);

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <OrganizerSidebar />
      <main className="flex-1 space-y-8 min-w-0">
        <div>
          <h1 className="text-3xl font-bold mb-1">Certificate Management</h1>
          <p className="text-zinc-400 text-sm">Generate and distribute participation certificates for your events.</p>
        </div>

        {/* Step 1: Select Event */}
        <div className="glass rounded-3xl border-white/5 p-6">
          <h2 className="font-bold text-lg mb-5 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-brand-violet text-white text-sm font-bold flex items-center justify-center">1</span>
            Select Event
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EVENTS_WITH_CERTS.map(ev => (
              <motion.button
                key={ev.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setSelectedEvent(ev.id); setGenerated(false); }}
                className={`text-left p-4 rounded-2xl border transition-all ${
                  selectedEvent === ev.id
                    ? "border-brand-violet bg-brand-violet/10 shadow-lg shadow-brand-violet/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <img src={ev.image} alt={ev.title} className="w-full h-24 rounded-xl object-cover mb-3" />
                <p className="font-bold text-sm">{ev.title}</p>
                <p className="text-zinc-500 text-xs mt-1">{ev.date}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-zinc-400">{ev.participants} participants</span>
                  {ev.certified > 0 ? (
                    <span className="flex items-center gap-1 text-[10px] text-green-400 font-bold">
                      <CheckCircle className="w-3 h-3" /> {ev.certified} issued
                    </span>
                  ) : (
                    <span className="text-[10px] text-zinc-600">Not generated</span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Step 2: Choose Template */}
        <div className={`glass rounded-3xl border-white/5 p-6 transition-opacity ${!selectedEvent ? "opacity-40 pointer-events-none" : ""}`}>
          <h2 className="font-bold text-lg mb-5 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-brand-violet text-white text-sm font-bold flex items-center justify-center">2</span>
            Choose Template
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {CERT_TEMPLATES.map(tmpl => (
              <button
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl.id)}
                className={`relative rounded-2xl overflow-hidden border-2 transition-all ${
                  selectedTemplate === tmpl.id ? "border-brand-violet scale-[1.03]" : "border-white/10"
                }`}
              >
                <div className={`h-20 ${tmpl.preview} flex items-center justify-center`}>
                  <Award className="w-8 h-8 text-white/60" />
                </div>
                <div className="p-3 bg-white/5 text-xs font-bold text-center">{tmpl.name}</div>
                {selectedTemplate === tmpl.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand-violet flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl glass border-white/10 text-sm hover:bg-white/5 transition-all">
            <Upload className="w-4 h-4" /> Upload Custom Template
          </button>
        </div>

        {/* Step 3: Generate */}
        <div className={`glass rounded-3xl border-white/5 p-6 transition-opacity ${!selectedEvent ? "opacity-40 pointer-events-none" : ""}`}>
          <h2 className="font-bold text-lg mb-5 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-brand-violet text-white text-sm font-bold flex items-center justify-center">3</span>
            Generate & Send
          </h2>

          {selectedEventData && (
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 mb-6">
              <img src={selectedEventData.image} alt="" className="w-14 h-14 rounded-2xl object-cover" />
              <div>
                <p className="font-bold">{selectedEventData.title}</p>
                <p className="text-zinc-400 text-sm">{selectedEventData.participants} certificates will be generated</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleGenerate}
              disabled={generating}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                generating
                  ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-brand-violet to-brand-purple text-white shadow-lg shadow-brand-violet/20 hover:scale-105"
              }`}
            >
              {generating ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
              ) : (
                <><Award className="w-4 h-4" /> Generate All Certificates</>
              )}
            </button>

            {generated && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => setShowPreview(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl glass border-white/10 font-bold text-sm hover:bg-white/5 transition-all"
                >
                  <Eye className="w-4 h-4" /> Preview
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl glass border-white/10 font-bold text-sm hover:bg-white/5 transition-all"
                >
                  <Download className="w-4 h-4" /> Download ZIP
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-green-500 text-black font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-green-500/20"
                >
                  <Send className="w-4 h-4" /> Email to All Participants
                </motion.button>
              </>
            )}
          </div>

          {generated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center gap-3 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              {selectedEventData?.participants} certificates generated successfully!
            </motion.div>
          )}
        </div>

        {/* Certificate Preview Modal */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowPreview(false)}
            >
              <motion.div
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.85 }}
                onClick={e => e.stopPropagation()}
                className={`w-full max-w-2xl aspect-[1.414/1] rounded-3xl p-12 relative flex flex-col items-center justify-center text-center ${
                  CERT_TEMPLATES.find(t => t.id === selectedTemplate)?.preview || ""
                } shadow-2xl`}
              >
                <button onClick={() => setShowPreview(false)} className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all">
                  <X className="w-4 h-4 text-white" />
                </button>
                <Award className="w-16 h-16 text-white/80 mb-4" />
                <p className="text-white/60 text-sm uppercase tracking-[4px] mb-2">Certificate of Participation</p>
                <h2 className="text-3xl font-bold text-white mb-2">Participant Name</h2>
                <p className="text-white/70 text-sm mb-4">has successfully participated in</p>
                <h3 className="text-xl font-bold text-amber-300 mb-6">{selectedEventData?.title}</h3>
                <div className="w-32 h-0.5 bg-white/30 mb-6" />
                <p className="text-white/50 text-xs">Issued by CampusSphere · {selectedEventData?.date}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
