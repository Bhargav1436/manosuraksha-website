"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, KeyRound, Eye, EyeOff, CheckCircle } from "lucide-react";

type Tab = "email" | "recovery";

export default function ForgotPasswordPage() {
  const [tab, setTab] = useState<Tab>("email");

  // Email tab state
  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Recovery tab state
  const [recoveryKey, setRecoveryKey] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [recoveryLoading, setRecoveryLoading] = useState(false);
  const [recoveryDone, setRecoveryDone] = useState(false);
  const [recoveryError, setRecoveryError] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);
    setEmailError("");
    const res = await fetch("/api/admin/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) setEmailError(data.error ?? "Something went wrong.");
    else setEmailSent(true);
    setEmailLoading(false);
  };

  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError("");
    if (newPassword !== confirmPassword) {
      setRecoveryError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setRecoveryError("Password must be at least 8 characters.");
      return;
    }
    setRecoveryLoading(true);
    const res = await fetch("/api/admin/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recoveryKey, newPassword }),
    });
    const data = await res.json();
    if (!res.ok) setRecoveryError(data.error ?? "Something went wrong.");
    else setRecoveryDone(true);
    setRecoveryLoading(false);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-[12px] text-[14px] outline-none transition-all duration-200";
  const inputStyle = { border: "1.5px solid rgba(0,0,0,0.1)", color: "#3a3530" };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#fdf8f2" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ background: "linear-gradient(135deg, #3d5a40, #5b7a5e)" }}
          >
            <KeyRound className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-['Libre_Baskerville',serif] text-[26px] font-bold" style={{ color: "#3d5a40" }}>
            Reset Password
          </h1>
          <p className="mt-1 text-[14px]" style={{ color: "#7a7470" }}>
            Choose a reset method below
          </p>
        </div>

        <div className="bg-white rounded-[24px] p-8" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
          {/* Tabs */}
          <div className="flex gap-2 mb-6 p-1 rounded-[12px]" style={{ backgroundColor: "#f5f0ea" }}>
            <button
              onClick={() => setTab("email")}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[10px] text-[13px] font-[700] transition-all duration-200"
              style={{
                backgroundColor: tab === "email" ? "white" : "transparent",
                color: tab === "email" ? "#3d5a40" : "#7a7470",
                boxShadow: tab === "email" ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              <Mail className="w-3.5 h-3.5" /> Via Email
            </button>
            <button
              onClick={() => setTab("recovery")}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[10px] text-[13px] font-[700] transition-all duration-200"
              style={{
                backgroundColor: tab === "recovery" ? "white" : "transparent",
                color: tab === "recovery" ? "#3d5a40" : "#7a7470",
                boxShadow: tab === "recovery" ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              <KeyRound className="w-3.5 h-3.5" /> Recovery Key
            </button>
          </div>

          {/* Email Tab */}
          {tab === "email" && (
            emailSent ? (
              <div className="text-center py-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(91,122,94,0.1)" }}
                >
                  <Mail className="w-6 h-6" style={{ color: "#5b7a5e" }} />
                </div>
                <p className="text-[15px] font-[700]" style={{ color: "#3a3530" }}>Reset link sent!</p>
                <p className="mt-2 text-[13px]" style={{ color: "#7a7470" }}>
                  Check your email for the password reset link. It expires in 15 minutes.
                </p>
                <Link href="/admin/login" className="inline-block mt-6 text-[13px] font-[600]" style={{ color: "#5b7a5e" }}>
                  ← Back to login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-[13px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>Admin Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your-email@example.com"
                    required
                    className={inputClass}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#5b7a5e")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.1)")}
                  />
                </div>
                {emailError && <p className="text-[13px] font-[600]" style={{ color: "#dc2626" }}>{emailError}</p>}
                <button
                  type="submit"
                  disabled={emailLoading}
                  className="w-full py-3.5 rounded-[12px] text-white text-[14px] font-[700] transition-all duration-300"
                  style={{
                    background: emailLoading ? "#9ca3af" : "linear-gradient(135deg, #3d5a40, #5b7a5e)",
                    cursor: emailLoading ? "not-allowed" : "pointer",
                  }}
                >
                  {emailLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            )
          )}

          {/* Recovery Key Tab */}
          {tab === "recovery" && (
            recoveryDone ? (
              <div className="text-center py-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(91,122,94,0.1)" }}
                >
                  <CheckCircle className="w-6 h-6" style={{ color: "#5b7a5e" }} />
                </div>
                <p className="text-[15px] font-[700]" style={{ color: "#3a3530" }}>Password updated!</p>
                <p className="mt-2 text-[13px]" style={{ color: "#7a7470" }}>
                  Your password has been reset. You can now log in with your new password.
                </p>
                <Link href="/admin/login" className="inline-block mt-6 text-[13px] font-[600]" style={{ color: "#5b7a5e" }}>
                  Go to login →
                </Link>
              </div>
            ) : (
              <form onSubmit={handleRecoverySubmit} className="space-y-4">
                <div
                  className="p-3 rounded-[10px] text-[12px]"
                  style={{ backgroundColor: "rgba(196,149,106,0.08)", color: "#7a5a3a" }}
                >
                  Enter the <strong>ADMIN_RECOVERY_PASSWORD</strong> from your <code>.env</code> file as the recovery key.
                </div>

                <div>
                  <label className="block text-[13px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>Recovery Key</label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      value={recoveryKey}
                      onChange={(e) => setRecoveryKey(e.target.value)}
                      placeholder="Enter recovery key"
                      required
                      className={`${inputClass} pr-11`}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "#5b7a5e")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.1)")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2"
                      style={{ color: "#7a7470" }}
                    >
                      {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>New Password</label>
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    required
                    className={inputClass}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#5b7a5e")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.1)")}
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>Confirm New Password</label>
                  <input
                    type={showNew ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    required
                    className={inputClass}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#5b7a5e")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.1)")}
                  />
                </div>

                {recoveryError && <p className="text-[13px] font-[600]" style={{ color: "#dc2626" }}>{recoveryError}</p>}

                <button
                  type="submit"
                  disabled={recoveryLoading}
                  className="w-full py-3.5 rounded-[12px] text-white text-[14px] font-[700] transition-all duration-300"
                  style={{
                    background: recoveryLoading ? "#9ca3af" : "linear-gradient(135deg, #3d5a40, #5b7a5e)",
                    cursor: recoveryLoading ? "not-allowed" : "pointer",
                  }}
                >
                  {recoveryLoading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )
          )}

          {!emailSent && !recoveryDone && (
            <Link
              href="/admin/login"
              className="flex items-center justify-center gap-1.5 mt-5 text-[13px] font-[600]"
              style={{ color: "#7a7470" }}
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
