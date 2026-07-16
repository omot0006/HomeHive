import { Megaphone, MessageCircle, Paperclip, Search, Send, Smile, Users } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Badge, Button, Card } from "../../../components/ui";
import Logo from "../../../components/common/Logo";
import chatSocket from "../services/chatSocket";

const channels = [
  { id: "general", label: "General chat", description: "Everyday conversation", icon: MessageCircle },
  { id: "announcements", label: "Announcements", description: "Important household updates", icon: Megaphone },
];
const memberStatus = [
  { initials: "AM", name: "Aisha Martin", status: "Online", color: "bg-hive-terracotta" },
  { initials: "SM", name: "Sarah Miller", status: "Online", color: "bg-hive-honey" },
  { initials: "MJ", name: "Mike Jordan", status: "Away", color: "bg-hive-sage" },
  { initials: "LO", name: "Lena Ortiz", status: "Online", color: "bg-[#8d77a8]" },
];
const initialMessages = {
  general: [
    { id: 1, author: "Sarah Miller", initials: "SM", text: "I picked up the oat milk and pasta. They’re on the kitchen counter.", time: "9:42 AM", mine: false, color: "bg-hive-honey" },
    { id: 2, author: "Aisha Martin", initials: "AM", text: "Amazing, thank you! I’ll add it to our grocery total later.", time: "9:47 AM", mine: true, color: "bg-hive-terracotta" },
    { id: 3, author: "Mike Jordan", initials: "MJ", text: "Does anyone mind if we move movie night to Saturday?", time: "10:03 AM", mine: false, color: "bg-hive-sage" },
    { id: 4, author: "Lena Ortiz", initials: "LO", text: "Saturday works for me. I can bring snacks.", time: "10:08 AM", mine: false, color: "bg-[#8d77a8]" },
  ],
  announcements: [
    { id: 5, author: "Aisha Martin", initials: "AM", text: "Reminder: rent is due Monday. Please mark your share complete once it’s sent.", time: "Yesterday", mine: true, color: "bg-hive-terracotta" },
    { id: 6, author: "Aisha Martin", initials: "AM", text: "Sarah’s birthday dinner is Friday at 7:30 PM. Let’s meet in the lobby at 7:15.", time: "Yesterday", mine: true, color: "bg-hive-terracotta" },
  ],
};

function ChatPage() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const typingTimeout = useRef(null);
  const active = channels.find((channel) => channel.id === activeChannel);
  const channelMessages = useMemo(() => messages[activeChannel] ?? [], [activeChannel, messages]);

  useEffect(() => {
    chatSocket.connect();
    const unsubscribe = chatSocket.subscribeToChannel(activeChannel);
    return () => { unsubscribe(); chatSocket.disconnect(); };
  }, [activeChannel]);

  const updateDraft = (value) => {
    setDraft(value);
    chatSocket.sendTyping({ channelId: activeChannel, isTyping: Boolean(value) });
    setIsTyping(Boolean(value));
    window.clearTimeout(typingTimeout.current);
    typingTimeout.current = window.setTimeout(() => setIsTyping(true), 900);
  };
  const sendMessage = (event) => {
    event.preventDefault();
    if (!draft.trim()) return;
    const message = { id: Date.now(), author: "Aisha Martin", initials: "AM", text: draft.trim(), time: "Now", mine: true, color: "bg-hive-terracotta" };
    setMessages((current) => ({ ...current, [activeChannel]: [...(current[activeChannel] ?? []), message] }));
    chatSocket.sendMessage({ channelId: activeChannel, message });
    chatSocket.sendTyping({ channelId: activeChannel, isTyping: false });
    setDraft("");
  };

  return (
    <main className="h-[calc(100dvh-4rem)] min-h-[32rem] overflow-hidden bg-hive-canvas sm:p-4 lg:h-dvh lg:p-6"><div className="mx-auto flex h-full min-w-0 max-w-7xl overflow-hidden border border-hive-border bg-hive-surface shadow-hive-card sm:rounded-[2rem]">
      <aside className="hidden w-72 shrink-0 border-r border-hive-border bg-hive-canvas p-5 md:block"><div className="flex items-center gap-3"><Logo iconOnly size="default" /><div><p className="font-bold">Maple House</p><p className="text-sm text-hive-muted">4 members</p></div></div><p className="mt-9 px-2 text-xs font-bold uppercase tracking-[0.16em] text-hive-muted">Channels</p><nav className="mt-3 space-y-1">{channels.map((channel) => { const Icon = channel.icon; return <button key={channel.id} type="button" onClick={() => setActiveChannel(channel.id)} className={`flex w-full items-center gap-3 rounded-hive-md px-3 py-3 text-left transition ${activeChannel === channel.id ? "bg-hive-rose-soft text-hive-terracotta" : "text-hive-muted hover:bg-hive-surface hover:text-hive-ink"}`}><Icon size={18} /><span className="font-semibold">{channel.label}</span>{channel.id === "announcements" && <Badge variant="accent" className="ml-auto">2</Badge>}</button>; })}</nav><Card className="mt-8 bg-hive-ink-soft p-4 text-white shadow-none"><p className="text-sm font-bold text-hive-honey">House guideline</p><p className="mt-2 text-sm leading-6 text-white/65">Kind, clear messages make shared life easier for everyone.</p></Card></aside>
      <section className="flex min-w-0 flex-1 flex-col"><header className="flex items-center justify-between border-b border-hive-border px-5 py-4 sm:px-7"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-hive-md bg-hive-rose-soft text-hive-terracotta">{activeChannel === "general" ? <MessageCircle size={19} /> : <Megaphone size={19} />}</div><div><h1 className="font-bold sm:text-lg">{active.label}</h1><p className="text-sm text-hive-muted">{active.description}</p></div></div><div className="flex items-center gap-3"><span className="hidden items-center gap-1.5 text-sm font-semibold text-hive-sage sm:flex"><span className="h-2 w-2 rounded-full bg-hive-sage" />3 online</span><button type="button" aria-label="Search messages" className="rounded-hive-sm p-2 text-hive-muted transition hover:bg-hive-rose-soft hover:text-hive-terracotta"><Search size={19} /></button></div></header>
        <div className="border-b border-hive-border px-4 py-2 md:hidden"><div className="flex gap-2 overflow-x-auto">{channels.map((channel) => { const Icon = channel.icon; return <button key={channel.id} type="button" onClick={() => setActiveChannel(channel.id)} className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${activeChannel === channel.id ? "bg-hive-rose-soft text-hive-terracotta" : "bg-hive-canvas text-hive-muted"}`}><Icon size={16} />{channel.label}</button>; })}</div></div>
        <div className="flex-1 space-y-6 overflow-y-auto bg-[#fcfaf7] px-4 py-6 sm:px-7">{channelMessages.map((message) => <article key={message.id} className={`flex max-w-2xl gap-3 ${message.mine ? "ml-auto flex-row-reverse" : ""}`}><div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${message.color}`}>{message.initials}</div><div className={message.mine ? "text-right" : ""}><div className="flex items-baseline gap-2 text-sm"><span className="font-bold text-hive-ink">{message.author}</span><span className="text-xs text-hive-muted">{message.time}</span></div><p className={`mt-1.5 rounded-hive-lg px-4 py-3 text-left leading-6 ${message.mine ? "rounded-tr-sm bg-hive-terracotta text-white" : "rounded-tl-sm border border-hive-border bg-hive-surface text-hive-ink"}`}>{message.text}</p></div></article>)}{activeChannel === "general" && isTyping && <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-hive-honey text-xs font-bold">SM</div><div className="rounded-hive-lg rounded-tl-sm border border-hive-border bg-hive-surface px-4 py-3"><span className="flex gap-1"><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-hive-muted" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-hive-muted [animation-delay:150ms]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-hive-muted [animation-delay:300ms]" /></span></div><p className="text-sm text-hive-muted">Sarah is typing…</p></div>}</div>
        <form onSubmit={sendMessage} className="border-t border-hive-border bg-hive-surface p-4 sm:p-5"><div className="flex items-end gap-2 rounded-hive-lg border border-hive-border bg-hive-canvas p-2 focus-within:border-hive-terracotta focus-within:ring-4 focus-within:ring-[var(--hh-focus-ring)]"><button type="button" aria-label="Attach file" className="rounded-hive-sm p-2 text-hive-muted hover:bg-hive-rose-soft"><Paperclip size={19} /></button><textarea value={draft} onChange={(event) => updateDraft(event.target.value)} rows="1" placeholder={`Message ${active.label.toLowerCase()}…`} className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-1 py-2 text-sm outline-none placeholder:text-hive-muted" /><button type="button" aria-label="Add emoji" className="hidden rounded-hive-sm p-2 text-hive-muted hover:bg-hive-rose-soft sm:block"><Smile size={19} /></button><Button type="submit" aria-label="Send message" className="h-10 min-h-10 w-10 rounded-hive-sm px-0" disabled={!draft.trim()}><Send size={17} /></Button></div><p className="mt-2 text-xs text-hive-muted">HomeHive chat is private to Maple House. Real-time delivery will connect through the chat socket adapter.</p></form>
      </section>
      <aside className="hidden w-64 shrink-0 border-l border-hive-border bg-hive-canvas p-5 xl:block"><div className="flex items-center justify-between"><p className="font-bold">People online</p><span className="flex items-center gap-1 text-xs font-semibold text-hive-sage"><span className="h-2 w-2 rounded-full bg-hive-sage" />3</span></div><div className="mt-5 space-y-4">{memberStatus.map((member) => <div key={member.name} className="flex items-center gap-3"><div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${member.color}`}>{member.initials}</div><div><p className="text-sm font-semibold">{member.name}</p><p className="text-xs text-hive-muted"><span className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${member.status === "Away" ? "bg-hive-honey" : "bg-hive-sage"}`} />{member.status}</p></div></div>)}</div><Card className="mt-8 p-4"><p className="flex items-center gap-2 text-sm font-bold"><Users size={16} className="text-hive-terracotta" /> Household chat</p><p className="mt-2 text-sm leading-6 text-hive-muted">Use Announcements for updates everyone should see and General for the rest.</p></Card></aside>
    </div></main>
  );
}

export default ChatPage;
