"use client";

import { useEffect, useState } from "react";

import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiPieChart,
  FiActivity,
  FiArrowUpRight,
  FiArrowDownRight,
  FiCalendar,
  FiDownload,
  FiSun,
  FiMoon,
  FiTarget,
  FiBarChart2,
} from "react-icons/fi";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import { motion } from "framer-motion";

export default function AnalyticsPage() {
  const [darkMode, setDarkMode] =
    useState(true);

  useEffect(() => {
    const saved =
      localStorage.getItem("theme");

    if (saved) {
      setDarkMode(saved === "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const revenueData = [
    {
      name: "Jan",
      income: 4000,
      expense: 2400,
    },
    {
      name: "Feb",
      income: 5200,
      expense: 3000,
    },
    {
      name: "Mar",
      income: 4800,
      expense: 2800,
    },
    {
      name: "Apr",
      income: 6800,
      expense: 4200,
    },
    {
      name: "May",
      income: 7200,
      expense: 4600,
    },
    {
      name: "Jun",
      income: 8500,
      expense: 5000,
    },
  ];

  const categoryData = [
    {
      name: "Investment",
      value: 40,
    },
    {
      name: "Shopping",
      value: 25,
    },
    {
      name: "Bills",
      value: 20,
    },
    {
      name: "Food",
      value: 15,
    },
  ];

  const performanceData = [
    {
      name: "Mon",
      value: 35,
    },
    {
      name: "Tue",
      value: 55,
    },
    {
      name: "Wed",
      value: 45,
    },
    {
      name: "Thu",
      value: 70,
    },
    {
      name: "Fri",
      value: 60,
    },
    {
      name: "Sat",
      value: 85,
    },
  ];

  const COLORS = [
    "#3b82f6",
    "#06b6d4",
    "#8b5cf6",
    "#22c55e",
  ];

  return (
    <div
      className={`min-h-screen overflow-hidden transition-all duration-500 ${
        darkMode
          ? "bg-[#0b1120] text-white"
          : "bg-[#eef2ff] text-black"
      }`}
    >
      {/* BG */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-blue-500/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[420px] h-[420px] bg-violet-500/20 blur-[120px] rounded-full" />

      </div>

      <div className="p-6 lg:p-8">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between gap-5 mb-8">

          <div>

            <h1 className="text-4xl font-bold tracking-tight">
              Analytics Dashboard
            </h1>

            <p
              className={`mt-2 ${
                darkMode
                  ? "text-white/40"
                  : "text-gray-500"
              }`}
            >
              Smart finance analytics &
              realtime insights
            </p>

          </div>

          <div className="flex gap-4">

            <button
              className={`px-5 py-3 rounded-2xl flex items-center gap-2 ${
                darkMode
                  ? "bg-white/5 border border-white/10"
                  : "bg-white border border-gray-200"
              }`}
            >
              <FiCalendar />
              This Month
            </button>

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                darkMode
                  ? "bg-white/5 border border-white/10"
                  : "bg-white border border-gray-200"
              }`}
            >
              {darkMode ? (
                <FiSun />
              ) : (
                <FiMoon />
              )}
            </button>

          </div>

        </div>

        {/* TOP CARDS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

          {[
            {
              title: "Total Revenue",
              value: "$92,450",
              growth: "+18%",
              icon:
                <FiTrendingUp />,
              color:
                "from-blue-500 to-cyan-400",
            },
            {
              title: "Expenses",
              value: "$35,280",
              growth: "-4%",
              icon:
                <FiTrendingDown />,
              color:
                "from-red-500 to-orange-400",
            },
            {
              title: "Profit",
              value: "$57,170",
              growth: "+12%",
              icon:
                <FiDollarSign />,
              color:
                "from-violet-500 to-fuchsia-500",
            },
            {
              title: "Performance",
              value: "98%",
              growth: "+9%",
              icon:
                <FiTarget />,
              color:
                "from-green-500 to-emerald-400",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{
                rotateX: -5,
                rotateY: 5,
                y: -5,
              }}
              transition={{
                type: "spring",
              }}
              className={`relative overflow-hidden rounded-[30px] p-6 border backdrop-blur-3xl ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-200"
              }`}
              style={{
                transformStyle:
                  "preserve-3d",
              }}
            >

              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10`}
              />

              <div className="relative z-10">

                <div className="flex justify-between items-center">

                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl shadow-2xl`}
                  >
                    {card.icon}
                  </div>

                  <div className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                    <FiArrowUpRight />
                    {card.growth}
                  </div>

                </div>

                <p
                  className={`mt-6 text-sm ${
                    darkMode
                      ? "text-white/50"
                      : "text-gray-500"
                  }`}
                >
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>

              </div>

            </motion.div>
          ))}

        </div>

        {/* MAIN GRID */}
        <div className="grid xl:grid-cols-3 gap-6 mt-6">

          {/* LEFT */}
          <div className="xl:col-span-2 space-y-6">

            {/* REVENUE */}
            <motion.div
              whileHover={{
                rotateX: -3,
                rotateY: 3,
              }}
              className={`rounded-[35px] p-6 border backdrop-blur-3xl ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-200"
              }`}
              style={{
                transformStyle:
                  "preserve-3d",
              }}
            >

              <div className="flex justify-between items-center mb-8">

                <div>

                  <h2 className="text-2xl font-bold">
                    Revenue Overview
                  </h2>

                  <p
                    className={`mt-1 text-sm ${
                      darkMode
                        ? "text-white/40"
                        : "text-gray-500"
                    }`}
                  >
                    Income & expense flow
                  </p>

                </div>

                <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
                  <FiDownload />
                </button>

              </div>

              <ResponsiveContainer
                width="100%"
                height={340}
              >
                <AreaChart
                  data={revenueData}
                >

                  <defs>

                    <linearGradient
                      id="income"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#3b82f6"
                        stopOpacity={0.7}
                      />

                      <stop
                        offset="100%"
                        stopColor="#3b82f6"
                        stopOpacity={0}
                      />

                    </linearGradient>

                    <linearGradient
                      id="expense"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#06b6d4"
                        stopOpacity={0.7}
                      />

                      <stop
                        offset="100%"
                        stopColor="#06b6d4"
                        stopOpacity={0}
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
                    dataKey="income"
                    stroke="#3b82f6"
                    fill="url(#income)"
                    strokeWidth={4}
                  />

                  <Area
                    type="monotone"
                    dataKey="expense"
                    stroke="#06b6d4"
                    fill="url(#expense)"
                    strokeWidth={4}
                  />

                </AreaChart>
              </ResponsiveContainer>

            </motion.div>

            {/* PERFORMANCE */}
            <motion.div
              whileHover={{
                rotateX: -3,
                y: -3,
              }}
              className={`rounded-[35px] p-6 border backdrop-blur-3xl ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >

              <div className="flex justify-between items-center mb-6">

                <div>

                  <h2 className="text-2xl font-bold">
                    Weekly Performance
                  </h2>

                  <p
                    className={`mt-1 text-sm ${
                      darkMode
                        ? "text-white/40"
                        : "text-gray-500"
                    }`}
                  >
                    Activity performance stats
                  </p>

                </div>

                <FiBarChart2 className="text-2xl" />

              </div>

              <ResponsiveContainer
                width="100%"
                height={250}
              >
                <BarChart
                  data={performanceData}
                >

                  <Tooltip />

                  <XAxis
                    dataKey="name"
                    stroke="#888"
                  />

                  <Bar
                    dataKey="value"
                    fill="#3b82f6"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>
              </ResponsiveContainer>

            </motion.div>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* PIE */}
            <motion.div
              whileHover={{
                rotateY: 5,
                rotateX: -5,
              }}
              className={`rounded-[35px] p-6 border backdrop-blur-3xl ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-200"
              }`}
              style={{
                transformStyle:
                  "preserve-3d",
              }}
            >

              <div className="flex justify-between items-center mb-6">

                <div>

                  <h2 className="text-2xl font-bold">
                    Expense Ratio
                  </h2>

                  <p
                    className={`mt-1 text-sm ${
                      darkMode
                        ? "text-white/40"
                        : "text-gray-500"
                    }`}
                  >
                    Spending categories
                  </p>

                </div>

                <FiPieChart className="text-2xl" />

              </div>

              <ResponsiveContainer
                width="100%"
                height={260}
              >
                <PieChart>

                  <Pie
                    data={categoryData}
                    dataKey="value"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={4}
                  >
                    {categoryData.map(
                      (_, i) => (
                        <Cell
                          key={i}
                          fill={COLORS[i]}
                        />
                      )
                    )}
                  </Pie>

                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-4 mt-5">

                {categoryData.map(
                  (item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center"
                    >

                      <div className="flex items-center gap-3">

                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            background:
                              COLORS[i],
                          }}
                        />

                        <p>{item.name}</p>

                      </div>

                      <h2 className="font-semibold">
                        {item.value}%
                      </h2>

                    </div>
                  )
                )}

              </div>

            </motion.div>

            {/* AI INSIGHT */}
            <motion.div
              whileHover={{
                rotateX: -5,
                rotateY: 5,
                scale: 1.02,
              }}
              className="relative overflow-hidden rounded-[35px] p-6 bg-gradient-to-br from-blue-500 via-cyan-500 to-violet-600 text-white shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
              style={{
                transformStyle:
                  "preserve-3d",
              }}
            >

              <div className="absolute top-0 right-0 w-[220px] h-[220px] bg-white/10 blur-[80px] rounded-full" />

              <div className="relative z-10">

                <p className="opacity-80 text-sm">
                  AI INSIGHT
                </p>

                <h2 className="text-3xl font-bold mt-4 leading-tight">
                  Your savings increased by
                  18%
                </h2>

                <p className="mt-4 opacity-80 leading-relaxed">
                  Financial performance is
                  improving steadily with
                  controlled expenses.
                </p>

                <button className="mt-8 px-5 py-3 rounded-2xl bg-white text-black font-semibold">
                  View Details
                </button>

              </div>

            </motion.div>

            {/* MINI STATS */}
            <div className="grid grid-cols-2 gap-4">

              {[
                {
                  title: "Growth",
                  value: "+32%",
                  color:
                    "from-green-500 to-emerald-400",
                },
                {
                  title: "Loss",
                  value: "-8%",
                  color:
                    "from-red-500 to-pink-500",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    y: -4,
                  }}
                  className={`rounded-[28px] p-5 border ${
                    darkMode
                      ? "bg-white/5 border-white/10"
                      : "bg-white border-gray-200"
                  }`}
                >

                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${item.color}`}
                  />

                  <p
                    className={`mt-5 text-sm ${
                      darkMode
                        ? "text-white/40"
                        : "text-gray-500"
                    }`}
                  >
                    {item.title}
                  </p>

                  <h2 className="text-2xl font-bold mt-2">
                    {item.value}
                  </h2>

                </motion.div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}