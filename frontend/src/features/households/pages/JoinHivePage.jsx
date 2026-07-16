import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import { Button, Card, Input } from "../../../components/ui";
import useAuth from "../../auth/hooks/useAuth";
import { getApiError } from "../../auth/services/authApi";
import { joinHive } from "../services/hiveApi";

function JoinHivePage() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    const normalizedCode = inviteCode.trim().toUpperCase();
    if (!/^[A-Z0-9]{6}$/.test(normalizedCode)) {
      setError("Enter the 6-character invite code shared by your Hive.");
      return;
    }

    setError("");
    setNotice("");
    setIsLoading(true);
    try {
      await joinHive(normalizedCode);
      setNotice("You joined the Hive successfully.");
      await refreshUser();
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      const apiError = getApiError(requestError, "Unable to join this Hive.");
      setError(apiError.fields?.inviteCode);
      setNotice(apiError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return <main className="flex min-h-screen items-center justify-center bg-hive-ink-soft px-5 py-10 sm:px-6"><Card className="w-full max-w-xl p-6 sm:p-10"><div className="flex justify-center"><div className="rounded-hive-lg bg-hive-honey p-5 text-hive-ink"><Users size={40} /></div></div><h1 className="mt-8 text-center text-4xl font-bold tracking-tight text-hive-ink">Join a Hive</h1><p className="mt-3 text-center text-hive-muted">Enter the invite code shared by your household.</p><form onSubmit={submit} className="mt-10 space-y-6">{notice && <p role="alert" className="rounded-hive-md bg-hive-rose-soft px-4 py-3 text-sm text-hive-terracotta-strong">{notice}</p>}<Input label="Invite code" placeholder="ABC123" autoComplete="off" maxLength={6} value={inviteCode} error={error} disabled={isLoading} hint="Invite codes contain 6 uppercase letters or numbers." onChange={(event) => { setInviteCode(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")); setError(""); setNotice(""); }} /><Button type="submit" size="lg" fullWidth loading={isLoading}>Join Hive →</Button></form><p className="mt-5 text-center text-sm text-hive-muted">Starting a new household? <Link to="/create-hive" className="font-bold text-hive-terracotta hover:text-hive-terracotta-strong">Create a Hive</Link></p></Card></main>;
}

export default JoinHivePage;
