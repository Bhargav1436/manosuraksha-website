"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, ImageOff, Upload, Trash2 } from "lucide-react";
import Link from "next/link";
import { ProgramToggle } from "./program-toggle";

interface Program {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  description: string | null;
  image: string | null;
  conditions: string[];
  isActive: boolean;
  displayOrder: number;
}

interface Props {
  programs: Program[];
}

export const ProgramsClient = ({ programs }: Props) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [deletingProgram, setDeletingProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    subtitle: "",
    description: "",
    image: "",
    conditions: "",
    isActive: true,
    displayOrder: "0",
  });

  const openEdit = (program: Program) => {
    setError("");
    setSuccess(false);
    // Use saved image path, or fall back to slug-based path for existing programs
    const imagePath = program.image || `/images/programs/${program.slug}.png`;
    setPreviewUrl(imagePath);
    setForm({
      title: program.title,
      slug: program.slug,
      subtitle: program.subtitle ?? "",
      description: program.description ?? "",
      image: program.image ?? "",
      conditions: program.conditions.join(", "),
      isActive: program.isActive,
      displayOrder: String(program.displayOrder),
    });
    setEditingProgram(program);
  };

  const closeEdit = () => {
    setEditingProgram(null);
    setError("");
    setSuccess(false);
    setPreviewUrl(null);
  };

  const handleDelete = async () => {
    if (!deletingProgram) return;
    setDeleting(true);
    await fetch(`/api/admin/programs/${deletingProgram.id}`, { method: "DELETE" });
    setDeletingProgram(null);
    setDeleting(false);
    router.refresh();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      if (name === "image") setPreviewUrl(value || null);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show instant local preview
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    // Upload to server
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();

    if (res.ok) {
      setForm((prev) => ({ ...prev, image: data.path }));
    } else {
      setError(data.error ?? "Upload failed.");
      setPreviewUrl(form.image || null);
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgram) return;
    setLoading(true);
    setError("");
    setSuccess(false);

    const conditions = form.conditions
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    const res = await fetch(`/api/admin/programs/${editingProgram.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        slug: form.slug,
        subtitle: form.subtitle,
        description: form.description,
        image: form.image,
        conditions,
        isActive: form.isActive,
        displayOrder: Number(form.displayOrder) || 0,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Failed to update program.");
    } else {
      setSuccess(true);
      router.refresh();
      setTimeout(closeEdit, 900);
    }
    setLoading(false);
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-[10px] text-[14px] outline-none transition-all duration-200 border border-[rgba(0,0,0,0.1)] focus:border-[#5b7a5e] bg-white";

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1
            className="font-['Libre_Baskerville',serif] text-[22px] md:text-[28px] font-bold"
            style={{ color: "#3a3530" }}
          >
            Programs
          </h1>
          <p className="mt-1 text-[13px] md:text-[14px]" style={{ color: "#7a7470" }}>
            Manage all programs — activate, deactivate, or add new ones.
          </p>
        </div>
        <Link
          href="/admin/programs/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[13px] font-[700] transition-all duration-300 hover:opacity-90 self-start sm:self-auto"
          style={{
            background: "linear-gradient(135deg, #3d5a40, #5b7a5e)",
            boxShadow: "0 4px 16px rgba(61,90,64,0.25)",
          }}
        >
          <Plus className="w-4 h-4" />
          Add Program
        </Link>
      </div>

      {/* Desktop Table */}
      <div
        className="bg-white rounded-[16px] overflow-hidden hidden md:block"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
      >
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <th className="text-left px-6 py-4 text-[12px] font-[700] uppercase tracking-wide" style={{ color: "#7a7470" }}>Program</th>
              <th className="text-left px-6 py-4 text-[12px] font-[700] uppercase tracking-wide" style={{ color: "#7a7470" }}>Slug</th>
              <th className="text-left px-6 py-4 text-[12px] font-[700] uppercase tracking-wide" style={{ color: "#7a7470" }}>Status</th>
              <th className="text-left px-6 py-4 text-[12px] font-[700] uppercase tracking-wide" style={{ color: "#7a7470" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program, index) => (
              <tr
                key={program.id}
                style={{ borderBottom: index < programs.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none" }}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {program.image ? (
                      <div className="w-10 h-10 rounded-[8px] overflow-hidden shrink-0" style={{ background: "#faf6f0" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-[8px] flex items-center justify-center shrink-0" style={{ background: "#faf6f0" }}>
                        <ImageOff className="w-4 h-4" style={{ color: "#c4b8b0" }} />
                      </div>
                    )}
                    <div>
                      <p className="text-[14px] font-[700]" style={{ color: "#3a3530" }}>{program.title}</p>
                      {program.subtitle && (
                        <p className="text-[12px] mt-0.5 truncate max-w-[220px]" style={{ color: "#7a7470" }}>{program.subtitle}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[12px] font-[600] px-2.5 py-1 rounded-full" style={{ backgroundColor: "#fdf8f2", color: "#7a7470" }}>
                    {program.slug}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className="text-[12px] font-[600] px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: program.isActive ? "rgba(91,122,94,0.1)" : "rgba(220,38,38,0.08)",
                      color: program.isActive ? "#5b7a5e" : "#dc2626",
                    }}
                  >
                    {program.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <ProgramToggle id={program.id} isActive={program.isActive} />
                    <button
                      onClick={() => openEdit(program)}
                      className="text-[13px] font-[600] px-3 py-1 rounded-[8px] transition-colors"
                      style={{ color: "#5b7a5e", background: "rgba(91,122,94,0.08)" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingProgram(program)}
                      className="flex items-center justify-center w-7 h-7 rounded-[7px] transition-colors hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" style={{ color: "#dc2626" }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {programs.map((program) => (
          <div
            key={program.id}
            className="bg-white rounded-[14px] p-4"
            style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
          >
            <div className="flex items-start gap-3">
              {program.image ? (
                <div className="w-12 h-12 rounded-[8px] overflow-hidden shrink-0" style={{ background: "#faf6f0" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-[8px] flex items-center justify-center shrink-0" style={{ background: "#faf6f0" }}>
                  <ImageOff className="w-4 h-4" style={{ color: "#c4b8b0" }} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[14px] font-[700] truncate" style={{ color: "#3a3530" }}>{program.title}</p>
                  <span
                    className="shrink-0 text-[11px] font-[600] px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: program.isActive ? "rgba(91,122,94,0.1)" : "rgba(220,38,38,0.08)",
                      color: program.isActive ? "#5b7a5e" : "#dc2626",
                    }}
                  >
                    {program.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                {program.subtitle && (
                  <p className="text-[12px] mt-0.5 truncate" style={{ color: "#7a7470" }}>{program.subtitle}</p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
              <ProgramToggle id={program.id} isActive={program.isActive} />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEdit(program)}
                  className="text-[13px] font-[600] px-4 py-1.5 rounded-[8px]"
                  style={{ color: "#5b7a5e", background: "rgba(91,122,94,0.08)" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeletingProgram(program)}
                  className="flex items-center justify-center w-8 h-8 rounded-[8px] hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" style={{ color: "#dc2626" }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingProgram && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999 }}
          onClick={(e) => { if (e.target === e.currentTarget) setDeletingProgram(null); }}
        >
          <div className="bg-white rounded-[20px] w-full max-w-sm p-6" style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.22)" }}>
            <div className="flex items-center justify-center w-12 h-12 rounded-full mb-4 mx-auto" style={{ background: "rgba(220,38,38,0.08)" }}>
              <Trash2 className="w-5 h-5" style={{ color: "#dc2626" }} />
            </div>
            <h2 className="text-[18px] font-[700] text-center mb-1" style={{ color: "#3a3530" }}>Delete Program?</h2>
            <p className="text-[13px] text-center mb-6" style={{ color: "#7a7470" }}>
              <strong>{deletingProgram.title}</strong> will be permanently deleted. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingProgram(null)}
                className="flex-1 py-2.5 rounded-[10px] text-[14px] font-[600]"
                style={{ border: "1.5px solid rgba(0,0,0,0.1)", color: "#7a7470" }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-[10px] text-white text-[14px] font-[600]"
                style={{ background: deleting ? "#f87171" : "#dc2626", cursor: deleting ? "not-allowed" : "pointer" }}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingProgram && (
        <div
          className="fixed inset-0 flex items-center justify-center p-3 sm:p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999 }}
          onClick={(e) => { if (e.target === e.currentTarget) closeEdit(); }}
        >
          <div
            className="bg-white rounded-[20px] w-full max-w-lg sm:max-w-2xl max-h-[92vh] overflow-y-auto"
            style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.22)" }}
          >
            {/* Modal Header */}
            <div
              className="flex items-center justify-between px-5 sm:px-6 py-4 sticky top-0 bg-white rounded-t-[20px]"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", zIndex: 1 }}
            >
              <div>
                <h2 className="font-['Libre_Baskerville',serif] text-[18px] sm:text-[20px] font-bold" style={{ color: "#3a3530" }}>
                  Edit Program
                </h2>
                <p className="text-[12px] mt-0.5 truncate max-w-[200px] sm:max-w-none" style={{ color: "#7a7470" }}>
                  {editingProgram.title}
                </p>
              </div>
              <button
                onClick={closeEdit}
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-2"
                style={{ background: "rgba(0,0,0,0.07)" }}
              >
                <X className="w-4 h-4" style={{ color: "#7a7470" }} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-5 sm:px-6 py-5 space-y-4">
              {/* Image Section */}
              <div>
                <label className="block text-[12px] font-[700] mb-2" style={{ color: "#3a3530" }}>Program Photo</label>

                {/* Preview */}
                <div
                  className="relative w-full h-40 rounded-[12px] overflow-hidden mb-3 cursor-pointer group"
                  style={{ background: "#faf6f0", border: "2px dashed rgba(0,0,0,0.1)" }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {previewUrl ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-[13px] font-[600] flex items-center gap-2">
                          <Upload className="w-4 h-4" /> Change Photo
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                      <Upload className="w-6 h-6" style={{ color: "#c4b8b0" }} />
                      <p className="text-[12px] font-[600]" style={{ color: "#7a7470" }}>Click to upload photo</p>
                      <p className="text-[11px]" style={{ color: "#c4b8b0" }}>Any image format, up to 5MB</p>
                    </div>
                  )}
                  {uploading && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                      <p className="text-[13px] font-[600]" style={{ color: "#5b7a5e" }}>Uploading...</p>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="Or paste image path: /images/programs/..."
                  className={inputClass}
                  style={{ color: "#3a3530", fontSize: "12px" }}
                />
              </div>

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
                  rows={4}
                  className={inputClass}
                  style={{ color: "#3a3530", resize: "vertical" }}
                />
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
                    id="editIsActive"
                    checked={form.isActive}
                    onChange={handleChange}
                    className="w-4 h-4 accent-[#5b7a5e]"
                  />
                  <label htmlFor="editIsActive" className="text-[13px] font-[600]" style={{ color: "#3a3530" }}>
                    Active
                  </label>
                </div>
              </div>

              {error && <p className="text-[13px] font-[600]" style={{ color: "#dc2626" }}>{error}</p>}
              {success && <p className="text-[13px] font-[600]" style={{ color: "#5b7a5e" }}>Saved successfully!</p>}

              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  disabled={loading || uploading}
                  className="flex-1 py-3 rounded-[10px] text-white text-[14px] font-[700] transition-all duration-200"
                  style={{
                    background: (loading || uploading) ? "#9ca3af" : "linear-gradient(135deg, #3d5a40, #5b7a5e)",
                    cursor: (loading || uploading) ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Saving..." : uploading ? "Uploading..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={closeEdit}
                  className="px-6 py-3 rounded-[10px] text-[14px] font-[700]"
                  style={{ border: "1.5px solid rgba(0,0,0,0.1)", color: "#7a7470", background: "white" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
