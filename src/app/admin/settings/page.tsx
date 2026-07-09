"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react";

export default function AdminSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (currentPassword === newPassword) {
      setError("New password must be different from current password.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Failed to change password.");
    } else {
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    setLoading(false);
  };

  const inputClass =
    "w-full pl-10 pr-11 py-3 rounded-[12px] text-[14px] outline-none transition-all duration-200";
  const inputStyle = { border: "1.5px solid rgba(0,0,0,0.1)", color: "#3a3530" };

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-6 md:p-8">
      <div className="w-full max-w-lg">
      <div className="mb-8">
        <h1 className="font-['Libre_Baskerville',serif] text-[28px] font-bold" style={{ color: "#3a3530" }}>
          Settings
        </h1>
        <p className="mt-1 text-[14px]" style={{ color: "#7a7470" }}>
          Manage your admin account security.
        </p>
      </div>

      <div className="bg-white rounded-[16px] p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <h2 className="text-[16px] font-[700] mb-5" style={{ color: "#3a3530" }}>
          Change Password
        </h2>

        {success && (
          <div
            className="flex items-center gap-2.5 p-3.5 rounded-[12px] mb-4"
            style={{ backgroundColor: "rgba(91,122,94,0.08)" }}
          >
            <CheckCircle className="w-4 h-4 shrink-0" style={{ color: "#5b7a5e" }} />
            <p className="text-[13px] font-[600]" style={{ color: "#5b7a5e" }}>
              Password updated successfully!
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-[12px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#7a7470" }} />
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                required
                className={inputClass}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#5b7a5e")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.1)")}
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: "#7a7470" }}>
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-[12px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#7a7470" }} />
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
              <button type="button" onClick={() => setShowNew(!showNew)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: "#7a7470" }}>
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-[12px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#7a7470" }} />
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
          </div>

          {error && (
            <p className="text-[13px] font-[600]" style={{ color: "#dc2626" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-[12px] text-white text-[14px] font-[700] transition-all duration-300 mt-2"
            style={{
              background: loading ? "#9ca3af" : "linear-gradient(135deg, #3d5a40, #5b7a5e)",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 4px 16px rgba(61,90,64,0.25)",
            }}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}
