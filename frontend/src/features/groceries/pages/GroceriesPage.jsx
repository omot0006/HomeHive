import { CheckCircle, Clock, Package, Plus, ShoppingBasket, SlidersHorizontal, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge, Button, Card, Input, Modal } from "../../../components/ui";

const categories = ["All", "Food", "Cleaning", "Household"];
const categoryVariant = { Food: "accent", Cleaning: "success", Household: "warning" };
const initialItems = [
  { id: 1, name: "Oat milk", quantity: "2 cartons", category: "Food", addedBy: "Sarah", purchased: false },
  { id: 2, name: "Pasta", quantity: "1 bag", category: "Food", addedBy: "Sarah", purchased: false },
  { id: 3, name: "Dish soap", quantity: "1 bottle", category: "Cleaning", addedBy: "Mike", purchased: false },
  { id: 4, name: "Paper towels", quantity: "2 rolls", category: "Household", addedBy: "Aisha", purchased: false },
  { id: 5, name: "Coffee beans", quantity: "1 bag", category: "Food", addedBy: "Lena", purchased: true, boughtBy: "Aisha", boughtAt: "Today · 9:12 AM" },
  { id: 6, name: "Bin liners", quantity: "1 pack", category: "Household", addedBy: "Mike", purchased: true, boughtBy: "Mike", boughtAt: "Yesterday · 6:38 PM" },
];

function GroceriesPage() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [items, setItems] = useState(initialItems);
  const [category, setCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", quantity: "1", category: "Food" });
  const visibleItems = items.filter((item) => !item.purchased && (category === "All" || item.category === category));
  const history = useMemo(() => items.filter((item) => item.purchased).slice().reverse(), [items]);

  const addItem = () => {
    if (!form.name.trim()) return;
    setItems((current) => [...current, { id: Date.now(), name: form.name, quantity: form.quantity || "1", category: form.category, addedBy: "Aisha", purchased: false }]);
    setForm({ name: "", quantity: "1", category: "Food" }); setIsModalOpen(false);
  };
  const purchaseItem = (id) => setItems((current) => current.map((item) => item.id === id ? { ...item, purchased: true, boughtBy: "Aisha", boughtAt: "Just now" } : item));

  if (!isEnabled) return <main className="flex min-h-screen items-center justify-center bg-hive-canvas p-5"><Card className="w-full max-w-lg p-7 text-center sm:p-10"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-hive-lg bg-hive-rose-soft text-hive-terracotta"><ShoppingBasket size={25} /></div><h1 className="mt-6 text-3xl font-bold tracking-tight">Groceries are paused</h1><p className="mt-3 leading-7 text-hive-muted">Maple House can enable a shared shopping list whenever it becomes useful again.</p><Button className="mt-8" size="lg" onClick={() => setIsEnabled(true)}>Enable grocery list</Button></Card></main>;

  return <main className="min-h-screen bg-hive-canvas px-4 py-6 sm:px-6 lg:px-10 lg:py-10"><div className="mx-auto max-w-6xl">
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-hive-terracotta"><ShoppingBasket size={16} /> Shared shopping</p><h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Grocery list</h1><p className="mt-3 text-hive-muted">Add what&apos;s needed. Check it off together.</p></div><div className="flex flex-wrap gap-3"><Button variant="outline" onClick={() => setIsEnabled(false)}><SlidersHorizontal size={17} /> Disable feature</Button><Button size="lg" onClick={() => setIsModalOpen(true)}><Plus size={18} /> Add item</Button></div></header>
    <section className="mt-7 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"><Card className="p-5 sm:p-7"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-hive-terracotta">To pick up</p><h2 className="mt-2 text-2xl font-bold">{visibleItems.length} items on the list</h2></div><div className="flex gap-2 overflow-x-auto pb-1">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-3 py-2 text-sm font-semibold transition ${category === item ? "bg-hive-terracotta text-white" : "bg-hive-canvas text-hive-muted hover:bg-hive-rose-soft"}`}>{item}</button>)}</div></div><div className="mt-6 space-y-3">{visibleItems.map((item) => <div key={item.id} className="flex items-center gap-3 rounded-hive-lg border border-hive-border bg-hive-surface p-4"><button type="button" aria-label={`Mark ${item.name} as purchased`} onClick={() => purchaseItem(item.id)} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-hive-border text-transparent transition hover:border-hive-sage hover:bg-hive-sage hover:text-white"><CheckCircle size={15} /></button><div className="min-w-0 flex-1"><p className="font-bold">{item.name}</p><p className="mt-1 text-sm text-hive-muted">{item.quantity} · added by {item.addedBy}</p></div><Badge variant={categoryVariant[item.category]}>{item.category}</Badge></div>)}{visibleItems.length === 0 && <div className="rounded-hive-lg border border-dashed border-hive-border py-12 text-center"><CheckCircle className="mx-auto text-hive-sage" size={28} /><p className="mt-3 font-bold">Nothing left in this category.</p><p className="mt-1 text-sm text-hive-muted">Your shared list is looking good.</p></div>}</div></Card>
      <Card className="overflow-hidden bg-hive-ink-soft p-6 text-white sm:p-7"><div className="flex items-start justify-between gap-4"><div><Badge variant="warning">Shopping together</Badge><h2 className="mt-5 text-2xl font-bold">Every item has a helpful home.</h2><p className="mt-2 leading-7 text-white/65">See who added an item and who checked it off—without another group-chat message.</p></div><Users className="text-hive-honey" /></div><div className="mt-7 grid grid-cols-2 gap-3 border-t border-white/10 pt-5"><div><p className="text-3xl font-bold text-hive-honey">{items.filter((item) => !item.purchased).length}</p><p className="mt-1 text-sm text-white/60">still needed</p></div><div><p className="text-3xl font-bold text-hive-honey">{history.length}</p><p className="mt-1 text-sm text-white/60">bought recently</p></div></div></Card></section>
    <section className="mt-5"><Card className="p-5 sm:p-7"><div className="flex items-center justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-hive-terracotta">Shopping history</p><h2 className="mt-2 text-2xl font-bold">Who bought what</h2></div><Clock className="text-hive-terracotta" /></div><div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{history.map((item) => <div key={item.id} className="flex items-center gap-3 rounded-hive-lg bg-hive-sage-soft p-4"><div className="flex h-9 w-9 items-center justify-center rounded-hive-sm bg-hive-surface text-hive-sage"><Package size={17} /></div><div><p className="font-semibold">{item.boughtBy} bought {item.name}</p><p className="mt-1 text-sm text-hive-muted">{item.quantity} · {item.boughtAt}</p></div></div>)}</div></Card></section>
  </div><Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add to the grocery list" description="Keep it quick—your household will see it right away."><div className="space-y-5"><Input label="Item name" placeholder="e.g. Apples" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /><div className="grid gap-5 sm:grid-cols-2"><Input label="Quantity" placeholder="e.g. 2 bags" value={form.quantity} onChange={(event) => setForm({ ...form, quantity: event.target.value })} /><label className="block text-sm font-semibold">Category<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="mt-2 min-h-12 w-full rounded-hive-md border border-hive-border bg-hive-surface px-3 font-normal outline-none focus:border-hive-terracotta focus:ring-4 focus:ring-[var(--hh-focus-ring)]"><option>Food</option><option>Cleaning</option><option>Household</option></select></label></div><div className="flex gap-3"><Button variant="outline" fullWidth onClick={() => setIsModalOpen(false)}>Cancel</Button><Button fullWidth onClick={addItem}><Plus size={17} /> Add item</Button></div></div></Modal></main>;
}

export default GroceriesPage;
