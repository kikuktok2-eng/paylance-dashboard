"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  const [tab, setTab] = useState<"login" | "register">("login");

  // STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // REGISTER
  const handleRegister = async () => {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setMessage("❌ " + error.message);
      setLoading(false);
      return;
    }

    // SIMPAN KE TABLE profiles
    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email: data.user.email,
      });
    }

    setMessage("✅ Register berhasil!");

    // otomatis masuk dashboard
    router.push("/");

    setLoading(false);
  };

  // LOGIN
  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("❌ " + error.message);
    } else {
      setMessage("✅ Login berhasil!");

      // pindah ke halaman utama
      router.push("/");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05060A] relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[140px] rounded-full top-[-150px] left-[-150px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[140px] rounded-full bottom-[-150px] right-[-150px]" />

      {/* CARD */}
      <div className="w-[420px] z-10 rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl">

        {/* HEADER */}
        <div className="p-8 text-center">
          <h1 className="text-3xl font-semibold text-white">
            Welcome
          </h1>

          <p className="text-white/40 text-sm mt-2">
            Login or create your account
          </p>
        </div>

        {/* TAB */}
        <div className="px-6">
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">

            <button
              onClick={() => setTab("login")}
              className={`w-1/2 py-2 rounded-xl text-sm transition ${
                tab === "login"
                  ? "bg-white text-black"
                  : "text-white/50"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setTab("register")}
              className={`w-1/2 py-2 rounded-xl text-sm transition ${
                tab === "register"
                  ? "bg-white text-black"
                  : "text-white/50"
              }`}
            >
              Register
            </button>

          </div>
        </div>

        {/* FORM */}
        <div className="p-8 space-y-4">

          {/* NAME */}
          {tab === "register" && (
            <input
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {/* EMAIL */}
          <input
            type="email"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <input
            type="password"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* BUTTON LOGIN */}
          {tab === "login" ? (
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-white text-black font-medium hover:scale-[1.02] transition"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          ) : (
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 text-white font-medium hover:scale-[1.02] transition"
            >
              {loading ? "Loading..." : "Create Account"}
            </button>
          )}

          {/* MESSAGE */}
          {message && (
            <p className="text-center text-sm text-white/60 mt-3">
              {message}
            </p>
          )}

        </div>
      </div>
    </div>
  );
}