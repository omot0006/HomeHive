import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../../../components/ui";
import AuthLayout from "../components/AuthLayout";
import PasswordField from "../components/PasswordField";
import SocialLoginButtons from "../components/SocialLoginButtons";
import useAuth from "../hooks/useAuth";
import { getApiError } from "../services/authApi";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ firstName: "", lastName: "", nickname: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setNotice("");
  };

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.firstName.trim()) nextErrors.firstName = "Enter your first name.";
    if (!form.lastName.trim()) nextErrors.lastName = "Enter your last name.";
    if (form.nickname && !/^[\p{L}\s'’-]+$/u.test(form.nickname)) nextErrors.nickname = "Use letters, spaces, hyphens, or apostrophes only.";
    if (!form.email.includes("@")) nextErrors.email = "Enter a valid email address.";
    if (form.password.length < 8) nextErrors.password = "Use at least 8 characters.";
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = "Passwords do not match.";
    setErrors(nextErrors);
    setNotice("");
    if (Object.keys(nextErrors).length) return;

    setIsLoading(true);
    try {
      await register({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        nickname: form.nickname.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      navigate("/create-hive", { replace: true });
    } catch (error) {
      const apiError = getApiError(error, "Unable to create your account. Please try again.");
      setErrors(apiError.fields);
      setNotice(apiError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return <AuthLayout title="Join your household space" description="Start with your details. Your Hive comes next." footer={<>Already have an account? <Link className="font-bold text-hive-terracotta hover:text-hive-terracotta-strong" to="/login">Log in</Link></>}>
    <form noValidate onSubmit={submit} className="space-y-5">
      {notice && <p role="alert" className="rounded-hive-md bg-hive-rose-soft px-4 py-3 text-sm text-hive-terracotta-strong">{notice}</p>}
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="First name" autoComplete="given-name" placeholder="Aisha" value={form.firstName} error={errors.firstName} disabled={isLoading} onChange={(event) => updateField("firstName", event.target.value)} />
        <Input label="Last name" autoComplete="family-name" placeholder="Martin" value={form.lastName} error={errors.lastName} disabled={isLoading} onChange={(event) => updateField("lastName", event.target.value)} />
      </div>
      <Input label="Nickname" hint="Also known as — optional" autoComplete="nickname" placeholder="What should your Hive call you?" maxLength={40} value={form.nickname} error={errors.nickname} disabled={isLoading} onChange={(event) => updateField("nickname", event.target.value)} />
      <Input label="Email address" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} error={errors.email} disabled={isLoading} onChange={(event) => updateField("email", event.target.value)} />
      <PasswordField autoComplete="new-password" hint="At least 8 characters." placeholder="Create a password" value={form.password} error={errors.password} disabled={isLoading} onChange={(event) => updateField("password", event.target.value)} />
      <PasswordField label="Confirm password" autoComplete="new-password" placeholder="Enter your password again" value={form.confirmPassword} error={errors.confirmPassword} disabled={isLoading} onChange={(event) => updateField("confirmPassword", event.target.value)} />
      <Button type="submit" fullWidth size="lg" loading={isLoading}>Create your account</Button>
    </form>
    <SocialLoginButtons onUnavailable={setNotice} />
  </AuthLayout>;
}

export default RegisterPage;
