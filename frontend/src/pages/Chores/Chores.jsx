import { Plus, CheckCircle, Clock } from "lucide-react";

function Chores() {
  const chores = [
    {
      title: "Kitchen Cleaning",
      person: "Aisha",
      due: "Today",
      done: false,
    },

    {
      title: "Take Trash Out",
      person: "Marcus",
      due: "Completed",
      done: true,
    },

    {
      title: "Vacuum Living Room",
      person: "Julian",
      due: "Tomorrow",
      done: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fff7ef] p-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-bold">House Chores 🧹</h1>

          <p className="text-gray-500 mt-3">
            Keep your Hive clean and organized.
          </p>
        </div>

        <button className="bg-[#ff9f1c] px-6 py-4 rounded-xl font-bold flex gap-2">
          <Plus />
          Add Chore
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-14">
        {chores.map((item) => (
          <div key={item.title} className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">{item.title}</h2>

              {item.done ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <Clock className="text-[#ff9f1c]" />
              )}
            </div>

            <p className="mt-6 text-gray-500">Assigned to</p>

            <h3 className="text-xl font-bold">{item.person}</h3>

            <p className="mt-6">{item.done ? "Completed 🎉" : "Pending"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chores;
