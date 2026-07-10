import { ArrowLeft, CheckCircle, Home, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../../../components/ui";
import logo from "../../../assets/images/brand/homehive-logo.png";

function AuthLayout({ title, description, children, footer }) {
  return (
    <main className="min-h-screen bg-hive-canvas p-4 sm:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[2rem] border border-hive-border bg-hive-surface shadow-hive-float lg:grid-cols-[1.05fr_0.95fr]">
        <section className="flex flex-col p-6 sm:p-10 lg:p-14">
          <Link to="/" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-hive-muted transition hover:text-hive-terracotta">
            <ArrowLeft size={16} /> Back to HomeHive
          </Link>

          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
            <Link to="/" className="mb-10 flex items-center gap-2.5">
              <img src={logo} alt="" className="h-8 w-8 object-contain" />
              <span className="text-lg font-bold tracking-tight text-hive-ink">HomeHive</span>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-hive-ink sm:text-4xl">{title}</h1>
            <p className="mt-3 leading-7 text-hive-muted">{description}</p>
            <div className="mt-8">{children}</div>
            {footer && <div className="mt-8 text-center text-sm text-hive-muted">{footer}</div>}
          </div>
        </section>

        <aside className="relative hidden overflow-hidden bg-hive-ink-soft p-10 text-white lg:block">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-hive-terracotta/30 blur-3xl" />
          <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-hive-honey/20 blur-3xl" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/80"><Home size={16} className="text-hive-honey" /> Your household space</div>
            <div>
              <p className="max-w-md text-4xl font-bold leading-tight tracking-tight">A home runs better when everyone is in sync.</p>
              <p className="mt-5 max-w-md text-lg leading-8 text-white/65">Join your people in one calm place for the everyday work of living together.</p>
              <Card className="mt-10 border-white/10 bg-white/10 p-5 text-white shadow-none">
                <div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-hive-honey font-bold text-hive-ink">MH</div><div><p className="font-bold">Maple House</p><p className="text-sm text-white/55">4 members in sync</p></div></div><Users size={20} className="text-hive-honey" /></div>
                <div className="mt-5 border-t border-white/10 pt-4 text-sm text-white/75"><p className="flex items-center gap-2"><CheckCircle size={16} className="text-hive-honey" /> Kitchen reset completed</p><p className="mt-3 flex items-center gap-2"><CheckCircle size={16} className="text-hive-honey" /> Rent reminder sent</p></div>
              </Card>
            </div>
            <p className="text-sm font-semibold text-hive-honey">One Home. One Team. Everything in Sync.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default AuthLayout;
