"use client";

import { motion } from "framer-motion";
import { Award, Download, Eye, CheckCircle } from "lucide-react";
import StudentSidebar from "@/components/StudentSidebar";

const certificates = [
  {
    id: "CERT-001",
    event: "Technova Hackathon 2023",
    issuedOn: "Dec 10, 2023",
    type: "Participation",
    grade: "Excellence",
  },
  {
    id: "CERT-002",
    event: "AI & ML Workshop",
    issuedOn: "Nov 5, 2023",
    type: "Completion",
    grade: "Distinction",
  },
];

export default function CertificatesPage() {
  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <StudentSidebar />
      <main className="flex-1 space-y-6 min-w-0">
        <div>
          <h1 className="text-3xl font-bold mb-1">My Certificates</h1>
          <p className="text-zinc-400 text-sm">Download and view your participation certificates.</p>
        </div>

        {certificates.length === 0 ? (
          <div className="glass rounded-[2.5rem] p-16 text-center border-white/5">
            <Award className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No certificates yet</h3>
            <p className="text-zinc-400 text-sm">Attend events to earn participation certificates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl border-white/5 p-6 relative overflow-hidden"
              >
                {/* decorative */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">{cert.type}</span>
                      <p className="text-xs text-zinc-500">{cert.id}</p>
                    </div>
                    <span className="ml-auto flex items-center gap-1 text-green-400 text-xs font-bold">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{cert.event}</h3>
                  <p className="text-zinc-400 text-sm mb-1">Issued: {cert.issuedOn}</p>
                  <p className="text-amber-400 text-xs font-bold mb-6">{cert.grade}</p>
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-amber-500 text-black font-bold text-sm hover:scale-[1.02] transition-all">
                      <Download className="w-4 h-4" /> Download PDF
                    </button>
                    <button className="px-4 py-3 rounded-2xl glass border-white/10 hover:bg-white/5 transition-all">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
