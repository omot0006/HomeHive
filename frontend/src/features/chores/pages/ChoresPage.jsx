import { motion } from "framer-motion";
import { Calendar, CheckCircle, Clock, History, Pencil, Plus, RotateCcw, Sparkles, Trophy, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge, Button, Card, Input, Modal } from "../../../components/ui";

const people = ["Aisha", "Sarah", "Mike", "Lena"];
const initialChores = [
  { id: 1, title: "Kitchen reset", person: "Aisha", due: "Today · 6:00 PM", day: "Mon", priority: "High", status: "In progress", completedAt: null },
  { id: 2, title: "Take out recycling", person: "Mike", due: "Today · 8:00 PM", day: "Mon", priority: "Normal", status: "Scheduled", completedAt: null },
  { id: 3, title: "Vacuum living room", person: "Sarah", due: "Tuesday", day: "Tue", priority: "Normal", status: "Scheduled", completedAt: null },
  { id: 4, title: "Bathroom refresh", person: "Lena", due: "Wednesday", day: "Wed", priority: "Low", status: "Scheduled", completedAt: null },
  { id: 5, title: "Wipe the counters", person: "Aisha", due: "Completed today", day: "Mon", priority: "Low", status: "Completed", completedAt: "Today · 9:14 AM" },
  { id: 6, title: "Refill pantry staples", person: "Mike", due: "Completed yesterday", day: "Sun", priority: "Normal", status: "Completed", completedAt: "Yesterday · 6:40 PM" },
];

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const priorityVariant = { High: "accent", Normal: "warning", Low: "neutral" };

function Chores() {
  const [chores, setChores] = useState(initialChores);
  const [view, setView] = useState("My chores");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChore, setEditingChore] = useState(null);
  const [form, setForm] = useState({ title: "", person: "Aisha", due: "Tomorrow", priority: "Normal", day: "Tue" });
  const [rotationIndex, setRotationIndex] = useState(1);
  const [celebration, setCelebration] = useState("");

  const visibleChores = useMemo(() => chores.filter((chore) => {
    if (view === "My chores") return chore.person === "Aisha" && chore.status !== "Completed";
    if (view === "Completed") return chore.status === "Completed";
    return true;
  }), [chores, view]);
  const history = chores.filter((chore) => chore.status === "Completed").sort((a, b) => b.id - a.id);
  const nextPerson = people[rotationIndex];

  const openCreate = () => { setEditingChore(null); setForm({ title: "", person: nextPerson, due: "Tomorrow", priority: "Normal", day: "Tue" }); setIsModalOpen(true); };
  const openEdit = (chore) => { setEditingChore(chore); setForm({ title: chore.title, person: chore.person, due: chore.due, priority: chore.priority, day: chore.day }); setIsModalOpen(true); };
  const saveChore = () => {
    if (!form.title.trim()) return;
    if (editingChore) setChores((current) => current.map((chore) => chore.id === editingChore.id ? { ...chore, ...form } : chore));
    else setChores((current) => [...current, { id: Date.now(), ...form, status: "Scheduled", completedAt: null }]);
    setEditingChore(null);
    setIsModalOpen(false);
  };
  const completeChore = (id) => {
    const completed = chores.find((chore) => chore.id === id);
    setChores((current) => current.map((chore) => chore.id === id ? { ...chore, status: "Completed", due: "Completed today", completedAt: "Just now" } : chore));
    setCelebration(`${completed.title} completed — beautiful work!`);
    window.setTimeout(() => setCelebration(""), 3000);
  };

  return (
    <main className="min-h-screen bg-hive-canvas px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-hive-terracotta"><Sparkles size={16} /> Shared rhythm</div><h1 className="mt-3 text-4xl font-bold tracking-tight text-hive-ink sm:text-5xl">Household chores</h1><p className="mt-3 max-w-xl text-hive-muted">A clear, kinder way to share the work that makes home feel good.</p></div><Button size="lg" onClick={openCreate}><Plus size={18} /> Create chore</Button></header>

        {celebration && <motion.div initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="mt-6 flex items-center gap-3 rounded-hive-lg bg-hive-sage-soft px-5 py-4 text-hive-sage"><Trophy size={20} /><p className="font-bold">{celebration}</p></motion.div>}

        <section className="mt-7 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="overflow-hidden bg-hive-ink-soft p-6 text-white sm:p-8"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start"><div><Badge variant="warning">Fair rotation</Badge><h2 className="mt-5 text-2xl font-bold">It&apos;s {nextPerson}&apos;s turn next.</h2><p className="mt-2 max-w-md leading-7 text-white/65">HomeHive rotates new shared chores through everyone so the invisible work stays visible—and fair.</p></div><div className="flex h-12 w-12 items-center justify-center rounded-hive-lg bg-hive-honey text-hive-ink"><RotateCcw size={22} /></div></div><div className="mt-7 flex items-center gap-2">{people.map((person, index) => <div key={person} className="flex items-center gap-2"><div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${index === rotationIndex ? "bg-hive-honey text-hive-ink ring-4 ring-white/15" : "bg-white/10 text-white/70"}`}>{person.slice(0, 1)}</div>{index < people.length - 1 && <span className="h-px w-4 bg-white/20" />}</div>)}</div><div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5"><span className="text-sm text-white/60">Next rotation after the kitchen reset</span><Button size="sm" variant="secondary" onClick={() => setRotationIndex((current) => (current + 1) % people.length)}>Preview next turn</Button></div></Card>
          <Card className="p-6 sm:p-8"><div className="flex items-center justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-hive-terracotta">This week</p><h2 className="mt-2 text-2xl font-bold">A balanced home</h2></div><Users className="text-hive-terracotta" /></div><div className="mt-7 grid grid-cols-3 gap-3 text-center"><div><p className="text-3xl font-bold">{chores.filter((chore) => chore.status !== "Completed").length}</p><p className="mt-1 text-sm text-hive-muted">Open chores</p></div><div><p className="text-3xl font-bold text-hive-sage">{history.length}</p><p className="mt-1 text-sm text-hive-muted">Completed</p></div><div><p className="text-3xl font-bold text-hive-terracotta">{people.length}</p><p className="mt-1 text-sm text-hive-muted">Contributors</p></div></div><div className="mt-7 h-2 overflow-hidden rounded-full bg-hive-rose-soft"><div className="h-full rounded-full bg-hive-sage transition-all duration-500" style={{ width: `${Math.round((history.length / chores.length) * 100)}%` }} /></div><p className="mt-3 text-sm text-hive-muted">{Math.round((history.length / chores.length) * 100)}% of this week&apos;s chores are done.</p></Card>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
          <Card className="p-5 sm:p-7"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-hive-terracotta">Chore list</p><h2 className="mt-2 text-2xl font-bold">What needs a hand</h2></div><div className="flex rounded-hive-md bg-hive-canvas p-1">{["My chores", "All chores", "Completed"].map((item) => <button key={item} type="button" onClick={() => setView(item)} className={`rounded-hive-sm px-3 py-2 text-sm font-semibold transition ${view === item ? "bg-hive-surface text-hive-ink shadow-sm" : "text-hive-muted hover:text-hive-ink"}`}>{item}</button>)}</div></div><div className="mt-6 grid gap-3 md:grid-cols-2">{visibleChores.length ? visibleChores.map((chore) => <motion.div layout key={chore.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-hive-lg border border-hive-border bg-hive-surface p-5 transition hover:-translate-y-0.5 hover:shadow-hive-card"><div className="flex items-start justify-between gap-3"><div><h3 className={`font-bold ${chore.status === "Completed" ? "text-hive-muted line-through" : "text-hive-ink"}`}>{chore.title}</h3><p className="mt-1 text-sm text-hive-muted">{chore.due}</p></div><Badge variant={priorityVariant[chore.priority]}>{chore.priority}</Badge></div><div className="mt-5 flex items-center justify-between"><div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-hive-rose-soft text-xs font-bold text-hive-terracotta">{chore.person.slice(0, 1)}</span><div><p className="text-sm font-semibold">{chore.person}</p><p className="text-xs text-hive-muted">{chore.status}</p></div></div>{chore.status === "Completed" ? <Badge variant="success">Done</Badge> : <div className="flex gap-1"><button type="button" aria-label={`Edit ${chore.title}`} onClick={() => openEdit(chore)} className="rounded-hive-sm p-2 text-hive-muted transition hover:bg-hive-rose-soft hover:text-hive-terracotta"><Pencil size={16} /></button><button type="button" aria-label={`Complete ${chore.title}`} onClick={() => completeChore(chore.id)} className="rounded-hive-sm bg-hive-sage-soft p-2 text-hive-sage transition hover:bg-hive-sage hover:text-white"><CheckCircle size={16} /></button></div>}</div></motion.div>) : <div className="col-span-full rounded-hive-lg border border-dashed border-hive-border py-12 text-center text-hive-muted">No chores in this view yet.</div>}</div></Card>
          <Card className="overflow-x-auto p-5 sm:p-7"><div className="flex min-w-[34rem] items-center justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-hive-terracotta">Weekly calendar</p><h2 className="mt-2 text-2xl font-bold">The home rhythm</h2></div><Calendar className="text-hive-terracotta" /></div><div className="mt-6 grid min-w-[34rem] grid-cols-7 gap-1.5">{weekdays.map((day) => <div key={day} className="min-h-28 rounded-hive-sm bg-hive-canvas p-2"><p className={`text-center text-xs font-bold ${day === "Mon" ? "text-hive-terracotta" : "text-hive-muted"}`}>{day}</p><div className="mt-3 space-y-1.5">{chores.filter((chore) => chore.day === day && chore.status !== "Completed").map((chore) => <div key={chore.id} title={chore.title} className="rounded bg-hive-rose-soft px-1.5 py-1 text-[10px] font-semibold leading-tight text-hive-terracotta">{chore.title}</div>)}</div></div>)}</div><p className="mt-5 flex min-w-[34rem] items-center gap-2 text-sm text-hive-muted"><Clock size={16} /> Tap into a calmer week, one small task at a time.</p></Card>
        </section>

        <section className="mt-5"><Card className="p-5 sm:p-7"><div className="flex items-center justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-hive-terracotta">Completion history</p><h2 className="mt-2 text-2xl font-bold">Wins worth noticing</h2></div><History className="text-hive-terracotta" /></div><div className="mt-6 grid gap-3 md:grid-cols-3">{history.map((chore) => <div key={chore.id} className="flex items-center gap-3 rounded-hive-lg bg-hive-sage-soft p-4"><CheckCircle className="shrink-0 text-hive-sage" size={20} /><div><p className="font-semibold">{chore.person} finished {chore.title}</p><p className="mt-1 text-sm text-hive-muted">{chore.completedAt}</p></div></div>)}</div></Card></section>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingChore(null); }} title={editingChore?.id ? "Edit chore" : "Create a chore"} description="Assign it clearly and keep the household rhythm fair."><div className="space-y-5"><Input label="Chore title" placeholder="e.g. Clean the stove" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /><div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm font-semibold">Assigned person<select value={form.person} onChange={(event) => setForm({ ...form, person: event.target.value })} className="mt-2 min-h-12 w-full rounded-hive-md border border-hive-border bg-hive-surface px-3 font-normal outline-none focus:border-hive-terracotta focus:ring-4 focus:ring-[var(--hh-focus-ring)]">{people.map((person) => <option key={person}>{person}</option>)}</select></label><label className="block text-sm font-semibold">Priority<select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })} className="mt-2 min-h-12 w-full rounded-hive-md border border-hive-border bg-hive-surface px-3 font-normal outline-none focus:border-hive-terracotta focus:ring-4 focus:ring-[var(--hh-focus-ring)]"><option>Low</option><option>Normal</option><option>High</option></select></label></div><Input label="Due date" placeholder="Tomorrow" value={form.due} onChange={(event) => setForm({ ...form, due: event.target.value })} /><div className="flex gap-3"><Button variant="outline" fullWidth onClick={() => { setIsModalOpen(false); setEditingChore(null); }}>Cancel</Button><Button fullWidth onClick={saveChore}>{editingChore?.id ? "Save changes" : "Create chore"}</Button></div></div></Modal>
    </main>
  );
}

export default Chores;
