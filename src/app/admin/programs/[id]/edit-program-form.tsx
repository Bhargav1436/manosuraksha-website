"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Program } from "@prisma/client";

interface Props {
  program: Program;
}

export const EditProgramForm = ({ program }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    title: program.title,
    slug: program.slug,
    subtitle: program.subtitle ?? "",
    description: program.description ?? "",
    image: program.image ?? "",
    conditions: (program.conditions ?? []).join(", "),
    isActive: program.isActive ?? true,
    displayOrder: program.displayOrder ?? 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const conditions = form.conditions
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    const res = await fetch(`/api/admin/programs/${program.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, conditions }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to update program.");
    } else {
      setSuccess(true);
      router.refresh();
    }
    setLoading(false);
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-[10px] text-[14px] outline-none transition-all duration-200 border border-[rgba(0,0,0,0.1)] focus:border-[#5b7a5e]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[12px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>Title *</label>
        <input name="title" value={form.title} onChange={handleChange} required className={inputClass} style={{ color: "#3a3530" }} />
      </div>

      <div>
        <label className="block text-[12px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>
          Slug * <span className="font-[400] text-[#7a7470]">(URL-friendly)</span>
        </label>
        <input name="slug" value={form.slug} onChange={handleChange} required className={inputClass} style={{ color: "#3a3530" }} />
      </div>

      <div>
        <label className="block text-[12px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>Subtitle</label>
        <input name="subtitle" value={form.subtitle} onChange={handleChange} className={inputClass} style={{ color: "#3a3530" }} />
      </div>

      <div>
        <label className="block text-[12px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          className={inputClass}
          style={{ color: "#3a3530", resize: "vertical" }}
        />
      </div>

      <div>
        <label className="block text-[12px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>Image Path</label>
        <input name="image" value={form.image} onChange={handleChange} className={inputClass} style={{ color: "#3a3530" }} />
      </div>

      <div>
        <label className="block text-[12px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>
          Conditions <span className="font-[400] text-[#7a7470]">(comma-separated)</span>
        </label>
        <input name="conditions" value={form.conditions} onChange={handleChange} className={inputClass} style={{ color: "#3a3530" }} />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-[12px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>Display Order</label>
          <input
            type="number"
            name="displayOrder"
            value={form.displayOrder}
            onChange={handleChange}
            className={inputClass}
            style={{ color: "#3a3530" }}
          />
        </div>
        <div className="flex items-center gap-2 mt-5">
          <input
            type="checkbox"
            name="isActive"
            id="isActive"
            checked={form.isActive}
            onChange={handleChange}
            className="w-4 h-4 accent-[#5b7a5e]"
          />
          <label htmlFor="isActive" className="text-[13px] font-[600]" style={{ color: "#3a3530" }}>
            Active
          </label>
        </div>
      </div>

      {error && (
        <p className="text-[13px] font-[600]" style={{ color: "#dc2626" }}>{error}</p>
      )}
      {success && (
        <p className="text-[13px] font-[600]" style={{ color: "#5b7a5e" }}>Program updated successfully!</p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 rounded-[10px] text-white text-[14px] font-[700] transition-all duration-200"
          style={{
            background: loading ? "#9ca3af" : "linear-gradient(135deg, #3d5a40, #5b7a5e)",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/programs")}
          className="px-6 py-3 rounded-[10px] text-[14px] font-[700] transition-all duration-200"
          style={{
            border: "1.5px solid rgba(0,0,0,0.1)",
            color: "#7a7470",
            background: "white",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
