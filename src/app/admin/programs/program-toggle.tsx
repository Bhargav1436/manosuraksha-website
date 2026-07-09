"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProgramToggleProps {
  id: string;
  isActive: boolean;
}

export const ProgramToggle = ({ id, isActive }: ProgramToggleProps) => {
  const [active, setActive] = useState(isActive);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggle = async () => {
    setLoading(true);
    try {
      await fetch(`/api/admin/programs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !active }),
      });
      setActive(!active);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none"
      style={{
        backgroundColor: active ? "#5b7a5e" : "rgba(0,0,0,0.15)",
        opacity: loading ? 0.6 : 1,
        cursor: loading ? "not-allowed" : "pointer",
      }}
      title={active ? "Deactivate" : "Activate"}
    >
      <span
        className="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform duration-200"
        style={{ transform: active ? "translateX(18px)" : "translateX(2px)" }}
      />
    </button>
  );
};
