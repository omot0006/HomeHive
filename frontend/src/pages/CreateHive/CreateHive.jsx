import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Users, Sparkles } from "lucide-react";

function CreateHive() {
  const navigate = useNavigate();

  const [hive, setHive] = useState({
    name: "",
    type: "Roommates",
  });

  const createHive = () => {
    console.log(hive);

    // later we send this to backend

    navigate("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#07143d] flex items-center justify-center px-6">
      <div className="bg-white rounded-[2rem] max-w-xl w-full p-10 shadow-2xl">
        <div className="flex justify-center">
          <div className="bg-[#ff9f1c] p-5 rounded-3xl">
            <Home size={40} />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center mt-8">
          Create your Hive
        </h1>

        <p className="text-gray-500 text-center mt-3">
          Set up your household space.
        </p>

        <label className="block mt-10 font-bold">Hive name</label>

        <input
          placeholder="Maple House"
          value={hive.name}
          onChange={(e) =>
            setHive({
              ...hive,
              name: e.target.value,
            })
          }
          className="mt-3 w-full border rounded-xl p-4"
        />

        <label className="block mt-8 font-bold">Household type</label>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {["Roommates", "Family", "Landlord"].map((type) => (
            <button
              key={type}
              onClick={() =>
                setHive({
                  ...hive,
                  type,
                })
              }
              className={`
p-4 rounded-xl border

${hive.type === type ? "bg-[#ff9f1c]" : "bg-white"}

`}
            >
              {type}
            </button>
          ))}
        </div>

        <button
          onClick={createHive}
          className="mt-10 bg-[#ff9f1c] w-full py-4 rounded-xl font-bold"
        >
          Create Hive →
        </button>
      </div>
    </main>
  );
}

export default CreateHive;
