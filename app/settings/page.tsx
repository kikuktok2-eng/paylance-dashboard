"use client";

import { useEffect, useState } from "react";

import {
  FiUser,
  FiLock,
  FiBell,
  FiMoon,
  FiSun,
  FiShield,
  FiGlobe,
  FiCreditCard,
  FiCheck,
  FiCamera,
  FiSave,
} from "react-icons/fi";

import { motion } from "framer-motion";

export default function SettingsPage() {
  const [darkMode, setDarkMode] =
    useState(true);

  const [notifications, setNotifications] =
    useState(true);

  const [twoFactor, setTwoFactor] =
    useState(false);

  const [language, setLanguage] =
    useState("English");

  const [name, setName] =
    useState("Dwayne Tatum");

  const [email, setEmail] =
    useState("dwayne@example.com");

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

  return (
    <div
      className={`min-h-screen transition-all duration-500 overflow-hidden ${
        darkMode
          ? "bg-[#0b1120] text-white"
          : "bg-[#eef2ff] text-black"
      }`}
    >
      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-violet-500/20 blur-[120px] rounded-full" />

      </div>

      <div className="p-6 lg:p-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-5 mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              Settings
            </h1>

            <p
              className={`mt-2 ${
                darkMode
                  ? "text-white/40"
                  : "text-gray-500"
              }`}
            >
              Manage your profile,
              security & preferences
            </p>

          </div>

          {/* MODE BUTTON */}
          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${
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

        {/* GRID */}
        <div className="grid xl:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="xl:col-span-1 space-y-6">

            {/* PROFILE CARD */}
            <motion.div
              whileHover={{
                rotateY: 5,
                rotateX: -5,
                y: -4,
              }}
              transition={{
                type: "spring",
              }}
              className={`relative overflow-hidden rounded-[35px] p-6 border backdrop-blur-3xl ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-200"
              }`}
              style={{
                transformStyle:
                  "preserve-3d",
              }}
            >

              <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-blue-500/20 blur-[80px] rounded-full" />

              <div className="relative z-10 text-center">

                <div className="relative w-fit mx-auto">

                  <img
                    src="https://i.pravatar.cc/200"
                    className="w-28 h-28 rounded-[28px] object-cover border-4 border-white/20"
                  />

                  <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-xl">
                    <FiCamera />
                  </button>

                </div>

                <h2 className="text-2xl font-bold mt-5">
                  {name}
                </h2>

                <p
                  className={`mt-1 ${
                    darkMode
                      ? "text-white/40"
                      : "text-gray-500"
                  }`}
                >
                  Premium Account
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">

                  <div
                    className={`rounded-2xl p-4 ${
                      darkMode
                        ? "bg-white/5"
                        : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm text-blue-400">
                      Balance
                    </p>

                    <h2 className="font-bold text-xl mt-1">
                      $24K
                    </h2>
                  </div>

                  <div
                    className={`rounded-2xl p-4 ${
                      darkMode
                        ? "bg-white/5"
                        : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm text-cyan-400">
                      Savings
                    </p>

                    <h2 className="font-bold text-xl mt-1">
                      $8K
                    </h2>
                  </div>

                </div>

              </div>

            </motion.div>

            {/* SECURITY STATUS */}
            <motion.div
              whileHover={{
                y: -4,
              }}
              className="rounded-[35px] p-6 bg-gradient-to-br from-blue-500 via-cyan-500 to-violet-600 text-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] relative overflow-hidden"
            >

              <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-white/10 blur-[80px] rounded-full" />

              <div className="relative z-10">

                <FiShield className="text-5xl" />

                <h2 className="text-3xl font-bold mt-5">
                  Security Active
                </h2>

                <p className="mt-3 opacity-80 leading-relaxed">
                  Your account is fully
                  protected with advanced
                  encryption.
                </p>

                <button className="mt-6 px-5 py-3 rounded-2xl bg-white text-black font-semibold">
                  Security Center
                </button>

              </div>

            </motion.div>

          </div>

          {/* RIGHT */}
          <div className="xl:col-span-2 space-y-6">

            {/* PROFILE SETTINGS */}
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

              <div className="flex items-center gap-3 mb-6">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white text-2xl shadow-xl">
                  <FiUser />
                </div>

                <div>

                  <h2 className="text-2xl font-bold">
                    Profile Settings
                  </h2>

                  <p
                    className={`text-sm ${
                      darkMode
                        ? "text-white/40"
                        : "text-gray-500"
                    }`}
                  >
                    Update your personal
                    information
                  </p>

                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-5">

                <div>

                  <label
                    className={`text-sm ${
                      darkMode
                        ? "text-white/50"
                        : "text-gray-500"
                    }`}
                  >
                    Full Name
                  </label>

                  <input
                    value={name}
                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }
                    className={`mt-2 w-full p-4 rounded-2xl outline-none ${
                      darkMode
                        ? "bg-[#111827]"
                        : "bg-gray-100"
                    }`}
                  />

                </div>

                <div>

                  <label
                    className={`text-sm ${
                      darkMode
                        ? "text-white/50"
                        : "text-gray-500"
                    }`}
                  >
                    Email Address
                  </label>

                  <input
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    className={`mt-2 w-full p-4 rounded-2xl outline-none ${
                      darkMode
                        ? "bg-[#111827]"
                        : "bg-gray-100"
                    }`}
                  />

                </div>

              </div>

              <button className="mt-6 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold flex items-center gap-2 shadow-2xl">
                <FiSave />
                Save Changes
              </button>

            </motion.div>

            {/* PREFERENCES */}
            <motion.div
              whileHover={{
                rotateX: -3,
              }}
              className={`rounded-[35px] p-6 border backdrop-blur-3xl ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >

              <div className="flex items-center gap-3 mb-6">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-2xl shadow-xl">
                  <FiBell />
                </div>

                <div>

                  <h2 className="text-2xl font-bold">
                    Preferences
                  </h2>

                  <p
                    className={`text-sm ${
                      darkMode
                        ? "text-white/40"
                        : "text-gray-500"
                    }`}
                  >
                    Customize your dashboard
                  </p>

                </div>

              </div>

              <div className="space-y-5">

                {/* NOTIFICATION */}
                <div
                  className={`flex justify-between items-center p-5 rounded-2xl ${
                    darkMode
                      ? "bg-[#111827]"
                      : "bg-gray-100"
                  }`}
                >

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl">
                      <FiBell />
                    </div>

                    <div>

                      <h2 className="font-semibold">
                        Notifications
                      </h2>

                      <p
                        className={`text-sm ${
                          darkMode
                            ? "text-white/40"
                            : "text-gray-500"
                        }`}
                      >
                        Enable push alerts
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      setNotifications(
                        !notifications
                      )
                    }
                    className={`w-14 h-8 rounded-full transition-all ${
                      notifications
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full transition-all ${
                        notifications
                          ? "translate-x-7"
                          : "translate-x-1"
                      }`}
                    />
                  </button>

                </div>

                {/* 2FA */}
                <div
                  className={`flex justify-between items-center p-5 rounded-2xl ${
                    darkMode
                      ? "bg-[#111827]"
                      : "bg-gray-100"
                  }`}
                >

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-green-500/20 text-green-400 flex items-center justify-center text-xl">
                      <FiLock />
                    </div>

                    <div>

                      <h2 className="font-semibold">
                        Two Factor Auth
                      </h2>

                      <p
                        className={`text-sm ${
                          darkMode
                            ? "text-white/40"
                            : "text-gray-500"
                        }`}
                      >
                        Extra account protection
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      setTwoFactor(
                        !twoFactor
                      )
                    }
                    className={`w-14 h-8 rounded-full transition-all ${
                      twoFactor
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full transition-all ${
                        twoFactor
                          ? "translate-x-7"
                          : "translate-x-1"
                      }`}
                    />
                  </button>

                </div>

                {/* LANGUAGE */}
                <div
                  className={`flex justify-between items-center p-5 rounded-2xl ${
                    darkMode
                      ? "bg-[#111827]"
                      : "bg-gray-100"
                  }`}
                >

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-violet-500/20 text-violet-400 flex items-center justify-center text-xl">
                      <FiGlobe />
                    </div>

                    <div>

                      <h2 className="font-semibold">
                        Language
                      </h2>

                      <p
                        className={`text-sm ${
                          darkMode
                            ? "text-white/40"
                            : "text-gray-500"
                        }`}
                      >
                        Dashboard language
                      </p>

                    </div>

                  </div>

                  <select
                    value={language}
                    onChange={(e) =>
                      setLanguage(
                        e.target.value
                      )
                    }
                    className={`px-4 py-3 rounded-2xl outline-none ${
                      darkMode
                        ? "bg-[#0b1120]"
                        : "bg-white"
                    }`}
                  >
                    <option>
                      English
                    </option>

                    <option>
                      Indonesia
                    </option>

                    <option>
                      Japanese
                    </option>

                  </select>

                </div>

              </div>

            </motion.div>

            {/* BILLING */}
            <motion.div
              whileHover={{
                y: -4,
              }}
              className={`rounded-[35px] p-6 border backdrop-blur-3xl ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >

              <div className="flex items-center gap-3 mb-6">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center text-white text-2xl shadow-xl">
                  <FiCreditCard />
                </div>

                <div>

                  <h2 className="text-2xl font-bold">
                    Billing & Plan
                  </h2>

                  <p
                    className={`text-sm ${
                      darkMode
                        ? "text-white/40"
                        : "text-gray-500"
                    }`}
                  >
                    Subscription and payment
                  </p>

                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-5">

                <div className="rounded-3xl p-6 bg-gradient-to-br from-blue-500 to-cyan-400 text-white">

                  <div className="flex justify-between">

                    <h2 className="text-xl font-bold">
                      Premium
                    </h2>

                    <FiCheck />
                  </div>

                  <h1 className="text-5xl font-bold mt-5">
                    $19
                  </h1>

                  <p className="mt-2 opacity-80">
                    /month
                  </p>

                </div>

                <div
                  className={`rounded-3xl p-6 ${
                    darkMode
                      ? "bg-[#111827]"
                      : "bg-gray-100"
                  }`}
                >

                  <h2 className="text-xl font-bold">
                    Current Features
                  </h2>

                  <div className="space-y-4 mt-5">

                    {[
                      "Unlimited Analytics",
                      "Cloud Sync",
                      "Realtime Insights",
                      "Priority Support",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3"
                      >

                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs text-white">
                          <FiCheck />
                        </div>

                        <p>{item}</p>

                      </div>
                    ))}

                  </div>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </div>
    </div>
  );
}