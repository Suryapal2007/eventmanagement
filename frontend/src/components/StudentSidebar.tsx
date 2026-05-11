"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Ticket,
  Award,
  Bell,
  UserCircle,
  LogOut,
  ChevronRight,
  GraduationCap,
  Newspaper
} from "lucide-react";

const navItems = [
  { href: "/dashboard/student", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/student/events", label: "Browse Events", icon: CalendarDays },
  { href: "/dashboard/student/registrations", label: "My Registrations", icon: Ticket },
  { href: "/dashboard/student/certificates", label: "Certificates", icon: Award },
  { href: "/dashboard/student/updates", label: "Event Updates", icon: Newspaper },
  { href: "/dashboard/student/notifications", label: "Notifications", icon: Bell, badge: 3 },
  { href: "/dashboard/student/profile", label: "Profile", icon: UserCircle },
];

export default function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-2">
      {/* Role Badge */}
      <div className="glass p-4 rounded-2xl border-white/5 flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-indigo/40 flex-shrink-0">
          <img src="/avatar.png" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-bold text-sm">John Sharma</p>
          <p className="text-zinc-500 text-xs">john@college.edu</p>
        </div>
      </div>

      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all group ${
              isActive
                ? "bg-gradient-to-r from-brand-indigo to-brand-purple text-white shadow-lg shadow-brand-indigo/20"
                : "glass border-white/5 text-zinc-400 hover:text-white hover:border-white/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.badge && (
                <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                  isActive ? "bg-white/20 text-white" : "bg-brand-indigo text-white"
                }`}>
                  {item.badge}
                </span>
              )}
              <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`} />
            </div>
          </Link>
        );
      })}

      <div className="mt-auto pt-4 border-t border-white/5 mt-4">
        <button className="w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl glass border-white/5 text-rose-400 hover:bg-rose-400/10 transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
