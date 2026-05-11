"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  CalendarCog,
  Users,
  BarChart3,
  Award,
  Megaphone,
  LogOut,
  ChevronRight,
  Briefcase,
  Bell,
  UserCircle
} from "lucide-react";

const navItems = [
  { href: "/dashboard/organizer", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/organizer/create", label: "Create Event", icon: PlusCircle },
  { href: "/dashboard/organizer/manage", label: "Manage Events", icon: CalendarCog },
  { href: "/dashboard/organizer/participants", label: "Participants", icon: Users },
  { href: "/dashboard/organizer/reports", label: "Reports & Analytics", icon: BarChart3 },
  { href: "/dashboard/organizer/certificates", label: "Certificates", icon: Award },
  { href: "/dashboard/organizer/announcements", label: "Announcements", icon: Megaphone },
  { href: "/dashboard/organizer/notifications", label: "Notifications", icon: Bell, badge: 2 },
  { href: "/dashboard/organizer/profile", label: "Profile", icon: UserCircle },
];

export default function OrganizerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-2">
      {/* Role Badge */}
      <div className="glass p-4 rounded-2xl border-white/5 flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-violet/40 flex-shrink-0">
          <img src="/avatar.png" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-bold text-sm">Dr. Ananya K.</p>
          <p className="text-zinc-500 text-xs">organizer@college.edu</p>
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
                ? "bg-gradient-to-r from-brand-violet to-brand-purple text-white shadow-lg shadow-brand-violet/20"
                : "glass border-white/5 text-zinc-400 hover:text-white hover:border-white/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {(item as any).badge && (
                <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                  isActive ? "bg-white/20 text-white" : "bg-brand-violet text-white"
                }`}>{(item as any).badge}</span>
              )}
              <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`} />
            </div>
          </Link>
        );
      })}

      <div className="pt-4 border-t border-white/5 mt-4">
        <button className="w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl glass border-white/5 text-rose-400 hover:bg-rose-400/10 transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
