import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { Button, Card, Input } from "../../../components/ui";

function CreateHive() {
  const navigate = useNavigate();
  const [hive, setHive] = useState({ name: "", type: "Roommates" });

  const createHive = () => {
    console.log(hive);
    navigate("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-hive-ink-soft px-5 py-10 sm:px-6">
      <Card className="w-full max-w-xl p-6 sm:p-10">
        <div className="flex justify-center">
          <div className="rounded-hive-lg bg-hive-honey p-5 text-hive-ink">
            <Home size={40} />
          </div>
        </div>

        <h1 className="mt-8 text-center text-4xl font-bold tracking-tight text-hive-ink">Create your Hive</h1>
        <p className="mt-3 text-center text-hive-muted">Set up your household space.</p>

        <div className="mt-10">
          <Input
            label="Hive name"
            placeholder="Maple House"
            value={hive.name}
            onChange={(event) => setHive({ ...hive, name: event.target.value })}
          />
        </div>

        <p className="mt-8 text-sm font-semibold text-hive-ink">Household type</p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {["Roommates", "Family", "Landlord"].map((type) => (
            <Button
              key={type}
              variant={hive.type === type ? "secondary" : "outline"}
              className="h-auto min-h-14 px-2"
              onClick={() => setHive({ ...hive, type })}
            >
              {type}
            </Button>
          ))}
        </div>

        <Button onClick={createHive} className="mt-10" size="lg" fullWidth>
          Create Hive →
        </Button>
      </Card>
    </main>
  );
}

export default CreateHive;
