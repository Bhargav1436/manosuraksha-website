"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, User, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, remember }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Login failed.");
        if (data.remaining !== undefined) setRemaining(data.remaining);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#fdf8f2" }}
    >
      <div className="w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ background: "linear-gradient(135deg, #3d5a40, #5b7a5e)" }}
          >
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1
            className="font-['Libre_Baskerville',serif] text-[28px] font-bold"
            style={{ color: "#3d5a40" }}
          >
            Manosuraksha
          </h1>
          <p className="mt-1 text-[14px]" style={{ color: "#7a7470" }}>
            Admin Panel
          </p>
        </div>

        {/* Card */}
        <div
          className="bg-white rounded-[24px] p-8"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}
        >
          <h2
            className="text-[20px] font-bold mb-6"
            style={{ color: "#3a3530" }}
          >
            Sign in to continue
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label
                className="block text-[13px] font-[700] mb-1.5"
                style={{ color: "#3a3530" }}
              >
                Username
              </label>
              <div className="relative">
                <User
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "#7a7470" }}
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-[12px] text-[14px] outline-none transition-all duration-200"
                  style={{
                    border: "1.5px solid rgba(0,0,0,0.1)",
                    color: "#3a3530",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "#5b7a5e")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(0,0,0,0.1)")
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-[13px] font-[700] mb-1.5"
                style={{ color: "#3a3530" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "#7a7470" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full pl-10 pr-11 py-3 rounded-[12px] text-[14px] outline-none transition-all duration-200"
                  style={{
                    border: "1.5px solid rgba(0,0,0,0.1)",
                    color: "#3a3530",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "#5b7a5e")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(0,0,0,0.1)")
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: "#7a7470" }}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between">
              <Link
                href="/admin/forgot-password"
                className="text-[12px] font-[600] hover:underline"
                style={{ color: "#5b7a5e" }}
              >
                Forgot password?
              </Link>
            </div>

            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded accent-[#5b7a5e] cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="text-[13px] cursor-pointer"
                style={{ color: "#7a7470" }}
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Error */}
            {error && (
              <div
                className="flex items-start gap-2.5 p-3.5 rounded-[12px]"
                style={{ backgroundColor: "rgba(220,38,38,0.06)" }}
              >
                <AlertCircle
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: "#dc2626" }}
                />
                <div>
                  <p className="text-[13px] font-[600]" style={{ color: "#dc2626" }}>
                    {error}
                  </p>
                  {remaining !== null && remaining > 0 && (
                    <p className="text-[12px] mt-0.5" style={{ color: "#dc2626" }}>
                      {remaining} attempt{remaining !== 1 ? "s" : ""} remaining
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-[12px] text-white text-[14px] font-[700] transition-all duration-300 mt-2"
              style={{
                background: loading
                  ? "#9ca3af"
                  : "linear-gradient(135deg, #3d5a40, #5b7a5e)",
                boxShadow: loading
                  ? "none"
                  : "0 4px 16px rgba(61,90,64,0.3)",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p
          className="text-center mt-6 text-[12px]"
          style={{ color: "#7a7470" }}
        >
          Manosuraksha Admin Panel · Restricted Access
        </p>
      </div>
    </div>
  );
}
