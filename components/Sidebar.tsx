"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FiHome,
  FiBarChart2,
  FiCreditCard,
  FiSettings,
  FiMoon,
  FiSun,
} from "react-icons/fi";

type Props = {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
};

export default function Sidebar({
  darkMode,
  setDarkMode,
}: Props) {
  const pathname = usePathname();

  const menus = [
    {
      name: "Dashboard",
      icon: <FiHome />,
      path: "/",
    },
    {
      name: "Transaksi",
      icon: <FiCreditCard />,
      path: "/transaksi",
    },
    {
      name: "Statistik",
      icon: <FiBarChart2 />,
      path: "/statistik",
    },
    {
      name: "Pengaturan",
      icon: <FiSettings />,
      path: "/pengaturan",
    },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-screen w-24 md:w-28 z-50 border-r backdrop-blur-3xl transition-all duration-500 ${
        darkMode
          ? "bg-black/30 border-white/10"
          : "bg-white/80 border-gray-200"
      }`}
    >
      <div className="flex flex-col items-center py-6 h-full">

        {/* LOGO */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-2xl">
          F
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-5 mt-10">

          {menus.map((m, i) => (
            <Link key={i} href={m.path}>

              <div
                className={`group relative w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 cursor-pointer ${
                  pathname === m.path
                    ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white scale-110 shadow-2xl"
                    : darkMode
                    ? "bg-white/5 text-white hover:bg-white/10"
                    : "bg-white text-black hover:bg-gray-100 shadow"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="group-hover:scale-125 transition-all duration-300"
                  style={{
                    transform: "translateZ(20px)",
                  }}
                >
                  {m.icon}
                </div>

                <div
                  className={`absolute left-20 px-3 py-2 rounded-xl text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap ${
                    darkMode
                      ? "bg-black text-white"
                      : "bg-white text-black shadow"
                  }`}
                >
                  {m.name}
                </div>
              </div>

            </Link>
          ))}

        </div>

        {/* THEME */}
        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className={`mt-auto w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all ${
            darkMode
              ? "bg-white/10 text-yellow-300"
              : "bg-white text-black shadow"
          }`}
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

      </div>
    </div>
  );
}