"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Trash2 } from "lucide-react";

interface CommentActionsProps {
  id: string;
  status: string;
}

export const CommentActions = ({ id, status }: CommentActionsProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const update = async (newStatus: string) => {
    setLoading(true);
    await fetch(`/api/admin/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    router.refresh();
    setLoading(false);
  };

  const remove = async () => {
    if (!confirm("Delete this comment permanently?")) return;
    setLoading(true);
    await fetch(`/api/admin/comments/${id}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-2 shrink-0">
      {status !== "approved" && (
        <button
          onClick={() => update("approved")}
          disabled={loading}
          title="Approve"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-[700] transition-all duration-200 hover:opacity-80"
          style={{ backgroundColor: "rgba(91,122,94,0.1)", color: "#5b7a5e" }}
        >
          <Check className="w-3.5 h-3.5" />
          Approve
        </button>
      )}
      {status !== "rejected" && (
        <button
          onClick={() => update("rejected")}
          disabled={loading}
          title="Reject"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-[700] transition-all duration-200 hover:opacity-80"
          style={{ backgroundColor: "rgba(220,38,38,0.08)", color: "#dc2626" }}
        >
          <X className="w-3.5 h-3.5" />
          Reject
        </button>
      )}
      <button
        onClick={remove}
        disabled={loading}
        title="Delete"
        className="p-1.5 rounded-full transition-all duration-200 hover:opacity-80"
        style={{ backgroundColor: "rgba(0,0,0,0.05)", color: "#7a7470" }}
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
