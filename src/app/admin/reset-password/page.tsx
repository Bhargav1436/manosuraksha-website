"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/admin/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Reset failed.");
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/admin/login"), 2000);
    }
    setLoading(false);
  };

  if (!token) {
    return (
      <p className="text-center text-[14px]" style={{ color: "#dc2626" }}>
        Invalid or missing reset token.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success ? (
        <div className="text-center py-4">
          <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: "#5b7a5e" }} />
          <p className="text-[15px] font-[700]" style={{ color: "#3a3530" }}>Password updated!</p>
          <p className="mt-1 text-[13px]" style={{ color: "#7a7470" }}>Redirecting to login...</p>
        </div>
      ) : (
        <>
          <div>
            <label className="block text-[13px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#7a7470" }} />
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min. 8 characters"
                required
                className="w-full pl-10 pr-11 py-3 rounded-[12px] text-[14px] outline-none transition-all duration-200"
                style={{ border: "1.5px solid rgba(0,0,0,0.1)", color: "#3a3530" }}
                onFocus={(e) => (e.target.style.borderColor = "#5b7a5e")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.1)")}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: "#7a7470" }}>
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#7a7470" }} />
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                required
                className="w-full pl-10 py-3 rounded-[12px] text-[14px] outline-none transition-all duration-200"
                style={{ border: "1.5px solid rgba(0,0,0,0.1)", color: "#3a3530" }}
                onFocus={(e) => (e.target.style.borderColor = "#5b7a5e")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.1)")}
              />
            </div>
          </div>

          {error && <p className="text-[13px] font-[600]" style={{ color: "#dc2626" }}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-[12px] text-white text-[14px] font-[700] transition-all duration-300"
            style={{
              background: loading ? "#9ca3af" : "linear-gradient(135deg, #3d5a40, #5b7a5e)",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </>
      )}
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#fdf8f2" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ background: "linear-gradient(135deg, #3d5a40, #5b7a5e)" }}
          >
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-['Libre_Baskerville',serif] text-[26px] font-bold" style={{ color: "#3d5a40" }}>
            Reset Password
          </h1>
          <p className="mt-1 text-[14px]" style={{ color: "#7a7470" }}>Enter your new password below</p>
        </div>
        <div className="bg-white rounded-[24px] p-8" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
          <Suspense fallback={<p className="text-center text-[14px]" style={{ color: "#7a7470" }}>Loading...</p>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
