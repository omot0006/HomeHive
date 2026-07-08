import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  Home,
  CheckCircle,
  ShoppingBasket,
  Wallet,
  MessageCircle,
  Users,
  Settings,
  Search,
  Bell,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [search, setSearch] = useState("");
  const [showChoreModal, setShowChoreModal] = useState(false);

  const [newChore, setNewChore] = useState({
    title: "",
    assigned: "Aisha",
  });
  const [chores, setChores] = useState([
    {
      title: "Trash removed",
      assigned: "Marcus",
      done: true,
    },

    {
      title: "Kitchen cleaning",
      assigned: "Aisha",
      done: false,
    },

    {
      title: "Laundry pending",
      assigned: "Julian",
      done: false,
    },
  ]);
  const completedChores = chores.filter((chore) => chore.done).length;

  const hiveScore = Math.round((completedChores / chores.length) * 100);
  const searchItems = [
    {
      icon: "🧹",
      title: "Kitchen Cleaning",
      description: "Chore assigned to Aisha",
    },

    {
      icon: "🗑️",
      title: "Take Trash Out",
      description: "Chore assigned to Marcus",
    },

    {
      icon: "💰",
      title: "Rent Payment",
      description: "$420 of $600 collected",
    },

    {
      icon: "🛒",
      title: "Groceries",
      description: "Current total $82",
    },

    {
      icon: "👩🏻‍🎨",
      title: "Aisha",
      description: "House member",
    },

    {
      icon: "👨🏾‍💻",
      title: "Marcus",
      description: "House member",
    },
  ];

  const results = searchItems.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );
  const menu = [
    {
      icon: <Home />,
      name: "Dashboard",
      path: "/dashboard",
    },

    {
      icon: <CheckCircle />,
      name: "Chores",
      path: "/chores",
    },

    {
      icon: <ShoppingBasket />,
      name: "Groceries",
      path: "/groceries",
    },

    {
      icon: <Wallet />,
      name: "Expenses",
      path: "/expenses",
    },

    {
      icon: <Users />,
      name: "Members",
      path: "/members",
    },

    {
      icon: <Settings />,
      name: "Settings",
      path: "/settings",
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#fff7ef]">
      {/* SIDEBAR */}

      {/* SIDEBAR */}

      <aside className="hidden md:flex w-72 min-h-screen flex-col justify-between bg-[#07143d] text-white p-6">
        <div>
          {/* LOGO */}

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff9f1c] text-[#07143d]">
              🐝
            </div>

            <h1 className="text-2xl font-bold tracking-tight">HomeHive</h1>
          </div>

          {/* MENU */}

          <nav className="mt-12 flex flex-col gap-2">
            {menu.map((item, index) => (
              <div
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`
        flex items-center gap-4 rounded-xl px-4 py-3 cursor-pointer transition-all

        ${
          index === 0
            ? "bg-[#ff9f1c] text-[#07143d] font-bold shadow-lg"
            : "text-white/70 hover:bg-white/10 hover:text-white"
        }

        `}
              >
                {item.icon}

                <span>{item.name}</span>
              </div>
            ))}
          </nav>
        </div>

        {/* PROFILE CARD */}

        <div className="rounded-2xl bg-white/10 backdrop-blur p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ff9f1c] text-[#07143d] font-bold">
              AM
            </div>

            <div>
              <p className="font-bold">Aisha M.</p>

              <p className="text-sm text-white/50">Maple House</p>
            </div>

            <button className="ml-auto text-white/50 hover:text-white">
              ↗
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}

      <main className="flex-1 p-8">
        {/* HEADER */}

        <div className="flex justify-between items-center gap-8">
          {/* LEFT SIDE */}

          <div>
            <p className="text-[#ff9f1c] font-bold">MAPLE HOUSE</p>

            <h2 className="text-5xl font-bold mt-2">Welcome back, Aisha 👋</h2>

            <p className="text-gray-500 mt-3">
              Your Hive is organized and running smoothly today.
            </p>
          </div>

          {/* RIGHT ACTIONS */}

          <div className="hidden lg:flex items-center gap-4">
            {/* SEARCH */}

            <div className="relative">
              <div className="bg-white rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3 w-72">
                <Search size={20} className="text-gray-400" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search HomeHive..."
                  className="outline-none bg-transparent flex-1"
                />
              </div>

              {/* SEARCH RESULTS */}

              {search && (
                <div className="absolute top-16 w-80 bg-white rounded-3xl shadow-2xl p-5 z-50">
                  <p className="font-bold mb-4">Results</p>

                  <div className="space-y-4">
                    {results.length > 0 ? (
                      results.map((item) => (
                        <div
                          key={item.title}
                          className="flex gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-xl"
                        >
                          <span className="text-2xl">{item.icon}</span>

                          <div>
                            <p className="font-bold">{item.title}</p>

                            <p className="text-sm text-gray-500">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No results found</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* NOTIFICATION */}

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative bg-white h-14 w-14 rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 transition"
              >
                <Bell />

                <span className="absolute top-3 right-3 h-3 w-3 rounded-full bg-[#ff9f1c]"></span>
              </button>

              {/* NOTIFICATION DROPDOWN */}

              {showNotifications && (
                <div className="absolute right-0 mt-4 w-80 bg-white rounded-3xl shadow-2xl p-6 z-50">
                  <h3 className="font-bold text-xl">Notifications</h3>

                  <div className="space-y-5 mt-6">
                    {[
                      {
                        icon: "🧹",
                        title: "New chore assigned",
                        text: "Kitchen cleaning is due today",
                      },

                      {
                        icon: "💰",
                        title: "Rent reminder",
                        text: "Rent collection closes in 2 days",
                      },

                      {
                        icon: "🎂",
                        title: "Birthday coming",
                        text: "Maya's birthday is this week",
                      },
                    ].map((note) => (
                      <div key={note.title} className="flex gap-4">
                        <div className="text-2xl">{note.icon}</div>

                        <div>
                          <p className="font-bold">{note.title}</p>

                          <p className="text-sm text-gray-500">{note.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ADD */}

            <button
              onClick={() => setShowChoreModal(true)}
              className="bg-[#ff9f1c] px-6 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
            >
              + Add Chore
            </button>
          </div>
        </div>

        {/* HIVE HEALTH */}

        <div className="mt-10 bg-[#07143d] text-white rounded-[2rem] p-8 shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[#ff9f1c] font-bold">HIVE HEALTH</p>

              <h3 className="text-4xl font-bold mt-3">
                {hiveScore}% Harmony Score
              </h3>
            </div>

            <div className="text-5xl">🐝</div>
          </div>

          <div className="h-4 bg-white/20 rounded-full mt-8">
            <div
              style={{
                width: `${hiveScore}%`,
              }}
              className="h-full bg-[#ff9f1c] rounded-full transition-all duration-500"
            ></div>
          </div>
        </div>

        {/* CONTENT AREA */}

        <div className="grid xl:grid-cols-[1fr_350px] gap-8">
          {/* DASHBOARD CARDS */}

          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {[
              {
                title: "Today's Chores",
                icon: "🧹",
                content: chores.map(
                  (chore) =>
                    `${chore.done ? "✅" : "⬜"} ${chore.title} (${chore.assigned})`,
                ),
              },

              {
                title: "Expenses",
                icon: "💰",
                content: [
                  "$420 / $600 collected",
                  "Next rent: July 30",
                  "Groceries: $82",
                ],
              },

              {
                title: "House Chat",
                icon: "💬",
                content: [
                  "Aisha: Bought groceries",
                  "Marcus: Rent sent",
                  "Maya: Movie night?",
                ],
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-[2rem] p-8 shadow-lg hover:-translate-y-2 transition"
              >
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold">{card.title}</h3>

                  <span className="text-3xl">{card.icon}</span>
                </div>

                <div className="space-y-4 mt-8">
                  {card.title === "Today's Chores"
                    ? chores.map((chore, index) => (
                        <p
                          key={index}
                          onClick={() => {
                            const updated = [...chores];

                            updated[index].done = !updated[index].done;

                            setChores(updated);
                          }}
                          className="text-gray-600 cursor-pointer hover:text-[#ff9f1c] transition"
                        >
                          {chore.done ? "✅" : "⬜"} {chore.title}
                          <span className="text-gray-400">
                            {" "}
                            ({chore.assigned})
                          </span>
                        </p>
                      ))
                    : card.content.map((text) => (
                        <p key={text} className="text-gray-600">
                          {text}
                        </p>
                      ))}
                </div>
              </div>
            ))}
          </div>

          {/* HOUSE PANEL */}

          <aside className="bg-white rounded-[2rem] p-8 shadow-lg mt-10 xl:mt-0">
            <h2 className="text-2xl font-bold">🏠 Maple House</h2>

            <p className="text-gray-500 mt-2">3 active members</p>

            {/* MEMBERS */}

            <div className="mt-10">
              <h3 className="font-bold">Members Online</h3>

              <div className="space-y-5 mt-5">
                {[
                  ["🧑🏾‍💻", "Marcus", "Online"],

                  ["👩🏻‍🎨", "Aisha", "Online"],

                  ["👨🏽‍🍳", "Julian", "Away"],
                ].map((member) => (
                  <div key={member[1]} className="flex items-center gap-4">
                    <span className="text-3xl">{member[0]}</span>

                    <div>
                      <p className="font-bold">{member[1]}</p>

                      <p className="text-sm text-gray-500">{member[2]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BIRTHDAY */}

            <div className="mt-10 bg-[#fff7ef] rounded-2xl p-5">
              <h3 className="font-bold">🎂 Upcoming Birthday</h3>

              <p className="mt-3 text-gray-600">Maya's birthday in 3 days</p>
            </div>

            {/* ACHIEVEMENT */}

            <div className="mt-5 bg-[#07143d] text-white rounded-2xl p-5">
              <h3 className="font-bold text-[#ff9f1c]">🏆 Achievement</h3>

              <p className="mt-3">12 day clean streak!</p>
            </div>
          </aside>
        </div>
      </main>
      {/* ADD CHORE MODAL */}

      {showChoreModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-[2rem] p-8 w-[450px] shadow-2xl">
            <h2 className="text-3xl font-bold">Create Chore 🧹</h2>

            <p className="text-gray-500 mt-2">Assign a new household task.</p>

            <label className="block mt-8 font-bold">Chore name</label>

            <input
              value={newChore.title}
              onChange={(e) =>
                setNewChore({
                  ...newChore,

                  title: e.target.value,
                })
              }
              placeholder="Clean kitchen"
              className="mt-3 w-full border rounded-xl p-4"
            />

            <label className="block mt-6 font-bold">Assign to</label>

            <select
              value={newChore.assigned}
              onChange={(e) =>
                setNewChore({
                  ...newChore,

                  assigned: e.target.value,
                })
              }
              className="mt-3 w-full border rounded-xl p-4"
            >
              <option>Aisha</option>

              <option>Marcus</option>

              <option>Julian</option>
            </select>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setShowChoreModal(false)}
                className="flex-1 bg-gray-100 py-4 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setChores([
                    ...chores,

                    {
                      title: newChore.title,
                      assigned: newChore.assigned,
                      done: false,
                    },
                  ]);

                  setNewChore({
                    title: "",
                    assigned: "Aisha",
                  });

                  setShowChoreModal(false);
                }}
                className="flex-1 bg-[#ff9f1c] py-4 rounded-xl font-bold"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
