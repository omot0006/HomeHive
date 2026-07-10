import { Bell, CheckCircle, Gift, MessageCircle, Receipt, SlidersHorizontal, UserMinus, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { Button, Card } from "../../../components/ui";

const typeConfig = {
  Chore: { icon: CheckCircle, className: "bg-hive-sage-soft text-hive-sage" },
  Birthday: { icon: Gift, className: "bg-hive-rose-soft text-hive-terracotta" },
  Message: { icon: MessageCircle, className: "bg-[#eee7f5] text-[#735b94]" },
  Bill: { icon: Receipt, className: "bg-[#fff1cd] text-[#9a6500]" },
  "Member joined": { icon: UserPlus, className: "bg-hive-sage-soft text-hive-sage" },
  "Member left": { icon: UserMinus, className: "bg-[#f3e9e5] text-[#9c5a40]" },
};
const initialNotifications = [
  { id: 1, type: "Chore", title: "Kitchen reset is due today", text: "Your shared kitchen reset is waiting for you at 6:00 PM.", time: "12 min ago", group: "Today", unread: true },
  { id: 2, type: "Message", title: "Sarah sent a message", text: "“I picked up the oat milk and pasta. They’re on the counter.”", time: "38 min ago", group: "Today", unread: true },
  { id: 3, type: "Birthday", title: "Sarah’s birthday is this Friday", text: "Dinner is scheduled for 7:30 PM. Don’t forget to bring your gift.", time: "1 hr ago", group: "Today", unread: true },
  { id: 4, type: "Bill", title: "Rent is due in 4 days", text: "Maple House rent is due on July 22. Your share is $600.00.", time: "2 hr ago", group: "Today", unread: false },
  { id: 5, type: "Member joined", title: "Lena joined Maple House", text: "Lena can now see the household calendar, chores, and chat.", time: "Yesterday", group: "Yesterday", unread: false },
  { id: 6, type: "Member left", title: "Jordan left the Hive", text: "Jordan no longer has access to Maple House’s shared space.", time: "Yesterday", group: "Yesterday", unread: false },
];

function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [stateFilter, setStateFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All types");
  const unreadCount = notifications.filter((notification) => notification.unread).length;
  const filtered = useMemo(() => notifications.filter((notification) => (stateFilter === "All" || (stateFilter === "Unread" ? notification.unread : !notification.unread)) && (typeFilter === "All types" || notification.type === typeFilter)), [notifications, stateFilter, typeFilter]);
  const groups = ["Today", "Yesterday"].map((group) => ({ group, items: filtered.filter((notification) => notification.group === group) })).filter((section) => section.items.length);
  const toggleRead = (id) => setNotifications((current) => current.map((notification) => notification.id === id ? { ...notification, unread: !notification.unread } : notification));
  const markAllRead = () => setNotifications((current) => current.map((notification) => ({ ...notification, unread: false })));

  return <main className="min-h-screen bg-hive-canvas px-0 py-0 sm:px-6 sm:py-8"><div className="mx-auto max-w-3xl bg-hive-surface sm:overflow-hidden sm:rounded-[2rem] sm:border sm:border-hive-border sm:shadow-hive-card">
    <header className="sticky top-0 z-10 border-b border-hive-border bg-hive-surface/95 px-5 py-5 backdrop-blur sm:px-8 sm:py-7"><div className="flex items-start justify-between gap-4"><div><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-hive-terracotta"><Bell size={16} /> Maple House</p><h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Notifications</h1><p className="mt-2 text-hive-muted">The things your household wants you to know.</p></div><div className="flex h-11 min-w-11 items-center justify-center rounded-full bg-hive-rose-soft text-hive-terracotta"><Bell size={19} />{unreadCount > 0 && <span className="ml-1 text-sm font-bold">{unreadCount}</span>}</div></div><div className="mt-6 flex items-center justify-between gap-3"><div className="flex gap-2 overflow-x-auto pb-1">{["All", "Unread", "Read"].map((filter) => <button key={filter} type="button" onClick={() => setStateFilter(filter)} className={`shrink-0 rounded-full px-3 py-2 text-sm font-semibold transition ${stateFilter === filter ? "bg-hive-terracotta text-white" : "bg-hive-canvas text-hive-muted hover:bg-hive-rose-soft"}`}>{filter}{filter === "Unread" && unreadCount ? ` (${unreadCount})` : ""}</button>)}</div>{unreadCount > 0 && <button type="button" onClick={markAllRead} className="shrink-0 text-sm font-bold text-hive-terracotta hover:text-hive-terracotta-strong">Mark all read</button>}</div><div className="mt-3 flex items-center gap-2"><SlidersHorizontal size={16} className="text-hive-muted" /><label className="sr-only" htmlFor="notification-type">Filter by type</label><select id="notification-type" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="min-h-9 rounded-hive-sm border border-hive-border bg-hive-surface px-3 text-sm font-semibold outline-none focus:border-hive-terracotta focus:ring-4 focus:ring-[var(--hh-focus-ring)]"><option>All types</option>{Object.keys(typeConfig).map((type) => <option key={type}>{type}</option>)}</select></div></header>
    <div className="px-4 py-5 sm:px-8 sm:py-7">{groups.length ? groups.map((section) => <section key={section.group}><p className="mb-3 px-1 text-xs font-bold uppercase tracking-[0.16em] text-hive-muted">{section.group}</p><div className="space-y-2">{section.items.map((notification) => { const config = typeConfig[notification.type]; const Icon = config.icon; return <button key={notification.id} type="button" onClick={() => toggleRead(notification.id)} className={`flex w-full gap-3 rounded-hive-lg p-4 text-left transition sm:p-5 ${notification.unread ? "bg-hive-rose-soft/60 hover:bg-hive-rose-soft" : "hover:bg-hive-canvas"}`}><span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-hive-md ${config.className}`}><Icon size={18} /></span><span className="min-w-0 flex-1"><span className="flex items-start justify-between gap-3"><span className="font-bold text-hive-ink">{notification.title}</span>{notification.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-hive-terracotta" />}</span><span className="mt-1.5 block text-sm leading-6 text-hive-muted">{notification.text}</span><span className="mt-2 block text-xs font-semibold text-hive-muted">{notification.time} · Tap to mark as {notification.unread ? "read" : "unread"}</span></span></button>; })}</div></section>) : <Card className="px-6 py-14 text-center"><CheckCircle className="mx-auto text-hive-sage" size={30} /><h2 className="mt-4 text-xl font-bold">You&apos;re all caught up.</h2><p className="mt-2 text-sm leading-6 text-hive-muted">Try another filter or enjoy the quiet while it lasts.</p><Button className="mt-6" variant="outline" onClick={() => { setStateFilter("All"); setTypeFilter("All types"); }}>Clear filters</Button></Card>}</div>
  </div></main>;
}

export default NotificationsPage;
