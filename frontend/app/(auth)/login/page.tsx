"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_URL ?? "http://localhost:5000";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          passWord: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      localStorage.setItem("token", data.token);

      router.push("/dashboard");
    } catch {
      setError("Couldn't connect to server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0E14] lg:grid lg:grid-cols-2">
      {/* LEFT */}

      <div
        className="relative hidden lg:flex flex-col justify-between border-r border-[#232A38] bg-[#10141C] p-10"
        style={{
          backgroundImage:
            "radial-gradient(circle,#1A2030 1px,transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <div className="font-mono text-lg text-[#ECEFF4]">
          <span className="text-[#FFB454]">&lt;</span>
          DevNotes
          <span className="text-[#FFB454]">/&gt;</span>
        </div>

        <div className="rounded-xl border border-[#232A38] bg-[#161B26] p-6">
          <p className="font-mono text-xs text-[#6EE7B7] mb-2">
            $ devnotes login
          </p>

          <h2 className="text-xl text-white font-semibold">Welcome Back 👋</h2>

          <p className="mt-3 text-[#97A1B0]">
            Continue learning where you left off.
          </p>
        </div>

        <p className="font-mono text-xs text-[#5B6472]">
          Your knowledge. Anywhere.
        </p>
      </div>

      {/* RIGHT */}

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 font-mono text-lg text-[#ECEFF4] lg:hidden">
            <span className="text-[#FFB454]">&lt;</span>
            DevNotes
            <span className="text-[#FFB454]">/&gt;</span>
          </div>

          <div className="font-mono text-xs text-[#6EE7B7]">$ login</div>

          <h1 className="mt-2 text-3xl font-semibold text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-[#97A1B0]">Login to continue your journey.</p>

          {error && (
            <div className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-[#97A1B0]">Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[#232A38] bg-[#161B26] px-4 py-3 text-white outline-none focus:border-[#FFB454]"
              />
            </div>

            <div>
              <label className="mb-2 block text-[#97A1B0]">Password</label>

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[#232A38] bg-[#161B26] px-4 py-3 text-white outline-none focus:border-[#FFB454]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="mt-2 text-sm text-[#FFB454]"
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </button>
            </div>

            <button
              disabled={loading}
              className="w-full rounded-lg bg-[#FFB454] py-3 font-semibold text-[#171208] hover:bg-[#F2A53C]"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-[#97A1B0]">
            Don't have an account?{" "}
            <a href="/register" className="text-[#FFB454]">
              Create one
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
