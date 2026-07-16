import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { Button, Card, Input } from "../../../components/ui";
import useAuth from "../../auth/hooks/useAuth";
import { getApiError } from "../../auth/services/authApi";
import { createHive as createHiveRequest } from "../services/hiveApi";

function CreateHive() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [hive, setHive] = useState({ name: "", description: "", type: "Roommates" });
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field, value) => {
    setHive((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setNotice("");
  };

  const createHive = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!hive.name.trim()) nextErrors.name = "Give your Hive a name.";
    if (hive.name.trim().length > 80) nextErrors.name = "Hive name cannot exceed 80 characters.";
    if (hive.description.trim().length > 500) nextErrors.description = "Description cannot exceed 500 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setIsLoading(true);
    try {
      await createHiveRequest({
        name: hive.name.trim(),
        description: hive.description.trim(),
        householdType: hive.type,
      });
      setNotice("Your Hive is ready.");
      await refreshUser();
      navigate("/dashboard", { replace: true });
    } catch (error) {
      const apiError = getApiError(error, "Unable to create your Hive.");
      setErrors(apiError.fields);
      setNotice(apiError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-hive-ink-soft px-5 py-10 sm:px-6">
      <Card className="w-full max-w-xl p-6 sm:p-10">
        <div className="flex justify-center"><div className="rounded-hive-lg bg-hive-honey p-5 text-hive-ink"><Home size={40} /></div></div>
        <h1 className="mt-8 text-center text-4xl font-bold tracking-tight text-hive-ink">Create your Hive</h1>
        <p className="mt-3 text-center text-hive-muted">Set up your household space.</p>
        <form onSubmit={createHive} className="mt-10">
          {notice && <p role="alert" className="mb-5 rounded-hive-md bg-hive-rose-soft px-4 py-3 text-sm text-hive-terracotta-strong">{notice}</p>}
          <Input label="Hive name" placeholder="Maple House" maxLength={80} value={hive.name} error={errors.name} disabled={isLoading} onChange={(event) => updateField("name", event.target.value)} />
          <div className="mt-5"><label className="block text-sm font-semibold text-hive-ink">Description <span className="font-normal text-hive-muted">— optional</span><textarea maxLength={500} rows={3} placeholder="A little about your household" value={hive.description} disabled={isLoading} onChange={(event) => updateField("description", event.target.value)} className="mt-2 min-h-24 w-full resize-y rounded-hive-md border border-hive-border bg-hive-surface px-4 py-3 font-normal outline-none focus:border-hive-terracotta focus:ring-4 focus:ring-[var(--hh-focus-ring)]" /></label>{errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}</div>
          <p className="mt-8 text-sm font-semibold text-hive-ink">Household type</p>
          <div className="mt-4 grid grid-cols-3 gap-3">{["Roommates", "Family", "Landlord"].map((type) => <Button key={type} type="button" variant={hive.type === type ? "secondary" : "outline"} className="h-auto min-h-14 px-2" disabled={isLoading} onClick={() => updateField("type", type)}>{type}</Button>)}</div>
          <Button type="submit" className="mt-10" size="lg" fullWidth loading={isLoading}>Create Hive →</Button>
        </form>
        <p className="mt-5 text-center text-sm text-hive-muted">Already have an invite? <Link to="/join-hive" className="font-bold text-hive-terracotta hover:text-hive-terracotta-strong">Join an existing Hive</Link></p>
      </Card>
    </main>
  );
}

export default CreateHive;
