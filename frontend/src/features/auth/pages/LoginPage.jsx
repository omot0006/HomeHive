import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../../../components/ui";
import AuthLayout from "../components/AuthLayout";
import PasswordField from "../components/PasswordField";
import SocialLoginButtons from "../components/SocialLoginButtons";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.email.includes("@")) nextErrors.email = "Enter a valid email address.";
    if (!form.password) nextErrors.password = "Enter your password.";
    setErrors(nextErrors);
    setNotice("");
    if (Object.keys(nextErrors).length) return;
    setIsLoading(true);
    window.setTimeout(() => navigate("/dashboard"), 650);
  };

  return <AuthLayout title="Welcome back to your Hive" description="Pick up where your household left off." footer={<>New to HomeHive? <Link className="font-bold text-hive-terracotta hover:text-hive-terracotta-strong" to="/register">Create an account</Link></>}>
    <form noValidate onSubmit={submit} className="space-y-5">
      {notice && <p role="alert" className="rounded-hive-md bg-hive-rose-soft px-4 py-3 text-sm text-hive-terracotta-strong">{notice}</p>}
      <Input label="Email address" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} error={errors.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
      <PasswordField autoComplete="current-password" placeholder="Enter your password" value={form.password} error={errors.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
      <div className="flex justify-end"><Link to="/forgot-password" className="text-sm font-bold text-hive-terracotta hover:text-hive-terracotta-strong">Forgot password?</Link></div>
      <Button type="submit" fullWidth size="lg" loading={isLoading}>Log in</Button>
    </form>
    <SocialLoginButtons onUnavailable={setNotice} />
  </AuthLayout>;
}

export default LoginPage;
