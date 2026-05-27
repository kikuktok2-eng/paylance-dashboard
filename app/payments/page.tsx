"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import {
  FiGrid,
  FiPieChart,
  FiCreditCard,
  FiMessageSquare,
  FiSettings,
  FiHelpCircle,
  FiBell,
  FiSearch,
  FiSun,
  FiMoon,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiUsers,
  FiLogOut,
  FiArrowUpRight,
  FiArrowDownLeft,
  FiActivity,
} from "react-icons/fi";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { motion } from "framer-motion";

export default function DashboardPage() {
  const router = useRouter();

  const [darkMode, setDarkMode] =
    useState(true);

  const [profile, setProfile] =
    useState<any>(null);

  const [transactions, setTransactions] =
    useState<any[]>([]);

  const [analytics, setAnalytics] =
    useState<any>(null);

  const [notifications, setNotifications] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [activeMenu, setActiveMenu] =
    useState("Overview");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    // PROFILE
    const { data: profileData } =
      await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    setProfile(profileData);

    setDarkMode(
      profileData?.dark_mode ?? true
    );

    // TRANSACTIONS
    const { data: txData } =
      await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

    setTransactions(txData || []);

    // ANALYTICS
    const { data: analyticsData } =
      await supabase
        .from("analytics")
        .select("*")
        .eq("user_id", user.id)
        .single();

    setAnalytics(analyticsData);

    // NOTIFICATION
    const { data: notifData } =
      await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id);

    setNotifications(notifData || []);

    setLoading(false);
  };

  const toggleTheme = async () => {
    const newMode = !darkMode;

    setDarkMode(newMode);

    if (profile) {
      await supabase
        .from("profiles")
        .update({
          dark_mode: newMode,
        })
        .eq("id", profile.id);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();

    router.push("/login");
  };

  const chartData = transactions
    .slice(0, 7)
    .map((item, i) => ({
      name: `D${i + 1}`,
      amount: item.amount,
    }));

  const pieData = [
    {
      name: "Income",
      value:
        analytics?.total_revenue || 0,
    },
    {
      name: "Expense",
      value:
        analytics?.total_expense || 0,
    },
  ];

  const menus = [
    {
      name: "Overview",
      icon: <FiGrid />,
      path: "/",
    },
    {
      name: "Payments",
      icon: <FiCreditCard />,
      path: "/payments",
    },
    {
      name: "Analytics",
      icon: <FiPieChart />,
      path: "/analytics",
    },
    {
      name: "Messages",
      icon: <FiMessageSquare />,
      path: "/messages",
    },
    {
      name: "Settings",
      icon: <FiSettings />,
      path: "/settings",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex transition-all duration-500 ${
        darkMode
          ? "bg-[#060816] text-white"
          : "bg-[#edf3ff] text-black"
      }`}
    >
      {/* SIDEBAR */}
      <div
        className={`w-[240px] border-r p-5 flex flex-col transition-all duration-500 ${
          darkMode
            ? "bg-[#0f172a] border-white/10"
            : "bg-white border-gray-200"
        }`}
      >
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-10">

          <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-white shadow-2xl">
            P
          </div>

          <div>
            <h1 className="font-bold text-lg">
              Paylance
            </h1>

            <p
              className={`text-xs ${
                darkMode
                  ? "text-white/40"
                  : "text-gray-500"
              }`}
            >
              Smart Finance
            </p>
          </div>

        </div>

        {/* MENU */}
        <div className="space-y-2">

          {menus.map((item, i) => (
            <motion.button
              key={i}
              whileHover={{
                scale: 1.03,
                x: 4,
              }}
              onClick={() => {
                setActiveMenu(
                  item.name
                );

                router.push(
                  item.path
                );
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                activeMenu ===
                item.name
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-2xl"
                  : darkMode
                  ? "hover:bg-white/5"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.icon}

              <span className="font-medium">
                {item.name}
              </span>
            </motion.button>
          ))}

        </div>

        {/* FOOTER */}
        <div className="mt-auto space-y-3">

          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl ${
              darkMode
                ? "hover:bg-white/5"
                : "hover:bg-gray-100"
            }`}
          >
            <FiHelpCircle />
            Help Center
          </button>

          <button
            onClick={logout}
            className="w-full py-3 rounded-2xl bg-red-500 text-white font-semibold"
          >
            <div className="flex items-center justify-center gap-2">
              <FiLogOut />
              Logout
            </div>
          </button>

        </div>

      </div>

      {/* MAIN */}
      <div className="flex-1 p-6 overflow-hidden">

        {/* TOPBAR */}
        <div className="flex justify-between items-center mb-8">

          {/* SEARCH */}
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl w-[320px] ${
              darkMode
                ? "bg-white/5"
                : "bg-white shadow"
            }`}
          >

            <FiSearch
              className={
                darkMode
                  ? "text-white/40"
                  : "text-gray-400"
              }
            />

            <input
              placeholder="Search..."
              className="bg-transparent outline-none flex-1"
            />

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {/* THEME */}
            <button
              onClick={toggleTheme}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                darkMode
                  ? "bg-white/5"
                  : "bg-white shadow"
              }`}
            >
              {darkMode ? (
                <FiSun />
              ) : (
                <FiMoon />
              )}
            </button>

            {/* NOTIF */}
            <button
              className={`w-12 h-12 rounded-2xl flex items-center justify-center relative ${
                darkMode
                  ? "bg-white/5"
                  : "bg-white shadow"
              }`}
            >
              <FiBell />

              {notifications.length >
                0 && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            {/* PROFILE */}
            <div className="flex items-center gap-3">

              <img
                src={
                  profile?.avatar_url ||
                  "https://i.pravatar.cc/100"
                }
                className="w-12 h-12 rounded-2xl object-cover"
              />

              <div>
                <h2 className="font-semibold">
                  {profile?.full_name}
                </h2>

                <p
                  className={`text-xs ${
                    darkMode
                      ? "text-white/40"
                      : "text-gray-500"
                  }`}
                >
                  {profile?.email}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* DASHBOARD CONTENT */}
        <div className="grid xl:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="xl:col-span-2 space-y-6">

            {/* BALANCE */}
            <motion.div
              whileHover={{
                rotateX: -4,
                rotateY: 4,
              }}
              className="relative overflow-hidden rounded-[35px] bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.4)]"
            >

              <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

              <div className="relative z-10">

                <p className="text-white/70">
                  Total Balance
                </p>

                <h1 className="text-5xl font-bold mt-4">
                  $
                  {profile?.balance ||
                    0}
                </h1>

                <div className="flex gap-6 mt-8">

                  <div>
                    <p className="text-white/70 text-sm">
                      Income
                    </p>

                    <h2 className="text-2xl font-bold mt-1 flex items-center gap-2">
                      <FiTrendingUp />
                      $
                      {analytics?.total_revenue ||
                        0}
                    </h2>
                  </div>

                  <div>
                    <p className="text-white/70 text-sm">
                      Expense
                    </p>

                    <h2 className="text-2xl font-bold mt-1 flex items-center gap-2">
                      <FiTrendingDown />
                      $
                      {analytics?.total_expense ||
                        0}
                    </h2>
                  </div>

                </div>

              </div>

            </motion.div>

            {/* CHART */}
            <div
              className={`rounded-[30px] p-6 ${
                darkMode
                  ? "bg-white/5"
                  : "bg-white"
              }`}
            >

              <div className="flex justify-between items-center mb-6">

                <div>
                  <h2 className="text-2xl font-bold">
                    Statistics
                  </h2>

                  <p
                    className={`text-sm ${
                      darkMode
                        ? "text-white/40"
                        : "text-gray-500"
                    }`}
                  >
                    Revenue overview
                  </p>
                </div>

                <FiActivity
                  size={24}
                />

              </div>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <AreaChart
                  data={chartData}
                >

                  <defs>
                    <linearGradient
                      id="colorUv"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#06b6d4"
                        stopOpacity={
                          0.8
                        }
                      />

                      <stop
                        offset="95%"
                        stopColor="#06b6d4"
                        stopOpacity={
                          0
                        }
                      />
                    </linearGradient>
                  </defs>

                  <XAxis
                    dataKey="name"
                    stroke="#888"
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#06b6d4"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                    strokeWidth={4}
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

            {/* TRANSACTIONS */}
            <div
              className={`rounded-[30px] p-6 ${
                darkMode
                  ? "bg-white/5"
                  : "bg-white"
              }`}
            >

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">
                  Recent Transactions
                </h2>

                <button
                  onClick={() =>
                    router.push(
                      "/transactions"
                    )
                  }
                  className="text-cyan-400"
                >
                  View All
                </button>

              </div>

              <div className="space-y-4">

                {transactions
                  .slice(0, 6)
                  .map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{
                        scale: 1.01,
                      }}
                      className={`flex items-center justify-between p-4 rounded-2xl ${
                        darkMode
                          ? "bg-white/5"
                          : "bg-[#f7f9ff]"
                      }`}
                    >

                      <div className="flex items-center gap-4">

                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                            item.type ===
                            "income"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {item.type ===
                          "income" ? (
                            <FiArrowUpRight />
                          ) : (
                            <FiArrowDownLeft />
                          )}
                        </div>

                        <div>

                          <h2 className="font-semibold">
                            {item.title}
                          </h2>

                          <p
                            className={`text-sm ${
                              darkMode
                                ? "text-white/40"
                                : "text-gray-500"
                            }`}
                          >
                            {item.note}
                          </p>

                        </div>

                      </div>

                      <h2
                        className={`font-bold ${
                          item.type ===
                          "income"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        $
                        {item.amount}
                      </h2>

                    </motion.div>
                  ))}

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* PIE */}
            <div
              className={`rounded-[30px] p-6 ${
                darkMode
                  ? "bg-white/5"
                  : "bg-white"
              }`}
            >

              <div className="flex justify-between mb-6">

                <h2 className="text-2xl font-bold">
                  Finance
                </h2>

                <FiPieChart />

              </div>

              <ResponsiveContainer
                width="100%"
                height={260}
              >

                <PieChart>

                  <Pie
                    data={pieData}
                    innerRadius={70}
                    outerRadius={100}
                    dataKey="value"
                  >

                    <Cell fill="#06b6d4" />
                    <Cell fill="#ef4444" />

                  </Pie>

                </PieChart>

              </ResponsiveContainer>

              <div className="flex justify-center gap-5 mt-3">

                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-400" />

                  <p>Income</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />

                  <p>Expense</p>
                </div>

              </div>

            </div>

            {/* QUICK STATS */}
            <div
              className={`rounded-[30px] p-6 ${
                darkMode
                  ? "bg-white/5"
                  : "bg-white"
              }`}
            >

              <h2 className="text-2xl font-bold mb-6">
                Quick Stats
              </h2>

              <div className="space-y-5">

                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <FiDollarSign />
                    Revenue
                  </div>

                  <span className="font-bold text-green-400">
                    $
                    {analytics?.total_revenue ||
                      0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <FiTrendingDown />
                    Expense
                  </div>

                  <span className="font-bold text-red-400">
                    $
                    {analytics?.total_expense ||
                      0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <FiUsers />
                    Users
                  </div>

                  <span className="font-bold">
                    120
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}