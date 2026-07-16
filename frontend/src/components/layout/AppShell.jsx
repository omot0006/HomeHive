import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Calendar,
  CheckCircle,
  Home,
  Menu,
  MessageCircle,
  Settings,
  ShoppingBasket,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import Logo from "../common/Logo";
import { NavigationItem } from "../ui";

const menu = [
  { icon: <Home size={20} />, name: "Dashboard", path: "/dashboard" },
  { icon: <CheckCircle size={20} />, name: "Chores", path: "/chores" },
  { icon: <Calendar size={20} />, name: "Calendar", path: "/calendar" },
  { icon: <MessageCircle size={20} />, name: "Chat", path: "/chat" },
  { icon: <Bell size={20} />, name: "Notifications", path: "/notifications" },
  { icon: <ShoppingBasket size={20} />, name: "Groceries", path: "/groceries" },
  { icon: <Wallet size={20} />, name: "Bills", path: "/bills" },
  { icon: <Users size={20} />, name: "Members", path: "/members" },
  { icon: <Settings size={20} />, name: "Settings", path: "/settings" },
];

function SidebarContent({ onNavigate, closeButtonRef }) {
  return (
    <div className="flex h-full min-h-0 flex-col justify-between overflow-y-auto p-5 text-white">
      <div>
        <div className="flex items-center justify-between gap-3 px-2">
          <Logo size="default" textClassName="text-white" />
          {closeButtonRef && (
            <button ref={closeButtonRef} type="button" onClick={onNavigate} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center rounded-hive-md text-white/70 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/25 lg:hidden">
              <X size={22} />
            </button>
          )}
        </div>
        <div className="mt-7 rounded-hive-md border border-white/10 bg-white/5 px-3 py-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-hive-honey">Your household</p>
          <p className="mt-1 font-semibold">Maple House</p>
        </div>
        <nav aria-label="HomeHive pages" className="mt-5 flex flex-col gap-1">
          {menu.map((item) => <NavigationItem key={item.name} to={item.path} icon={item.icon} onClick={onNavigate}>{item.name}</NavigationItem>)}
        </nav>
      </div>
      <div className="mt-6 rounded-hive-lg border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-hive-terracotta text-xs font-bold">AM</div><div className="min-w-0"><p className="truncate font-bold">Aisha Martin</p><p className="mt-0.5 text-sm text-white/50">House owner</p></div></div>
      </div>
    </div>
  );
}

function AppShell() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef(null);
  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => { if (event.key === "Escape") setIsOpen(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div className="min-h-dvh bg-hive-canvas text-hive-ink lg:flex">
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 bg-gradient-to-b from-hive-ink-soft to-[#1f2924] lg:block"><SidebarContent /></aside>
      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-hive-border bg-hive-surface/95 px-4 backdrop-blur lg:hidden">
          <button type="button" onClick={() => setIsOpen(true)} aria-label="Open menu" aria-expanded={isOpen} aria-controls="mobile-navigation" className="flex h-11 w-11 items-center justify-center rounded-hive-md border border-hive-border text-hive-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hh-focus-ring)]"><Menu size={22} /></button>
          <Logo size="small" textClassName="text-hive-ink" />
          <a href="/profile" aria-label="Open profile" className="flex h-11 w-11 items-center justify-center rounded-full bg-hive-terracotta text-xs font-bold text-white">AM</a>
        </div>
        <Outlet />
      </div>
      {isOpen && <div className="fixed inset-0 z-50 lg:hidden"><button type="button" aria-label="Close menu overlay" onClick={() => setIsOpen(false)} className="absolute inset-0 bg-hive-ink/55 backdrop-blur-[2px]" /><aside id="mobile-navigation" className="absolute inset-y-0 left-0 w-[min(19rem,88vw)] bg-gradient-to-b from-hive-ink-soft to-[#1f2924] shadow-hive-float"><SidebarContent onNavigate={() => setIsOpen(false)} closeButtonRef={closeButtonRef} /></aside></div>}
    </div>
  );
}

export default AppShell;
