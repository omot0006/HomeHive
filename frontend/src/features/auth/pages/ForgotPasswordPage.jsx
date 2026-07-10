import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "../../../components/ui";
import AuthLayout from "../components/AuthLayout";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    if (!email.includes("@")) { setError("Enter the email address linked to your account."); return; }
    setError("");
    setIsLoading(true);
    window.setTimeout(() => { setIsLoading(false); setIsSent(true); }, 650);
  };

  if (isSent) return <AuthLayout title="Check your inbox" description="If an account exists for this email, a reset link is on its way."><div className="rounded-hive-lg bg-hive-sage-soft p-6 text-center"><CheckCircle className="mx-auto text-hive-sage" size={32} /><p className="mt-4 text-sm leading-6 text-hive-muted">We&apos;ve sent instructions to <strong className="text-hive-ink">{email}</strong>.</p></div><Link to="/login" className="mt-6 block"><Button fullWidth size="lg">Back to login</Button></Link></AuthLayout>;

  return <AuthLayout title="Reset your password" description="No worries. Tell us where to send your reset instructions." footer={<Link className="font-bold text-hive-terracotta hover:text-hive-terracotta-strong" to="/login">Back to login</Link>}>
    <form noValidate onSubmit={submit} className="space-y-6"><Input label="Email address" type="email" autoComplete="email" placeholder="you@example.com" value={email} error={error} onChange={(event) => setEmail(event.target.value)} /><Button type="submit" fullWidth size="lg" loading={isLoading}>Send reset link</Button></form>
  </AuthLayout>;
}

export default ForgotPasswordPage;
