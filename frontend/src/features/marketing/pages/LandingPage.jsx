import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle,
  ChevronDown,
  Menu,
  MessageCircle,
  Quote,
  ShoppingBasket,
  Sparkles,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "../../../components/ui";
import logo from "../../../assets/images/brand/homehive-logo.png";

const features = [
  { icon: CheckCircle, title: "Smart chores", text: "Fair rotations and clear due dates mean every task has an owner." },
  { icon: Calendar, title: "Shared calendar", text: "Keep guests, move-ins, birthdays, and house plans visible to everyone." },
  { icon: MessageCircle, title: "Hive chat", text: "Make decisions in one calm, searchable place instead of scattered messages." },
  { icon: ShoppingBasket, title: "Grocery lists", text: "Add what is needed the moment you notice it—then check it off together." },
  { icon: Wallet, title: "Bills, made clear", text: "Track shared costs and friendly reminders without awkward follow-ups." },
  { icon: Bell, title: "Gentle notifications", text: "The right person gets the right reminder, right when it matters." },
];

const problems = [
  { title: "Forgotten chores", text: "Nobody remembers whose turn it was—or when it was last done." },
  { title: "Messy communication", text: "Important decisions disappear inside a nonstop group chat." },
  { title: "Uneven effort", text: "The same people quietly carry more than their fair share." },
  { title: "Bill confusion", text: "Rent, utilities, and reimbursements become a monthly guessing game." },
];

const faqs = [
  { question: "Is HomeHive free to start?", answer: "Yes. Create your Hive and start organizing your household with the core tools at no cost." },
  { question: "Who is HomeHive for?", answer: "HomeHive is designed for roommates first, and works beautifully for families and shared homes too." },
  { question: "Can everyone join the same household?", answer: "Yes. Create a Hive, invite your members, and give everyone one shared source of truth." },
  { question: "Do we need to use every feature?", answer: "No. Start with chores or chat and add the tools your household actually needs." },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
};

function Landing() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const startHive = () => navigate("/create-hive");

  return (
    <main className="overflow-hidden bg-hive-canvas text-hive-ink">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-hive-border/70 bg-hive-canvas/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
          <button type="button" onClick={() => scrollTo("top")} className="flex items-center gap-2.5" aria-label="HomeHive home">
            <img src={logo} alt="" className="h-8 w-8 object-contain" />
            <span className="text-lg font-bold tracking-tight">HomeHive</span>
          </button>

          <div className="hidden items-center gap-8 text-sm font-semibold text-hive-muted md:flex">
            <button type="button" onClick={() => scrollTo("features")} className="transition hover:text-hive-terracotta">Features</button>
            <button type="button" onClick={() => scrollTo("how-it-works")} className="transition hover:text-hive-terracotta">How it works</button>
            <button type="button" onClick={() => scrollTo("faq")} className="transition hover:text-hive-terracotta">FAQ</button>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" onClick={() => scrollTo("how-it-works")}>See how it works</Button>
            <Button onClick={startHive}>Create your Hive <ArrowRight size={16} /></Button>
          </div>

          <button type="button" onClick={() => setIsMenuOpen((open) => !open)} className="rounded-hive-sm p-2 text-hive-ink md:hidden" aria-expanded={isMenuOpen} aria-label="Toggle navigation">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-hive-border bg-hive-surface px-5 pb-5 pt-3 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {[['features', 'Features'], ['how-it-works', 'How it works'], ['faq', 'FAQ']].map(([id, label]) => (
                <button key={id} type="button" onClick={() => scrollTo(id)} className="rounded-hive-sm px-3 py-3 text-left font-semibold text-hive-muted hover:bg-hive-rose-soft">{label}</button>
              ))}
              <Button className="mt-3" fullWidth onClick={startHive}>Create your Hive <ArrowRight size={16} /></Button>
            </div>
          </div>
        )}
      </nav>

      <section id="top" className="relative px-5 pb-20 pt-36 sm:px-6 lg:pb-28 lg:pt-44">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_50%_0%,#f9e0cb_0%,transparent_57%)]" />
        <motion.div {...reveal} className="mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-hive-border bg-hive-surface px-4 py-2 text-sm font-semibold text-hive-muted shadow-sm">
            <Sparkles size={16} className="text-hive-terracotta" /> One Home. One Team. Everything in Sync.
          </div>
          <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-bold tracking-[-0.045em] text-hive-ink sm:text-6xl lg:text-7xl">
            Shared living, finally <span className="text-hive-terracotta">in harmony.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-hive-muted sm:text-xl">
            HomeHive gives every household a calm, clear place for chores, plans, bills, and the little things that keep a home running well.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" onClick={startHive}>Create your Hive — it&apos;s free <ArrowRight size={18} /></Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo("features")}>Explore the product</Button>
          </div>
          <p className="mt-4 text-sm text-hive-muted">No credit card. Set up your household in minutes.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="mx-auto mt-14 max-w-6xl lg:mt-18">
          <div className="rounded-[2rem] border border-hive-border bg-hive-surface p-3 shadow-hive-float sm:p-5">
            <div className="overflow-hidden rounded-[1.45rem] bg-hive-ink-soft p-4 text-left text-white sm:p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-hive-md bg-hive-honey text-lg">H</div><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-hive-honey">Maple House</p><p className="mt-0.5 text-lg font-bold">Good morning, Aisha</p></div></div>
                <div className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/85">92% in sync</div>
              </div>
              <div className="mt-5 grid gap-4 lg:grid-cols-[1.25fr_0.8fr]">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-hive-lg bg-white/10 p-5"><div className="flex items-center justify-between"><p className="font-semibold">Today&apos;s chores</p><CheckCircle size={19} className="text-hive-honey" /></div><div className="mt-5 space-y-3 text-sm text-white/80"><p className="flex justify-between"><span>Kitchen reset</span><span className="text-hive-honey">Aisha</span></p><p className="flex justify-between"><span>Take out recycling</span><span>Marcus</span></p><p className="flex justify-between"><span>Laundry</span><span>Julian</span></p></div></div>
                  <div className="rounded-hive-lg bg-white/10 p-5"><div className="flex items-center justify-between"><p className="font-semibold">This week</p><Calendar size={19} className="text-hive-honey" /></div><p className="mt-5 text-2xl font-bold">3 shared plans</p><p className="mt-1 text-sm text-white/60">Dinner Friday · Rent Monday</p><div className="mt-5 h-2 rounded-full bg-white/15"><div className="h-2 w-3/4 rounded-full bg-hive-terracotta" /></div></div>
                </div>
                <div className="rounded-hive-lg bg-hive-honey p-5 text-hive-ink"><p className="text-sm font-bold uppercase tracking-[0.12em]">Hive activity</p><div className="mt-5 space-y-4"><div><p className="font-bold">Marcus completed recycling</p><p className="mt-1 text-sm opacity-70">Just now</p></div><div><p className="font-bold">Groceries added to the list</p><p className="mt-1 text-sm opacity-70">Milk, pasta, coffee</p></div><div className="rounded-hive-md bg-white/50 p-3 text-sm font-semibold">Everyone knows what&apos;s next.</div></div></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="border-y border-hive-border bg-hive-surface px-5 py-20 sm:px-6 lg:py-28">
        <motion.div {...reveal} className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.16em] text-hive-terracotta">The problem</p><h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Living together shouldn&apos;t feel like project management.</h2><p className="mt-5 text-lg leading-8 text-hive-muted">Small gaps in communication turn into tension. HomeHive gives everyone clarity before small things become big things.</p></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{problems.map((problem, index) => <Card key={problem.title} className="p-6"><p className="text-sm font-bold text-hive-terracotta">0{index + 1}</p><h3 className="mt-6 text-xl font-bold">{problem.title}</h3><p className="mt-3 leading-7 text-hive-muted">{problem.text}</p></Card>)}</div></motion.div>
      </section>

      <section id="features" className="px-5 py-20 sm:px-6 lg:py-28">
        <motion.div {...reveal} className="mx-auto max-w-7xl"><div className="mx-auto max-w-2xl text-center"><p className="text-sm font-bold uppercase tracking-[0.16em] text-hive-terracotta">Built for the whole home</p><h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Every shared detail, beautifully organized.</h2></div><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{features.map(({ icon: Icon, title, text }) => <motion.div key={title} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}><Card interactive className="h-full p-7"><div className="flex h-11 w-11 items-center justify-center rounded-hive-md bg-hive-rose-soft text-hive-terracotta"><Icon size={21} /></div><h3 className="mt-6 text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-hive-muted">{text}</p></Card></motion.div>)}</div></motion.div>
      </section>

      <section id="how-it-works" className="bg-hive-ink-soft px-5 py-20 text-white sm:px-6 lg:py-28">
        <motion.div {...reveal} className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.16em] text-hive-honey">How it works</p><h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">A more peaceful home starts in three steps.</h2></div><div className="mt-12 grid gap-5 md:grid-cols-3">{[["01", "Create your Hive", "Choose your household name and make a shared space feel like home."], ["02", "Invite your members", "Bring everyone in with a simple invite—no setup stress required."], ["03", "Stay in sync", "Assign, plan, chat, and celebrate the things your household gets done."]].map(([number, title, text]) => <div key={number} className="rounded-hive-xl border border-white/10 bg-white/5 p-7"><p className="text-4xl font-bold text-hive-honey">{number}</p><h3 className="mt-10 text-2xl font-bold">{title}</h3><p className="mt-4 leading-7 text-white/65">{text}</p></div>)}</div></motion.div>
      </section>

      <section className="bg-hive-sage-soft px-5 py-20 sm:px-6 lg:py-28"><motion.div {...reveal} className="mx-auto max-w-4xl text-center"><Quote className="mx-auto text-hive-sage" size={32} /><blockquote className="mt-7 text-3xl font-bold tracking-tight text-hive-ink sm:text-4xl">“We finally have one place for the things that used to turn into arguments.”</blockquote><p className="mt-6 font-semibold text-hive-muted">Testimonial placeholder · HomeHive member</p><div className="mt-10 grid grid-cols-3 divide-x divide-hive-sage/20"><div><p className="text-2xl font-bold">Less</p><p className="mt-1 text-sm text-hive-muted">reminding</p></div><div><p className="text-2xl font-bold">More</p><p className="mt-1 text-sm text-hive-muted">clarity</p></div><div><p className="text-2xl font-bold">One</p><p className="mt-1 text-sm text-hive-muted">shared home</p></div></div></motion.div></section>

      <section id="faq" className="px-5 py-20 sm:px-6 lg:py-28"><motion.div {...reveal} className="mx-auto max-w-3xl"><div className="text-center"><p className="text-sm font-bold uppercase tracking-[0.16em] text-hive-terracotta">FAQ</p><h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">A few good questions.</h2></div><div className="mt-12 divide-y divide-hive-border rounded-hive-xl border border-hive-border bg-hive-surface px-6">{faqs.map((faq, index) => <div key={faq.question}><button type="button" onClick={() => setOpenFaq((current) => current === index ? -1 : index)} className="flex w-full items-center justify-between gap-6 py-5 text-left font-bold text-hive-ink" aria-expanded={openFaq === index}><span>{faq.question}</span><ChevronDown size={20} className={`shrink-0 text-hive-terracotta transition ${openFaq === index ? "rotate-180" : ""}`} /></button>{openFaq === index && <p className="max-w-2xl pb-5 leading-7 text-hive-muted">{faq.answer}</p>}</div>)}</div></motion.div></section>

      <section className="px-5 pb-20 sm:px-6 lg:pb-28"><motion.div {...reveal} className="mx-auto max-w-6xl rounded-[2rem] bg-hive-terracotta px-6 py-14 text-center text-white sm:px-12 sm:py-18"><Users className="mx-auto" size={32} /><h2 className="mx-auto mt-5 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">Make home feel like a team again.</h2><p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/80">Create one calm place for the people and responsibilities you share.</p><Button className="mt-8 bg-white text-hive-terracotta hover:bg-hive-canvas" size="lg" onClick={startHive}>Start your Hive <ArrowRight size={18} /></Button></motion.div></section>

      <footer className="border-t border-hive-border px-5 py-8 sm:px-6"><div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-hive-muted sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2"><img src={logo} alt="" className="h-7 w-7 object-contain" /><span className="font-bold text-hive-ink">HomeHive</span></div><p>One Home. One Team. Everything in Sync.</p><p>© 2026 HomeHive</p></div></footer>
    </main>
  );
}

export default Landing;
