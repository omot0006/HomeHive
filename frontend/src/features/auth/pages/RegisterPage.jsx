import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../../../components/ui";
import AuthLayout from "../components/AuthLayout";
import PasswordField from "../components/PasswordField";
import SocialLoginButtons from "../components/SocialLoginButtons";

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = "Enter the name your household knows you by.";
    if (!form.email.includes("@")) nextErrors.email = "Enter a valid email address.";
    if (form.password.length < 8) nextErrors.password = "Use at least 8 characters.";
    setErrors(nextErrors);
    setNotice("");
    if (Object.keys(nextErrors).length) return;
    setIsLoading(true);
    window.setTimeout(() => { setIsLoading(false); setIsComplete(true); }, 700);
  };

  if (isComplete) return <AuthLayout title="Your place in the Hive is ready" description="Next, create a household or join one from an invitation."><div className="rounded-hive-lg bg-hive-sage-soft p-6 text-center"><CheckCircle className="mx-auto text-hive-sage" size={32} /><p className="mt-4 font-bold text-hive-ink">Welcome, {form.name}.</p><p className="mt-2 text-sm leading-6 text-hive-muted">Your account is ready for your household&apos;s next step.</p></div><Button className="mt-6" fullWidth size="lg" onClick={() => navigate("/onboarding")}>Set up your Hive</Button><p className="mt-4 text-center text-sm text-hive-muted">You&apos;ll be able to create a Hive or join one with an invite code.</p></AuthLayout>;

  return <AuthLayout title="Join your household space" description="Start with your details. Your Hive comes next." footer={<>Already have an account? <Link className="font-bold text-hive-terracotta hover:text-hive-terracotta-strong" to="/login">Log in</Link></>}>
    <form noValidate onSubmit={submit} className="space-y-5">
      {notice && <p role="alert" className="rounded-hive-md bg-hive-rose-soft px-4 py-3 text-sm text-hive-terracotta-strong">{notice}</p>}
      <Input label="Your name" autoComplete="name" placeholder="Aisha Martin" value={form.name} error={errors.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
      <Input label="Email address" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} error={errors.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
      <PasswordField autoComplete="new-password" hint="At least 8 characters." placeholder="Create a password" value={form.password} error={errors.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
      <Button type="submit" fullWidth size="lg" loading={isLoading}>Create your account</Button>
    </form>
    <SocialLoginButtons onUnavailable={setNotice} />
  </AuthLayout>;
}

export default RegisterPage;
