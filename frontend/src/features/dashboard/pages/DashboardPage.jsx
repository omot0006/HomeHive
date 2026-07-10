import { useMemo, useState } from "react";
import {
  Activity,
  Bell,
  Calendar,
  CheckCircle,
  ChevronRight,
  Home,
  ListTodo,
  Plus,
  Search,
  Settings,
  ShoppingBasket,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";
import { Badge, Button, Card, Input, Modal, NavigationItem } from "../../../components/ui";

const members = [
  { initials: "AM", name: "Aisha Martin", status: "Online", contribution: "92%", color: "bg-hive-terracotta" },
  { initials: "SM", name: "Sarah Miller", status: "At home", contribution: "88%", color: "bg-hive-honey" },
  { initials: "MJ", name: "Mike Jordan", status: "Away", contribution: "81%", color: "bg-hive-sage" },
  { initials: "LO", name: "Lena Ortiz", status: "Online", contribution: "95%", color: "bg-[#c8b8de]" },
];

const initialTasks = [
  { id: 1, title: "Kitchen reset", due: "Today · 6:00 PM", complete: false },
  { id: 2, title: "Put bins out", due: "Tomorrow morning", complete: false },
  { id: 3, title: "Wipe bathroom mirror", due: "Friday", complete: true },
];

const initialEvents = [
  { id: 1, date: "18", month: "JUL", title: "Sarah’s birthday dinner", detail: "Friday · 7:30 PM", tone: "bg-hive-rose-soft text-hive-terracotta" },
  { id: 2, date: "22", month: "JUL", title: "Rent reminder", detail: "Monday · due in 4 days", tone: "bg-[#fff1cd] text-[#9a6500]" },
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
  const health = useMemo(() => Math.round(72 + (completedTasks / tasks.length) * 24), [completedTasks, tasks.length]);
  const menu = [
    { icon: <Home />, name: "Dashboard", path: "/dashboard" },
    { icon: <CheckCircle />, name: "Chores", path: "/chores" },
    { icon: <ShoppingBasket />, name: "Groceries", path: "/groceries" },
    { icon: <Wallet />, name: "Expenses", path: "/expenses" },
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
  const actionCopy = { "Add chore": { label: "Chore name", placeholder: "e.g. Clean the fridge" }, "Add event": { label: "Event name", placeholder: "e.g. Game night" }, "Invite member": { label: "Member email", placeholder: "roommate@example.com" } };

  return (
    <div className="min-h-screen bg-hive-canvas text-hive-ink md:flex">
      <aside className="hidden min-h-screen w-72 flex-col justify-between bg-hive-ink-soft p-6 text-white md:flex">
        <div>
          <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-hive-md bg-hive-honey font-bold text-hive-ink">H</div><h1 className="text-xl font-bold tracking-tight">HomeHive</h1></div>
          <p className="mt-10 px-3 text-xs font-bold uppercase tracking-[0.16em] text-white/35">Maple House</p>
          <nav className="mt-3 flex flex-col gap-1">{menu.map((item) => <NavigationItem key={item.name} to={item.path} icon={item.icon}>{item.name}</NavigationItem>)}</nav>
        </div>
        <div className="rounded-hive-lg border border-white/10 bg-white/5 p-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-hive-terracotta text-sm font-bold">AM</div><div><p className="font-bold">Aisha Martin</p><p className="text-sm text-white/50">Maple House</p></div></div></div>
      </aside>

      <main className="min-w-0 flex-1 px-4 pb-10 pt-4 sm:px-6 lg:px-10 lg:pt-8">
        <header className="flex items-center justify-between gap-4"><div className="flex items-center gap-3 md:hidden"><div className="flex h-9 w-9 items-center justify-center rounded-hive-sm bg-hive-honey font-bold">H</div><span className="font-bold">HomeHive</span></div><div className="hidden md:block"><p className="text-sm font-bold uppercase tracking-[0.16em] text-hive-terracotta">Maple House</p><h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Good morning, Aisha</h2><p className="mt-2 text-hive-muted">Here&apos;s how your household is feeling today.</p></div><div className="flex items-center gap-2"><button type="button" aria-label="Search HomeHive" onClick={() => setIsSearchOpen((open) => !open)} className="flex h-11 w-11 items-center justify-center rounded-hive-md border border-hive-border bg-hive-surface text-hive-muted transition hover:border-hive-terracotta hover:text-hive-terracotta"><Search size={19} /></button><div className="relative"><button type="button" aria-label="Open notifications" onClick={() => setIsNotificationsOpen((open) => !open)} className="relative flex h-11 w-11 items-center justify-center rounded-hive-md border border-hive-border bg-hive-surface text-hive-muted transition hover:border-hive-terracotta hover:text-hive-terracotta"><Bell size={19} /><span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-hive-terracotta" /></button>{isNotificationsOpen && <Card className="absolute right-0 z-30 mt-3 w-80 p-5"><p className="font-bold">Notifications</p><div className="mt-4 space-y-4 text-sm"><p><strong>Chore reminder:</strong> Kitchen reset is due today.</p><p><strong>Rent reminder:</strong> 4 days remaining.</p><p><strong>Birthday ahead:</strong> Sarah&apos;s dinner is Friday.</p></div></Card>}</div><button type="button" className="flex h-11 items-center gap-2 rounded-hive-md border border-hive-border bg-hive-surface px-2 pr-3 text-sm font-semibold"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-hive-terracotta text-xs text-white">AM</span><span className="hidden sm:inline">Aisha</span></button></div></header>

        <div className="mt-5 md:hidden"><h2 className="text-2xl font-bold tracking-tight">Good morning, Aisha</h2><p className="mt-1 text-sm text-hive-muted">Your household is in a good rhythm.</p></div>
        {isSearchOpen && <Card className="mt-5 p-4"><Input autoFocus aria-label="Search HomeHive" placeholder="Search tasks, members, and events…" /><p className="mt-3 text-sm text-hive-muted">Try “rent”, “Sarah”, or “kitchen reset”.</p></Card>}
        {notice && <div className="mt-5 flex items-center justify-between gap-3 rounded-hive-md bg-hive-sage-soft px-4 py-3 text-sm text-hive-sage"><span>{notice}</span><button type="button" className="font-bold" onClick={() => setNotice("")}>Dismiss</button></div>}

        <section className="mt-7 grid gap-5 xl:grid-cols-[1.45fr_0.9fr]">
          <Card className="overflow-hidden bg-hive-ink-soft p-6 text-white sm:p-8"><div className="flex items-start justify-between gap-4"><div><Badge variant="warning">Today&apos;s home status</Badge><h3 className="mt-5 text-3xl font-bold tracking-tight">{health}% in sync</h3><p className="mt-2 max-w-md text-white/65">Everyone knows what&apos;s next. Two small tasks will keep Maple House running smoothly.</p></div><div className="flex h-12 w-12 items-center justify-center rounded-hive-lg bg-hive-honey text-hive-ink"><Activity size={23} /></div></div><div className="mt-8 h-3 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-hive-honey transition-all duration-500" style={{ width: `${health}%` }} /></div><div className="mt-4 flex justify-between text-sm text-white/60"><span>{completedTasks} of {tasks.length} tasks complete</span><span>Healthy rhythm</span></div></Card>
          <Card className="p-6 sm:p-7"><div className="flex items-center justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-hive-terracotta">Quick actions</p><h3 className="mt-2 text-xl font-bold">Keep things moving</h3></div><Plus className="text-hive-terracotta" /></div><div className="mt-5 grid gap-2 sm:grid-cols-3 xl:grid-cols-1">{[["Add chore", ListTodo], ["Add event", Calendar], ["Invite member", UserPlus]].map(([label, Icon]) => <button key={label} type="button" onClick={() => openQuickAction(label)} className="flex items-center justify-between rounded-hive-md bg-hive-rose-soft px-4 py-3 text-left text-sm font-bold transition hover:bg-[#f4d5c5]"><span className="flex items-center gap-2"><Icon size={17} className="text-hive-terracotta" />{label}</span><ChevronRight size={16} /></button>)}</div></Card>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.9fr_0.9fr]">
          <Card className="p-6 sm:p-7"><div className="flex items-center justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-hive-terracotta">My tasks</p><h3 className="mt-2 text-xl font-bold">Your next few things</h3></div><Badge variant="neutral">{tasks.filter((task) => !task.complete).length} open</Badge></div><div className="mt-6 space-y-3">{tasks.map((task) => <button key={task.id} type="button" onClick={() => toggleTask(task.id)} className="flex w-full items-center gap-3 rounded-hive-md p-2 text-left transition hover:bg-hive-canvas"><span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${task.complete ? "border-hive-sage bg-hive-sage text-white" : "border-hive-border bg-hive-surface"}`}>{task.complete && <CheckCircle size={14} />}</span><span className="min-w-0 flex-1"><span className={`block font-semibold ${task.complete ? "text-hive-muted line-through" : "text-hive-ink"}`}>{task.title}</span><span className="mt-0.5 block text-sm text-hive-muted">{task.due}</span></span></button>)}</div><Button variant="ghost" className="mt-4" onClick={() => openQuickAction("Add chore")}>View all chores <ChevronRight size={16} /></Button></Card>
          <Card className="p-6 sm:p-7"><div className="flex items-center justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-hive-terracotta">Hive members</p><h3 className="mt-2 text-xl font-bold">Your people</h3></div><Users size={20} className="text-hive-terracotta" /></div><div className="mt-6 space-y-4">{members.map((member) => <div key={member.name} className="flex items-center gap-3"><div className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white ${member.color}`}>{member.initials}</div><div className="min-w-0 flex-1"><p className="truncate font-semibold">{member.name}</p><p className="text-sm text-hive-muted"><span className={`mr-1 inline-block h-2 w-2 rounded-full ${member.status === "Away" ? "bg-hive-honey" : "bg-hive-sage"}`} />{member.status}</p></div><Badge variant="neutral">{member.contribution}</Badge></div>)}</div></Card>
          <Card className="p-6 sm:p-7"><div className="flex items-center justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-hive-terracotta">Upcoming</p><h3 className="mt-2 text-xl font-bold">On the calendar</h3></div><Calendar size={20} className="text-hive-terracotta" /></div><div className="mt-6 space-y-4">{events.map((event) => <div key={event.id} className="flex gap-3"><div className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-hive-md text-xs font-bold ${event.tone}`}><span>{event.date}</span><span className="text-[9px]">{event.month}</span></div><div><p className="font-semibold">{event.title}</p><p className="mt-0.5 text-sm text-hive-muted">{event.detail}</p></div></div>)}</div></Card>
        </section>

        <section className="mt-5"><Card className="p-6 sm:p-7"><div className="flex items-center justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-hive-terracotta">Activity feed</p><h3 className="mt-2 text-xl font-bold">Around the Hive</h3></div><Activity size={20} className="text-hive-terracotta" /></div><div className="mt-6 grid gap-4 md:grid-cols-3">{activities.map((activity) => <div key={activity.name} className="rounded-hive-lg bg-hive-canvas p-5"><div className="flex h-9 w-9 items-center justify-center rounded-hive-sm bg-hive-surface text-hive-terracotta">{activity.type === "groceries" ? <ShoppingBasket size={17} /> : activity.type === "bill" ? <Wallet size={17} /> : <CheckCircle size={17} />}</div><p className="mt-4 leading-6"><strong>{activity.name}</strong> {activity.text}.</p><p className="mt-2 text-sm text-hive-muted">{activity.time}</p></div>)}</div></Card></section>
      </main>

      <nav className="sticky bottom-0 z-20 flex justify-between border-t border-hive-border bg-hive-surface px-2 py-2 md:hidden">{menu.slice(0, 5).map((item) => <a key={item.name} href={item.path} className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-hive-sm py-1.5 text-[10px] font-semibold ${item.name === "Dashboard" ? "text-hive-terracotta" : "text-hive-muted"}`}>{item.icon}<span className="truncate">{item.name}</span></a>)}</nav>

      <Modal isOpen={Boolean(quickAction)} onClose={() => setQuickAction("")} title={quickAction} description={quickAction === "Invite member" ? "Send an invitation to someone you live with." : "Add a shared detail for Maple House."}><div className="space-y-5"><Input label={actionCopy[quickAction]?.label} placeholder={actionCopy[quickAction]?.placeholder} value={entry} onChange={(event) => setEntry(event.target.value)} /><div className="flex gap-3"><Button variant="outline" fullWidth onClick={() => setQuickAction("")}>Cancel</Button><Button fullWidth onClick={saveQuickAction}>Save</Button></div></div></Modal>
    </div>
  );
}

export default Dashboard;
