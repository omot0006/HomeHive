import { CheckCircle, ChevronLeft, Copy, Home, Mail, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Card, Input } from "../../../components/ui";
import Logo from "../../../components/common/Logo";
import OnboardingProgress from "../components/OnboardingProgress";

const householdTypes = ["Apartment", "Family home", "Student house", "Couple", "Other"];
const avatars = ["AM", "JM", "SK", "RL", "HS"];

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [path, setPath] = useState("create");
  const [hive, setHive] = useState({ name: "", type: "Apartment", joinCode: "" });
  const [inviteEmail, setInviteEmail] = useState("");
  const [invites, setInvites] = useState([]);
  const [avatar, setAvatar] = useState("AM");
  const [preferences, setPreferences] = useState({ reminders: "Friendly", choreDay: "Sunday" });
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const next = () => {
    if (step === 2 && path === "create" && !hive.name.trim()) { setError("Give your household a name to continue."); return; }
    if (step === 2 && path === "join" && !hive.joinCode.trim()) { setError("Enter the invite code shared by your household."); return; }
    setError("");
    setStep((current) => Math.min(current + 1, 4));
  };

  const addInvite = () => {
    if (!inviteEmail.includes("@")) { setError("Enter a valid email address to send an invite."); return; }
    if (!invites.includes(inviteEmail)) setInvites((current) => [...current, inviteEmail]);
    setInviteEmail("");
    setError("");
  };

  const copyCode = async () => {
    try { await navigator.clipboard.writeText("HOME-482"); } catch { /* Clipboard may be unavailable in local preview. */ }
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 1600);
  };

  const title = ["Welcome to HomeHive", "How will you join your household?", "Bring your people in", "Make it feel like home"][step - 1];
  const description = ["Let’s set up the shared space that keeps your home in sync.", "Start a new Hive or connect to one that already exists.", "Invite members by email, or share your Hive code whenever you’re ready.", "A few finishing touches help HomeHive fit your household."][step - 1];

  return (
    <main className="min-h-screen bg-hive-canvas px-4 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-3xl">
        <header className="flex items-center justify-between"><button type="button" onClick={() => navigate("/")}><Logo size="small" textClassName="text-hive-ink" /></button><Badge variant="accent">Setup</Badge></header>
        <Card className="mt-6 overflow-hidden p-5 sm:mt-8 sm:p-10">
          <OnboardingProgress currentStep={step} />
          <div className="mt-10">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-hive-terracotta">Step {step} of 4</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-hive-ink sm:text-4xl">{title}</h1>
            <p className="mt-3 max-w-xl leading-7 text-hive-muted">{description}</p>
          </div>

          {step === 1 && <div className="mt-10 rounded-hive-xl bg-hive-rose-soft p-6 sm:p-8"><Sparkles className="text-hive-terracotta" size={30} /><h2 className="mt-5 text-2xl font-bold">A better rhythm for everyday life.</h2><p className="mt-3 max-w-lg leading-7 text-hive-muted">Chores, plans, messages, and shared costs all get a clear home—so your actual home can feel lighter.</p><div className="mt-7 flex flex-wrap gap-2"><Badge variant="success">Fairer chores</Badge><Badge variant="neutral">Clear plans</Badge><Badge variant="warning">Fewer reminders</Badge></div></div>}

          {step === 2 && <div className="mt-9"><div className="grid gap-4 sm:grid-cols-2"><button type="button" onClick={() => { setPath("create"); setError(""); }} className={`rounded-hive-lg border p-5 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hh-focus-ring)] ${path === "create" ? "border-hive-terracotta bg-hive-rose-soft" : "border-hive-border hover:border-hive-terracotta/50"}`}><Home className="text-hive-terracotta" /><h2 className="mt-5 text-xl font-bold">Create a new Hive</h2><p className="mt-2 text-sm leading-6 text-hive-muted">Set up a fresh shared space for your household.</p></button><button type="button" onClick={() => { setPath("join"); setError(""); }} className={`rounded-hive-lg border p-5 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hh-focus-ring)] ${path === "join" ? "border-hive-terracotta bg-hive-rose-soft" : "border-hive-border hover:border-hive-terracotta/50"}`}><Users className="text-hive-terracotta" /><h2 className="mt-5 text-xl font-bold">Join an existing Hive</h2><p className="mt-2 text-sm leading-6 text-hive-muted">Use an invite code from the people you live with.</p></button></div>{path === "create" ? <div className="mt-7 space-y-5"><Input label="Household name" placeholder="Maple House" value={hive.name} error={error} onChange={(event) => { setHive({ ...hive, name: event.target.value }); setError(""); }} /><div><p className="mb-3 text-sm font-semibold text-hive-ink">Household type</p><div className="flex flex-wrap gap-2">{householdTypes.map((type) => <Button key={type} variant={hive.type === type ? "secondary" : "outline"} size="sm" onClick={() => setHive({ ...hive, type })}>{type}</Button>)}</div></div></div> : <div className="mt-7"><Input label="Invite code" placeholder="HOME-482" value={hive.joinCode} error={error} onChange={(event) => { setHive({ ...hive, joinCode: event.target.value.toUpperCase() }); setError(""); }} hint="Ask a current member for the household invite code." /></div>}</div>}

          {step === 3 && <div className="mt-9"><div className="rounded-hive-lg bg-hive-sage-soft p-5"><div className="flex gap-3"><Mail className="mt-0.5 shrink-0 text-hive-sage" size={20} /><div><h2 className="font-bold">Email invitations</h2><p className="mt-1 text-sm leading-6 text-hive-muted">Add roommates now, or return to invites anytime from your dashboard.</p></div></div><div className="mt-5 flex flex-col gap-3 sm:flex-row"><Input aria-label="Member email" placeholder="roommate@example.com" value={inviteEmail} error={error} onChange={(event) => { setInviteEmail(event.target.value); setError(""); }} /><Button onClick={addInvite}>Add invite</Button></div></div>{invites.length > 0 && <div className="mt-4 space-y-2">{invites.map((email) => <div key={email} className="flex items-center justify-between rounded-hive-md border border-hive-border px-4 py-3 text-sm"><span>{email}</span><Badge variant="success">Ready to send</Badge></div>)}</div>}<div className="mt-6 rounded-hive-lg border border-hive-border p-5"><p className="font-bold">Or share your invite code</p><p className="mt-1 text-sm text-hive-muted">Anyone with this code can request to join your Hive.</p><div className="mt-4 flex items-center justify-between rounded-hive-md bg-hive-canvas px-4 py-3"><code className="font-bold tracking-[0.18em] text-hive-ink">HOME-482</code><button type="button" onClick={copyCode} className="flex items-center gap-2 text-sm font-bold text-hive-terracotta hover:text-hive-terracotta-strong"><Copy size={16} />{isCopied ? "Copied" : "Copy"}</button></div></div></div>}

          {step === 4 && <div className="mt-9"><div><p className="text-sm font-semibold text-hive-ink">Choose an avatar</p><div className="mt-4 flex flex-wrap gap-3">{avatars.map((initials, index) => <button key={initials} type="button" onClick={() => setAvatar(initials)} className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hh-focus-ring)] ${avatar === initials ? "bg-hive-terracotta text-white ring-4 ring-hive-rose-soft" : index % 2 ? "bg-hive-honey text-hive-ink" : "bg-hive-sage-soft text-hive-sage"}`}>{initials}</button>)}</div></div><div className="mt-8 grid gap-5 sm:grid-cols-2"><label className="block text-sm font-semibold text-hive-ink">Reminder style<select value={preferences.reminders} onChange={(event) => setPreferences({ ...preferences, reminders: event.target.value })} className="mt-2 min-h-12 w-full rounded-hive-md border border-hive-border bg-hive-surface px-4 font-normal text-hive-ink outline-none focus:border-hive-terracotta focus:ring-4 focus:ring-[var(--hh-focus-ring)]"><option>Friendly</option><option>Direct</option><option>Quiet</option></select></label><label className="block text-sm font-semibold text-hive-ink">Weekly chore refresh<select value={preferences.choreDay} onChange={(event) => setPreferences({ ...preferences, choreDay: event.target.value })} className="mt-2 min-h-12 w-full rounded-hive-md border border-hive-border bg-hive-surface px-4 font-normal text-hive-ink outline-none focus:border-hive-terracotta focus:ring-4 focus:ring-[var(--hh-focus-ring)]"><option>Sunday</option><option>Monday</option><option>Friday</option></select></label></div><div className="mt-8 rounded-hive-lg bg-hive-rose-soft p-5"><p className="font-bold">You&apos;re all set.</p><p className="mt-1 text-sm leading-6 text-hive-muted">You can change these anytime as your household finds its rhythm.</p></div></div>}

          <div className="mt-10 flex items-center justify-between gap-3 border-t border-hive-border pt-6">{step > 1 ? <Button variant="ghost" onClick={() => { setError(""); setStep((current) => current - 1); }}><ChevronLeft size={17} /> Back</Button> : <span />}{step < 4 ? <Button size="lg" onClick={next}>Continue</Button> : <Button size="lg" onClick={() => navigate("/dashboard")}>Finish setup <CheckCircle size={18} /></Button>}</div>
        </Card>
        <p className="mt-5 text-center text-sm text-hive-muted">You can update these choices anytime in Household settings.</p>
      </div>
    </main>
  );
}

export default OnboardingPage;
