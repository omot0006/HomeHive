import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  CheckCircle,
  MessageCircle,
  Wallet,
  ShoppingBasket,
  Bell,
  Users,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

import logo from "../../assets/logos/homehive-logo.png";

function Landing() {
  const [openMenu, setOpenMenu] = useState(false);

  const features = [
    {
      icon: <CheckCircle />,
      title: "Smart chores",
      text: "Fairly rotate household tasks based on availability, difficulty, and contribution.",
    },
    {
      icon: <Wallet />,
      title: "Shared finances",
      text: "Track rent, utilities, and grocery expenses with transparent splitting.",
    },
    {
      icon: <MessageCircle />,
      title: "House chat",
      text: "Keep announcements, decisions, and updates in one organized space.",
    },
    {
      icon: <ShoppingBasket />,
      title: "Grocery lists",
      text: "Collaborative shopping lists with automatic cost tracking.",
    },
    {
      icon: <Users />,
      title: "Household profiles",
      text: "Personal profiles, birthdays, achievements, and AI avatars.",
    },
    {
      icon: <Bell />,
      title: "Gentle reminders",
      text: "Friendly nudges that keep everyone accountable without drama.",
    },
  ];

  return (
    <main className="bg-[#fff7ef] text-[#111827] overflow-hidden">
      {/* ================= NAVBAR ================= */}

      <nav className="fixed top-0 w-full z-50 bg-[#07143d]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* LOGO */}

          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="HomeHive"
              className="h-12 w-12 object-contain"
            />

            <h1 className="text-white text-3xl font-bold">HomeHive</h1>
          </div>

          {/* DESKTOP LINKS */}

          <div className="hidden md:flex gap-10 text-white/80">
            <a href="#features">Features</a>

            <a href="#how">How it works</a>

            <a href="#landlords">Landlords</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="text-white/80 font-semibold hover:text-white transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/create-hive")}
              className="bg-[#ff9f1c] px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
            >
              Get Started →
            </button>
          </div>

          {/* MOBILE BUTTON */}

          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="md:hidden text-white"
          >
            {openMenu ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}

        {openMenu && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            className="md:hidden bg-[#07143d] px-6 pb-6"
          >
            <div className="flex flex-col gap-5 text-white/80">
              <a href="#features">Features</a>

              <a href="#how">How it works</a>

              <a href="#landlords">Landlords</a>

              <button
                onClick={() => navigate("/login")}
                className="text-left text-white font-semibold"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/create-hive")}
                className="bg-[#ff9f1c] text-black px-6 py-3 rounded-xl font-bold"
              >
                Get Started →
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ================= HERO ================= */}

      <section className="min-h-screen bg-gradient-to-br from-[#07143d] to-[#10286d] pt-36 px-6 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="inline-flex gap-2 items-center bg-white/10 rounded-full px-5 py-2 mb-8">
            <Sparkles size={18} />
            Your home operating system
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Your home, <span className="text-[#ff9f1c]">in sync.</span>
            <br />
            One platform.
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-xl text-white/75">
            Coordinate chores, manage shared expenses, and keep the peace. The
            operating system for modern households.
          </p>

          <div className="mt-10 flex flex-col md:flex-row justify-center gap-5">
            <button
              onClick={() => navigate("/create-hive")}
              className="bg-[#ff9f1c] text-black px-8 py-4 rounded-2xl font-bold"
            >
              Start your household — free
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("features")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white/10 border border-white/20 px-8 py-4 rounded-2xl"
            >
              Watch demo
            </button>
          </div>

          {/* DASHBOARD MOCKUP */}

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="float mt-20 max-w-4xl mx-auto bg-white/10 border border-white/20 backdrop-blur-xl rounded-[2rem] p-6 shadow-2xl text-left"
          >
            {/* TOP BAR */}

            <div className="flex justify-between items-center">
              <div>
                <p className="text-[#ff9f1c] font-bold">HOMEHIVE DASHBOARD</p>

                <h3 className="text-3xl font-bold mt-2">Maple House 🏡</h3>
              </div>

              <div className="bg-[#ff9f1c] text-black px-5 py-3 rounded-2xl font-bold">
                94% Hive Score
              </div>
            </div>

            {/* GRID */}

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {/* ROOMMATES */}

              <div className="bg-white/10 rounded-3xl p-6">
                <h4 className="font-bold">Roommates</h4>

                <div className="mt-5 space-y-4">
                  {[
                    ["👨🏾‍💻", "Marcus"],

                    ["👩🏻‍🎨", "Aisha"],

                    ["🧑🏽‍🍳", "Julian"],
                  ].map((user) => (
                    <div
                      key={user[1]}
                      className="flex justify-between items-center"
                    >
                      <div className="flex gap-3 items-center">
                        <span className="text-3xl">{user[0]}</span>

                        <span>{user[1]}</span>
                      </div>

                      <span>🟢</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CHORES */}

              <div className="bg-white/10 rounded-3xl p-6">
                <h4 className="font-bold">Today's Chores</h4>

                <div className="space-y-4 mt-5">
                  <div>✅ Take trash out</div>

                  <div>🧽 Clean kitchen</div>

                  <div>🧺 Laundry</div>
                </div>
              </div>

              {/* MONEY */}

              <div className="bg-white/10 rounded-3xl p-6">
                <h4 className="font-bold">Shared Expenses</h4>

                <div className="mt-5">
                  <p>Rent collected</p>

                  <div className="h-3 bg-white/20 rounded-full mt-3">
                    <div className="h-full w-[80%] bg-[#ff9f1c] rounded-full"></div>
                  </div>

                  <p className="mt-5">🛒 Groceries: $82</p>
                </div>
              </div>
            </div>

            {/* BOTTOM ACTIVITY */}

            <div className="mt-6 bg-white/10 rounded-3xl p-6">
              <h4 className="font-bold">Recent Activity</h4>

              <div className="grid md:grid-cols-3 gap-5 mt-5">
                <p>🎉 12 day clean streak</p>

                <p>💬 3 new messages</p>

                <p>🎂 Maya birthday soon</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}

      <section id="features" className="py-28 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#ff9f1c] font-bold">FEATURES</p>

          <h2 className="text-5xl font-bold mt-5">
            Everything you need
            <br />
            to thrive together.
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-3xl shadow-xl text-left"
              >
                <div className="text-[#ff9f1c] mb-5">{feature.icon}</div>

                <h3 className="text-2xl font-bold">{feature.title}</h3>

                <p className="mt-4 text-gray-600">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section id="how" className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#ff9f1c] font-bold">HOW IT WORKS</p>

          <h2 className="text-5xl font-bold mt-5">
            Start your Hive in minutes
          </h2>

          <p className="text-gray-600 mt-5 max-w-xl mx-auto">
            HomeHive makes shared living simple from the moment your household
            joins.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              {
                number: "01",
                title: "Create your household",
                text: "Set up your Hive profile and customize your shared space.",
              },
              {
                number: "02",
                title: "Invite members",
                text: "Bring roommates, family members, or tenants together.",
              },
              {
                number: "03",
                title: "Live in sync",
                text: "Manage chores, payments, reminders, and communication.",
              },
            ].map((step) => (
              <motion.div
                key={step.number}
                whileHover={{ y: -10 }}
                className="bg-[#fff7ef] rounded-3xl p-10 text-left shadow-lg"
              >
                <h3 className="text-6xl font-bold text-[#ff9f1c]">
                  {step.number}
                </h3>

                <h4 className="text-2xl font-bold mt-6">{step.title}</h4>

                <p className="text-gray-600 mt-4">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BUILT FOR SECTION ================= */}

      <section id="landlords" className="py-28 px-6 bg-[#fff7ef]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#ff9f1c] font-bold">BUILT FOR EVERY HOME</p>

          <h2 className="text-5xl font-bold mt-5">
            One platform.
            <br />
            Different ways to live.
          </h2>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Whether you're sharing an apartment, running a family home, or
            managing properties — HomeHive adapts to your lifestyle.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              {
                emoji: "🎓",
                title: "Students & Roommates",
                text: "Replace messy group chats with organized chores, bills, reminders and shared decisions.",
              },

              {
                emoji: "🏡",
                title: "Families",
                text: "Teach responsibility, organize household tasks, and celebrate contributions together.",
              },

              {
                emoji: "🏢",
                title: "Landlords",
                text: "Manage tenants, properties, announcements, and maintenance requests in one place.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-[2rem] p-10 shadow-xl text-left"
              >
                <div className="text-5xl">{item.emoji}</div>

                <h3 className="text-2xl font-bold mt-8">{item.title}</h3>

                <p className="mt-5 text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* MINI LANDLORD DASHBOARD */}

          <div className="mt-20 bg-[#07143d] text-white rounded-[2rem] p-10 text-left shadow-2xl">
            <p className="text-[#ff9f1c] font-bold">PROPERTY DASHBOARD</p>

            <h3 className="text-3xl font-bold mt-3">
              Manage multiple homes easily
            </h3>

            <div className="grid md:grid-cols-3 gap-5 mt-10">
              <div className="bg-white/10 rounded-2xl p-6">
                🏘 Properties
                <h4 className="text-3xl font-bold mt-3">8</h4>
              </div>

              <div className="bg-white/10 rounded-2xl p-6">
                👥 Tenants
                <h4 className="text-3xl font-bold mt-3">32</h4>
              </div>

              <div className="bg-white/10 rounded-2xl p-6">
                🔧 Requests
                <h4 className="text-3xl font-bold mt-3">4 Open</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= AI HIVE IDENTITY ================= */}

      <section className="bg-[#07143d] py-28 px-6 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT TEXT */}

          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2">
              <Sparkles size={18} className="text-[#ff9f1c]" />
              Powered by AI
            </div>

            <h2 className="text-5xl font-bold mt-8 leading-tight">
              Meet your personal
              <span className="text-[#ff9f1c]"> Hive identity</span>
            </h2>

            <p className="mt-6 text-white/70 text-lg leading-relaxed">
              Turn your household into a connected community with AI-generated
              avatars, achievements, birthdays, and personalized profiles.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "AI generated household avatars",
                "Celebrate birthdays automatically",
                "Track contribution achievements",
                "Build positive household habits",
              ].map((item) => (
                <div key={item} className="flex gap-3 items-center">
                  <div className="bg-[#ff9f1c] h-6 w-6 rounded-full flex items-center justify-center text-black">
                    ✓
                  </div>

                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* AVATAR CARDS */}

          <div className="grid gap-6">
            {[
              {
                avatar: "🧑🏽‍💻",

                name: "Julian",

                role: "Cleaning Champion",

                score: "94%",
              },

              {
                avatar: "👩🏻‍🎨",

                name: "Aisha",

                role: "Grocery Hero",

                score: "89%",
              },

              {
                avatar: "👨🏾‍🍳",

                name: "Marcus",

                role: "Kitchen Master",

                score: "97%",
              },
            ].map((person) => (
              <motion.div
                key={person.name}
                whileHover={{ x: 10 }}
                className="bg-white/10 border border-white/10 rounded-3xl p-6 flex items-center justify-between backdrop-blur-xl"
              >
                <div className="flex items-center gap-5">
                  <div className="text-5xl bg-white/10 rounded-full p-4">
                    {person.avatar}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">{person.name}</h3>

                    <p className="text-white/60">{person.role}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[#ff9f1c] font-bold text-xl">
                    {person.score}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}

      <section className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}

          <div className="text-center">
            <p className="text-[#ff9f1c] font-bold">
              WHY HOUSEHOLDS LOVE HOMEHIVE
            </p>

            <h2 className="text-5xl font-bold mt-5">
              Less arguing.
              <br />
              More living.
            </h2>

            <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
              Replace forgotten chores, awkward money reminders, and messy group
              chats with a home everyone enjoys.
            </p>
          </div>

          {/* STATS */}

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              {
                number: "5K+",
                label: "Households organized",
              },

              {
                number: "50K+",
                label: "Tasks completed",
              },

              {
                number: "98%",
                label: "Less chore confusion",
              },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -8 }}
                className="bg-[#fff7ef] rounded-3xl p-10 text-center shadow-lg"
              >
                <h3 className="text-5xl font-bold text-[#ff9f1c]">
                  {stat.number}
                </h3>

                <p className="mt-4 text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* REVIEWS */}

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                text: "We finally stopped using three different group chats just to manage our apartment.",
              },

              {
                text: "Rent reminders are no longer awkward. Everyone knows what needs to happen.",
              },

              {
                text: "Our house actually feels organized now. Everyone contributes fairly.",
              },
            ].map((review, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.04 }}
                className="bg-white border rounded-3xl p-8 shadow-xl"
              >
                <p className="text-5xl text-[#ff9f1c]">“</p>

                <p className="text-gray-700 leading-relaxed">{review.text}</p>

                <div className="flex items-center gap-3 mt-8">
                  <div className="h-12 w-12 bg-[#07143d] rounded-full flex items-center justify-center text-white">
                    🐝
                  </div>

                  <div>
                    <h4 className="font-bold">HomeHive User</h4>

                    <p className="text-gray-500 text-sm">
                      Early household tester
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}

      <section className="py-28 px-6 bg-[#fff7ef]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#ff9f1c] font-bold">PRICING</p>

          <h2 className="text-5xl font-bold mt-5">
            Start free.
            <br />
            Upgrade as your Hive grows.
          </h2>

          <p className="text-gray-600 mt-6">
            Simple pricing for roommates, families, and property owners.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              {
                name: "Free",
                price: "$0",
                description: "For roommates getting organized.",
                features: [
                  "Up to 5 members",
                  "Chores",
                  "House chat",
                  "Basic reminders",
                ],
              },

              {
                name: "Hive Plus",
                price: "$4.99",
                highlight: true,
                description: "For households wanting everything.",
                features: [
                  "Unlimited members",
                  "AI avatars",
                  "Advanced analytics",
                  "Expense tracking",
                ],
              },

              {
                name: "Landlord",
                price: "$14.99",
                description: "For managing properties.",
                features: [
                  "Multiple properties",
                  "Tenant management",
                  "Requests dashboard",
                  "Announcements",
                ],
              },
            ].map((plan) => (
              <motion.div
                key={plan.name}
                whileHover={{ y: -10 }}
                className={`
                    rounded-[2rem] p-10 text-left shadow-xl
                    ${
                      plan.highlight
                        ? "bg-[#07143d] text-white scale-105"
                        : "bg-white"
                    }
                    `}
              >
                {plan.highlight && (
                  <span className="bg-[#ff9f1c] text-black px-4 py-2 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </span>
                )}

                <h3 className="text-3xl font-bold mt-8">{plan.name}</h3>

                <h2 className="text-5xl font-bold mt-5">
                  {plan.price}

                  <span className="text-lg opacity-60">/mo</span>
                </h2>

                <p className="mt-5 opacity-70">{plan.description}</p>

                <ul className="space-y-4 mt-8">
                  {plan.features.map((feature) => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate("/create-hive")}
                  className="mt-10 w-full bg-[#ff9f1c] text-black py-4 rounded-xl font-bold"
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="py-32 text-center px-6">
        <h2 className="text-5xl font-bold">
          Ready to bring your home in sync?
        </h2>

        <button
          onClick={() => navigate("/create-hive")}
          className="mt-10 bg-[#ff9f1c] px-10 py-5 rounded-2xl font-bold"
        >
          Create your Hive →
        </button>
      </section>
      {/* ================= FOOTER ================= */}

      <footer className="bg-[#07143d] text-white px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            {/* BRAND */}

            <div>
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="HomeHive"
                  className="h-12 w-12 object-contain"
                />

                <h2 className="text-2xl font-bold">HomeHive</h2>
              </div>

              <p className="mt-5 text-white/60 leading-relaxed">
                Bringing roommates, families, and property owners together
                through smarter household management.
              </p>
            </div>

            {/* PRODUCT */}

            <div>
              <h3 className="font-bold mb-5">Product</h3>

              <ul className="space-y-3 text-white/60">
                <li>Chores</li>

                <li>Expenses</li>

                <li>House Chat</li>

                <li>AI Profiles</li>
              </ul>
            </div>

            {/* USERS */}

            <div>
              <h3 className="font-bold mb-5">Built For</h3>

              <ul className="space-y-3 text-white/60">
                <li>Roommates</li>

                <li>Families</li>

                <li>Landlords</li>

                <li>Students</li>
              </ul>
            </div>

            {/* COMPANY */}

            <div>
              <h3 className="font-bold mb-5">Company</h3>

              <ul className="space-y-3 text-white/60">
                <li>About</li>

                <li>Privacy</li>

                <li>Terms</li>

                <li>Contact</li>
              </ul>
            </div>
          </div>

          {/* BOTTOM */}

          <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row justify-between gap-5 text-white/50">
            <p>© 2026 HomeHive. All rights reserved.</p>

            <p>Built to keep every home in sync 🐝</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Landing;
