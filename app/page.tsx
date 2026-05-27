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
  FiMoreHorizontal,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  BarChart,
  Bar,
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

  const [activities, setActivities] =
    useState<any[]>([]);

  const [notifications, setNotifications] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

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

    const { data: txData } =
      await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

    setTransactions(txData || []);

    const { data: analyticsData } =
      await supabase
        .from("analytics")
        .select("*")
        .eq("user_id", user.id)
        .single();

    setAnalytics(analyticsData);

    const { data: actData } =
      await supabase
        .from("activities")
        .select("*")
        .eq("user_id", user.id);

    setActivities(actData || []);

    const { data: notifData } =
      await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id);

    setNotifications(notifData || []);

    setLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();

    router.push("/login");
  };

  const toggleTheme = async () => {
    const mode = !darkMode;

    setDarkMode(mode);

    await supabase
      .from("profiles")
      .update({
        dark_mode: mode,
      })
      .eq("id", profile.id);
  };

  const chartData = transactions
    .slice(0, 6)
    .map((item, i) => ({
      name: `T${i + 1}`,
      amount: item.amount,
    }));

  const barData = transactions
    .slice(0, 6)
    .map((item, i) => ({
      name: `M${i + 1}`,
      value: item.amount,
    }));

  const cards = [
    {
      title: "Total Revenue",
      value:
        analytics?.total_revenue || 0,
      percent: "+8%",
      icon: <FiDollarSign />,
      active: true,
    },
    {
      title: "Total Expenses",
      value:
        analytics?.total_expense || 0,
      percent: "-4%",
      icon: <FiTrendingDown />,
    },
    {
      title: "Profit & Loss",
      value:
        analytics?.total_profit || 0,
      percent: "+12%",
      icon: <FiTrendingUp />,
    },
    {
      title: "Cash Balance",
      value: profile?.balance || 0,
      percent: "+5%",
      icon: <FiUsers />,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-[#0b1120] text-white"
          : "bg-[#eef2ff] text-black"
      }`}
    >
      <div className="flex flex-col lg:flex-row">

        {/* SIDEBAR */}
        <div
          className={`w-full lg:w-[260px] p-4 lg:p-5 border-b lg:border-r lg:border-b-0 transition-all duration-500 ${
            darkMode
              ? "bg-[#111827] border-white/10"
              : "bg-white border-gray-200"
          }`}
        >
          {/* LOGO */}
          <div className="flex items-center gap-3 mb-6 lg:mb-10">

            <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center font-bold shadow-2xl">
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
                Finance Dashboard
              </p>
            </div>

          </div>

          {/* MENU */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible no-scrollbar pb-2">

            {[
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
            ].map((item, i) => (
              <motion.button
                key={i}
                whileHover={{
                  scale: 1.03,
                }}
                onClick={() =>
                  router.push(item.path)
                }
                className={`min-w-fit lg:w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  item.path === "/"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-xl"
                    : darkMode
                    ? "hover:bg-white/5"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.icon}

                <p className="font-medium whitespace-nowrap">
                  {item.name}
                </p>
              </motion.button>
            ))}

          </div>

          {/* SUPPORT */}
          <div className="mt-6 lg:mt-auto space-y-3">

            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl ${
                darkMode
                  ? "hover:bg-white/5"
                  : "hover:bg-gray-100"
              }`}
            >
              <FiHelpCircle />
              Help
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
        <div className="flex-1 p-4 lg:p-6">

          {/* TOPBAR */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between lg:items-center mb-6">

            {/* SEARCH */}
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl w-full lg:w-[320px] ${
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
                placeholder="Search here..."
                className="bg-transparent outline-none flex-1"
              />

            </div>

            {/* RIGHT */}
            <div className="flex items-center justify-between lg:justify-end gap-3 flex-wrap">

              <div className="flex items-center gap-3">

                {/* THEME */}
                <button
                  onClick={toggleTheme}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
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
                  onClick={() =>
                    router.push(
                      "/notifications"
                    )
                  }
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

              </div>

              {/* PROFILE */}
              <div className="flex items-center gap-3">

                <img
                  src={
                    profile?.avatar_url ||
                    "https://i.pravatar.cc/100"
                  }
                  className="w-12 h-12 rounded-2xl"
                />

                <div className="hidden sm:block">
                  <h2 className="font-semibold">
                    {profile?.full_name ||
                      "User"}
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

          {/* GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* LEFT */}
            <div className="xl:col-span-2 space-y-6">

              {/* CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {cards.map((card, i) => (
                  <motion.div
                    key={i}
                    whileHover={{
                      y: -4,
                    }}
                    className={`rounded-3xl p-5 border transition-all ${
                      card.active
                        ? "bg-gradient-to-br from-blue-500 to-cyan-400 text-white border-transparent"
                        : darkMode
                        ? "bg-[#111827] border-white/10"
                        : "bg-white border-gray-200"
                    }`}
                  >

                    <div className="flex justify-between">

                      <div>

                        <p
                          className={`text-sm ${
                            !card.active &&
                            (darkMode
                              ? "text-white/50"
                              : "text-gray-500")
                          }`}
                        >
                          {card.title}
                        </p>

                        <h2 className="text-3xl lg:text-4xl font-bold mt-3 break-all">
                          ${card.value}
                        </h2>

                        <p className="mt-2 text-sm">
                          {card.percent}
                        </p>

                      </div>

                      <div className="text-3xl">
                        {card.icon}
                      </div>

                    </div>

                  </motion.div>
                ))}

              </div>

              {/* CHART */}
              <div
                className={`rounded-3xl p-4 lg:p-6 border ${
                  darkMode
                    ? "bg-[#111827] border-white/10"
                    : "bg-white border-gray-200"
                }`}
              >

                <div className="mb-5">

                  <h2 className="text-xl font-bold">
                    Revenue & Expenses
                  </h2>

                  <p
                    className={`text-sm mt-1 ${
                      darkMode
                        ? "text-white/40"
                        : "text-gray-500"
                    }`}
                  >
                    Overview statistics
                  </p>

                </div>

                <div className="w-full h-[250px] lg:h-[300px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <LineChart
                      data={chartData}
                    >

                      <XAxis
                        dataKey="name"
                        stroke="#888"
                      />

                      <Tooltip />

                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#3b82f6"
                        strokeWidth={4}
                      />

                    </LineChart>

                  </ResponsiveContainer>

                </div>

              </div>

              {/* TRANSACTIONS */}
              <div
                className={`rounded-3xl p-4 lg:p-6 border ${
                  darkMode
                    ? "bg-[#111827] border-white/10"
                    : "bg-white border-gray-200"
                }`}
              >

                <div className="flex justify-between mb-5">

                  <h2 className="text-xl font-bold">
                    Transactions
                  </h2>

                  <button
                    onClick={() =>
                      router.push(
                        "/transactions"
                      )
                    }
                    className="text-blue-500"
                  >
                    View All
                  </button>

                </div>

                <div className="space-y-4">

                  {transactions
                    .slice(0, 5)
                    .map((item, i) => (
                      <div
                        key={i}
                        className={`flex flex-col sm:flex-row sm:justify-between gap-3 sm:items-center p-4 rounded-2xl ${
                          darkMode
                            ? "bg-white/5"
                            : "bg-gray-50"
                        }`}
                      >

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

                        <div className="sm:text-right">

                          <h2 className="font-bold">
                            ${item.amount}
                          </h2>

                          <p className="text-green-500 text-sm">
                            {item.status}
                          </p>

                        </div>

                      </div>
                    ))}

                </div>

              </div>

            </div>

            {/* RIGHT */}
            <div className="space-y-6">

              {/* BAR */}
              <div
                className={`rounded-3xl p-4 lg:p-6 border ${
                  darkMode
                    ? "bg-[#111827] border-white/10"
                    : "bg-white border-gray-200"
                }`}
              >

                <div className="flex justify-between mb-6">

                  <h2 className="text-xl font-bold">
                    Profit
                  </h2>

                  <FiMoreHorizontal />

                </div>

                <div className="w-full h-[250px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <BarChart data={barData}>

                      <Tooltip />

                      <Bar
                        dataKey="value"
                        fill="#3b82f6"
                        radius={[
                          10,
                          10,
                          0,
                          0,
                        ]}
                      />

                    </BarChart>

                  </ResponsiveContainer>

                </div>

              </div>

              {/* ACTIVITIES */}
              <div
                className={`rounded-3xl p-4 lg:p-6 border ${
                  darkMode
                    ? "bg-[#111827] border-white/10"
                    : "bg-white border-gray-200"
                }`}
              >

                <div className="flex justify-between mb-5">

                  <h2 className="text-xl font-bold">
                    Team Activity
                  </h2>

                  <button className="text-blue-500">
                    View
                  </button>

                </div>

                <div className="space-y-4">

                  {activities.map(
                    (item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{
                          x: 4,
                        }}
                        className={`flex items-center justify-between p-3 rounded-2xl ${
                          darkMode
                            ? "bg-white/5"
                            : "bg-gray-50"
                        }`}
                      >

                        <div className="flex items-center gap-3">

                          <img
                            src={`https://i.pravatar.cc/150?img=${
                              i + 10
                            }`}
                            className="w-12 h-12 rounded-2xl"
                          />

                          <div>

                            <h2 className="font-semibold">
                              {
                                item.activity_name
                              }
                            </h2>

                            <p
                              className={`text-sm ${
                                darkMode
                                  ? "text-white/40"
                                  : "text-gray-500"
                              }`}
                            >
                              {
                                item.activity_role
                              }
                            </p>

                          </div>

                        </div>

                        <button
                          className={`px-3 py-1 rounded-xl text-sm ${
                            item.activity_status ===
                            "Done"
                              ? "bg-green-500/20 text-green-400"
                              : item.activity_status ===
                                "Pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {
                            item.activity_status
                          }
                        </button>

                      </motion.div>
                    )
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}