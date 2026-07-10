import { useMemo, useState } from "react";
import {
  Activity,
  Bell,
  Calendar,
  CheckCircle,
  ChevronRight,
  Home,
  ListTodo,
  MessageCircle,
  Plus,
  Search,
  Settings,
  ShoppingBasket,
  Sparkles,
  Trophy,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";
import { Badge, Button, Card, IconButton, Input, Modal, NavigationItem } from "../../../components/ui";
import Logo from "../../../components/common/Logo";

const members = [
  { initials: "AM", name: "Aisha", status: "Online", contribution: "92%", color: "bg-hive-terracotta" },
  { initials: "SM", name: "Sarah", status: "At home", contribution: "88%", color: "bg-hive-honey" },
  { initials: "MJ", name: "Mike", status: "Away", contribution: "81%", color: "bg-hive-sage" },
  { initials: "LO", name: "Lena", status: "Online", contribution: "95%", color: "bg-hive-plum" },
];

const initialTasks = [
  { id: 1, title: "Kitchen reset", due: "Today · 6:00 PM", complete: false },
  { id: 2, title: "Put bins out", due: "Tomorrow morning", complete: false },
  { id: 3, title: "Wipe bathroom mirror", due: "Friday", complete: true },
];

const initialEvents = [
  { id: 1, date: "18", month: "JUL", title: "Sarah’s birthday dinner", detail: "Friday · 7:30 PM", tone: "bg-hive-rose-soft text-hive-terracotta" },
  { id: 2, date: "22", month: "JUL", title: "Rent reminder", detail: "Monday · due in 4 days", tone: "bg-hive-warning-soft text-hive-warning" },
  { id: 3, date: "27", month: "JUL", title: "House movie night", detail: "Saturday · living room", tone: "bg-hive-sage-soft text-hive-sage" },
];

const activities = [
  { name: "Sarah", text: "completed the dishes", time: "12 min ago", type: "task" },
  { name: "Mike", text: "added groceries to the list", time: "38 min ago", type: "groceries" },
  { name: "Lena", text: "paid her utilities share", time: "2 hr ago", type: "bill" },
];

function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [events, setEvents] = useState(initialEvents);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [quickAction, setQuickAction] = useState("");
  const [entry, setEntry] = useState("");
  const [notice, setNotice] = useState("");

  const completedTasks = tasks.filter((task) => task.complete).length;
  const openTasks = tasks.filter((task) => !task.complete).length;
  const health = useMemo(() => Math.round(72 + (completedTasks / tasks.length) * 24), [completedTasks, tasks.length]);
  const menu = [
    { icon: <Home />, name: "Dashboard", path: "/dashboard" },
    { icon: <CheckCircle />, name: "Chores", path: "/chores" },
    { icon: <Calendar />, name: "Calendar", path: "/calendar" },
    { icon: <MessageCircle />, name: "Chat", path: "/chat" },
    { icon: <Bell />, name: "Notifications", path: "/notifications" },
    { icon: <ShoppingBasket />, name: "Groceries", path: "/groceries" },
    { icon: <Wallet />, name: "Bills", path: "/bills" },
    { icon: <Users />, name: "Members", path: "/members" },
    { icon: <Settings />, name: "Settings", path: "/settings" },
  ];

  const toggleTask = (id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, complete: !task.complete } : task));
  const openQuickAction = (action) => { setEntry(""); setQuickAction(action); };
  const saveQuickAction = () => {
    if (!entry.trim()) return;
    if (quickAction === "Add chore") setTasks((current) => [...current, { id: Date.now(), title: entry, due: "Newly added", complete: false }]);
    if (quickAction === "Add event") setEvents((current) => [...current, { id: Date.now(), date: "NEW", month: "", title: entry, detail: "Just added", tone: "bg-hive-rose-soft text-hive-terracotta" }]);
    if (quickAction === "Invite member") setNotice(`Invitation ready for ${entry}.`);
    setQuickAction("");
  };
  const actionCopy = {
    "Add chore": { label: "Chore name", placeholder: "e.g. Clean the fridge" },
    "Add event": { label: "Event name", placeholder: "e.g. Game night" },
    "Invite member": { label: "Member email", placeholder: "roommate@example.com" },
  };

  return (
    <div className="min-h-screen bg-hive-canvas text-hive-ink lg:flex">
      <aside className="hidden min-h-screen w-64 shrink-0 flex-col justify-between bg-gradient-to-b from-hive-ink-soft to-[#1f2924] p-5 text-white lg:flex">
        <div>
          <Logo size="default" className="px-2" textClassName="text-white" />
          <div className="mt-9 rounded-hive-md border border-white/10 bg-white/5 px-3 py-3"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-hive-honey">Your household</p><p className="mt-1 font-semibold">Maple House</p></div>
          <nav className="mt-5 flex flex-col gap-1">{menu.map((item) => <NavigationItem key={item.name} to={item.path} icon={item.icon}>{item.name}</NavigationItem>)}</nav>
        </div>
        <div className="rounded-hive-lg border border-white/10 bg-white/5 p-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-hive-terracotta text-xs font-bold">AM</div><div className="min-w-0"><p className="truncate font-bold">Aisha Martin</p><p className="mt-0.5 text-sm text-white/50">House owner</p></div></div><div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3 text-xs text-white/60"><Sparkles size={14} className="text-hive-honey" /> One Home. One Team.</div></div>
      </aside>

      <main className="min-w-0 flex-1 px-4 pb-24 pt-4 sm:px-6 lg:px-8 lg:py-7 xl:px-10">
        <header className="flex items-center justify-between gap-4"><div><Logo size="small" className="lg:hidden" textClassName="text-hive-ink" /><p className="hidden text-xs font-bold uppercase tracking-[0.18em] text-hive-terracotta lg:block">Maple House · Thursday, July 10</p><h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:mt-3 lg:text-4xl">Good morning, Aisha</h1><p className="mt-1 text-sm text-hive-muted sm:text-base">Your household is moving in a good rhythm today.</p></div><div className="flex items-center gap-2"><div className="hidden w-64 xl:block"><div className="flex h-11 items-center gap-2 rounded-hive-md border border-hive-border bg-hive-surface px-3 text-hive-muted shadow-sm"><Search size={17} /><input aria-label="Search your household…" placeholder="Search your household…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-hive-muted/70" /></div></div><IconButton label="Search HomeHive" className="xl:hidden" onClick={() => setIsSearchOpen((open) => !open)}><Search size={19} /></IconButton><div className="relative"><IconButton label="Open notifications" onClick={() => setIsNotificationsOpen((open) => !open)} className="relative"><Bell size={19} /><span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-hive-terracotta" /></IconButton>{isNotificationsOpen && <Card className="absolute right-0 z-30 mt-3 w-80 p-5"><div className="flex items-center justify-between"><p className="font-bold">Notifications</p><a href="/notifications" className="text-sm font-bold text-hive-terracotta">View all</a></div><div className="mt-4 space-y-3 text-sm text-hive-muted"><p><strong className="text-hive-ink">Chore reminder:</strong> Kitchen reset is due today.</p><p><strong className="text-hive-ink">Rent reminder:</strong> 4 days remaining.</p><p><strong className="text-hive-ink">Birthday ahead:</strong> Sarah&apos;s dinner is Friday.</p></div></Card>}</div><a href="/profile" aria-label="Open Aisha's profile" className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-hive-surface bg-hive-terracotta text-sm font-bold text-white shadow-hive-card ring-1 ring-hive-border transition hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hh-focus-ring)]">AM</a></div></header>

        {isSearchOpen && <Card className="mt-5 p-4 xl:hidden"><Input autoFocus aria-label="Search HomeHive" placeholder="Search tasks, members, and events…" /><p className="mt-3 text-sm text-hive-muted">Try “rent”, “Sarah”, or “kitchen reset”.</p></Card>}
        {notice && <div className="mt-5 flex items-center justify-between gap-3 rounded-hive-md border border-hive-sage/20 bg-hive-sage-soft px-4 py-3 text-sm text-hive-sage"><span>{notice}</span><button type="button" className="font-bold" onClick={() => setNotice("")}>Dismiss</button></div>}

        <section className="mt-7 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          <Card className="relative overflow-hidden p-6"><div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-hive-rose-soft/70 blur-2xl" /><div className="relative flex items-center gap-5"><div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full" style={{ background: `conic-gradient(#71906d ${health}%, #e9f1e7 ${health}% 100%)` }}><div className="flex h-21 w-21 flex-col items-center justify-center rounded-full bg-hive-surface"><span className="text-2xl font-bold">{health}%</span><span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-hive-muted">in sync</span></div></div><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-hive-terracotta">Home health</p><h2 className="mt-2 text-xl font-bold">Harmony looks good.</h2><p className="mt-2 text-sm leading-6 text-hive-muted">{completedTasks} of {tasks.length} tasks complete today.</p></div></div></Card>
          <Card className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-hive-terracotta">Today&apos;s chores</p><h2 className="mt-2 text-xl font-bold">A small, shared list</h2></div><Badge variant="neutral">{openTasks} open</Badge></div><div className="mt-5 space-y-2">{tasks.map((task) => <button key={task.id} type="button" onClick={() => toggleTask(task.id)} className="flex w-full items-center gap-3 rounded-hive-md bg-hive-canvas px-3 py-2.5 text-left transition hover:bg-hive-rose-soft"><span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${task.complete ? "border-hive-sage bg-hive-sage text-white" : "border-hive-border bg-hive-surface"}`}>{task.complete && <CheckCircle size={13} />}</span><span className="min-w-0 flex-1"><span className={`block text-sm font-semibold ${task.complete ? "text-hive-muted line-through" : "text-hive-ink"}`}>{task.title}</span><span className="mt-0.5 block text-xs text-hive-muted">{task.due}</span></span></button>)}</div></Card>
          <Card className="p-6 md:col-span-2 2xl:col-span-1"><div className="flex items-start justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-hive-terracotta">Shared bills</p><h2 className="mt-2 text-xl font-bold">A clear month ahead</h2></div><div className="flex h-10 w-10 items-center justify-center rounded-hive-md bg-hive-warning-soft text-hive-warning"><Wallet size={19} /></div></div><div className="mt-6 grid grid-cols-3 gap-3"><div><p className="text-xl font-bold">$2,400</p><p className="mt-1 text-xs text-hive-muted">Rent due</p></div><div><p className="text-xl font-bold text-hive-sage">$1,140</p><p className="mt-1 text-xs text-hive-muted">Covered</p></div><div><p className="text-xl font-bold text-hive-warning">$420</p><p className="mt-1 text-xs text-hive-muted">Remaining</p></div></div><a href="/bills" className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-hive-terracotta hover:text-hive-terracotta-strong">View shared bills <ChevronRight size={16} /></a></Card>
        </section>

        <section className="mt-4 grid gap-4 2xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]"><Card className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-hive-terracotta">Household activity</p><h2 className="mt-2 text-xl font-bold">Little wins, all day</h2></div><Activity size={20} className="text-hive-terracotta" /></div><div className="mt-6 space-y-1">{activities.map((activity) => <div key={activity.name} className="flex items-center gap-3 rounded-hive-md px-2 py-3 transition hover:bg-hive-canvas"><div className="flex h-9 w-9 items-center justify-center rounded-hive-sm bg-hive-rose-soft text-hive-terracotta">{activity.type === "groceries" ? <ShoppingBasket size={17} /> : activity.type === "bill" ? <Wallet size={17} /> : <CheckCircle size={17} />}</div><p className="min-w-0 flex-1 text-sm leading-5"><strong>{activity.name}</strong> {activity.text}.</p><span className="shrink-0 text-xs text-hive-muted">{activity.time}</span></div>)}</div><a href="/notifications" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-hive-terracotta">See all activity <ChevronRight size={16} /></a></Card>
            <Card className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-hive-terracotta">Hive members</p><h2 className="mt-2 text-xl font-bold">Your people</h2></div><a href="/members" className="rounded-hive-sm p-2 text-hive-terracotta hover:bg-hive-rose-soft"><Users size={19} /></a></div><div className="mt-6 space-y-4">{members.map((member) => <div key={member.name} className="flex items-center gap-3"><div className={`flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-bold text-white ${member.color}`}>{member.initials}</div><div className="min-w-0 flex-1"><p className="font-semibold">{member.name}</p><p className="text-xs text-hive-muted"><span className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${member.status === "Away" ? "bg-hive-honey" : "bg-hive-sage"}`} />{member.status}</p></div><span className="text-sm font-bold text-hive-sage">{member.contribution}</span></div>)}</div></Card></div>
          <aside className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-1"><Card className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-hive-terracotta">Upcoming</p><h2 className="mt-2 text-xl font-bold">Around the house</h2></div><Calendar size={20} className="text-hive-terracotta" /></div><div className="mt-6 space-y-4">{events.map((event) => <div key={event.id} className="flex gap-3"><div className={`flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-hive-md text-xs font-bold ${event.tone}`}><span>{event.date}</span><span className="text-[9px]">{event.month}</span></div><div><p className="text-sm font-semibold">{event.title}</p><p className="mt-0.5 text-xs text-hive-muted">{event.detail}</p></div></div>)}</div><a href="/calendar" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-hive-terracotta">Open calendar <ChevronRight size={16} /></a></Card>
            <Card className="bg-hive-ink-soft p-6 text-white"><div className="flex items-center justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-hive-honey">Quick actions</p><h2 className="mt-2 text-xl font-bold">Keep home moving</h2></div><Plus className="text-hive-honey" /></div><div className="mt-5 space-y-2">{[["Add chore", ListTodo], ["Add event", Calendar], ["Invite member", UserPlus]].map(([label, Icon]) => <button key={label} type="button" onClick={() => openQuickAction(label)} className="flex w-full items-center justify-between rounded-hive-md bg-white/10 px-4 py-3 text-left text-sm font-bold transition hover:bg-white/15"><span className="flex items-center gap-2"><Icon size={17} className="text-hive-honey" />{label}</span><ChevronRight size={16} className="text-white/60" /></button>)}</div></Card></aside>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="relative overflow-hidden border-hive-terracotta/15 bg-gradient-to-br from-hive-rose-soft via-hive-surface to-hive-surface p-6"><div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-hive-honey/35 blur-2xl" /><div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><div className="flex gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-hive-lg bg-hive-terracotta text-white shadow-lg shadow-hive-terracotta/20"><Sparkles size={21} /></div><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-hive-terracotta">HomeHive assistant</p><h2 className="mt-2 text-xl font-bold">A gentle nudge for Maple House</h2><p className="mt-2 max-w-xl text-sm leading-6 text-hive-muted">Start with the kitchen reset, then send the rent reminder before dinner. Two small moves will keep the whole house in sync.</p></div></div><Button variant="outline" className="shrink-0" onClick={() => setNotice("Assistant suggestion saved: kitchen reset, then rent reminder.")}>Use suggestion</Button></div></Card>
          <Card className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-hive-terracotta">Achievements</p><h2 className="mt-2 text-xl font-bold">A home worth celebrating</h2></div><Trophy className="text-hive-honey" size={22} /></div><div className="mt-5 grid grid-cols-3 gap-2">{[["12", "day streak"], ["6", "on time"], ["4", "team wins"]].map(([value, label]) => <div key={label} className="rounded-hive-md bg-hive-canvas px-3 py-3 text-center"><p className="text-lg font-bold text-hive-terracotta">{value}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-hive-muted">{label}</p></div>)}</div></Card>
        </section>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-between border-t border-hive-border bg-hive-surface/95 px-2 py-2 backdrop-blur lg:hidden">{menu.slice(0, 5).map((item) => <a key={item.name} href={item.path} className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-hive-sm py-1.5 text-[10px] font-semibold ${item.name === "Dashboard" ? "text-hive-terracotta" : "text-hive-muted"}`}>{item.icon}<span className="truncate">{item.name}</span></a>)}</nav>

      <Modal isOpen={Boolean(quickAction)} onClose={() => setQuickAction("")} title={quickAction} description={quickAction === "Invite member" ? "Send an invitation to someone you live with." : "Add a shared detail for Maple House."}><div className="space-y-5"><Input label={actionCopy[quickAction]?.label} placeholder={actionCopy[quickAction]?.placeholder} value={entry} onChange={(event) => setEntry(event.target.value)} /><div className="flex gap-3"><Button variant="outline" fullWidth onClick={() => setQuickAction("")}>Cancel</Button><Button fullWidth onClick={saveQuickAction}>Save</Button></div></div></Modal>
    </div>
  );
}

export default Dashboard;
