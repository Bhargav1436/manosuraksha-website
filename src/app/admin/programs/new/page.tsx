"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, ImageOff } from "lucide-react";
import Link from "next/link";

export default function NewProgramPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
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

  useEffect(() => {
    fetch("/api/admin/programs")
      .then((r) => r.json())
      .then((programs: { displayOrder?: number }[]) => {
        const max = programs.reduce((m, p) => Math.max(m, p.displayOrder ?? 0), 0);
        setForm((prev) => ({ ...prev, displayOrder: String(max + 1) }));
      })
      .catch(() => {});
  }, []);

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

    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();

    if (res.ok) {
      setForm((prev) => ({ ...prev, image: data.path }));
    } else {
      setError(data.error ?? "Upload failed.");
      setPreviewUrl(null);
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const conditions = form.conditions
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    const res = await fetch("/api/admin/programs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        conditions,
        displayOrder: Number(form.displayOrder) || 0,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to create program.");
      setLoading(false);
      return;
    }

    router.push("/admin/programs");
    router.refresh();
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-[10px] text-[14px] outline-none transition-all duration-200 border border-[rgba(0,0,0,0.1)] focus:border-[#5b7a5e] bg-white";

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl">
      <div className="mb-6">
        <Link
          href="/admin/programs"
          className="inline-flex items-center gap-1.5 text-[13px] font-[600] mb-4 hover:underline"
          style={{ color: "#5b7a5e" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Programs
        </Link>
        <h1
          className="font-['Libre_Baskerville',serif] text-[22px] md:text-[26px] font-bold"
          style={{ color: "#3a3530" }}
        >
          Add New Program
        </h1>
      </div>

      <div
        className="bg-white rounded-[16px] p-5 md:p-6"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Image Upload */}
          <div>
            <label className="block text-[12px] font-[700] mb-2" style={{ color: "#3a3530" }}>Program Photo</label>

            <div
              className="relative w-full h-44 rounded-[12px] overflow-hidden mb-3 cursor-pointer group"
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
                  <Upload className="w-7 h-7" style={{ color: "#c4b8b0" }} />
                  <p className="text-[13px] font-[600]" style={{ color: "#7a7470" }}>Click to upload photo</p>
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
            <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Mind-Insight Program" className={inputClass} style={{ color: "#3a3530" }} />
          </div>

          <div>
            <label className="block text-[12px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>
              Slug * <span className="font-[400] text-[#7a7470]">(URL-friendly, e.g. mind-insight)</span>
            </label>
            <input name="slug" value={form.slug} onChange={handleChange} required placeholder="mind-insight" className={inputClass} style={{ color: "#3a3530" }} />
          </div>

          <div>
            <label className="block text-[12px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>Subtitle</label>
            <input name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Short tagline" className={inputClass} style={{ color: "#3a3530" }} />
          </div>

          <div>
            <label className="block text-[12px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Full program description..."
              className={inputClass}
              style={{ color: "#3a3530", resize: "vertical" }}
            />
          </div>

          <div>
            <label className="block text-[12px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>
              Conditions <span className="font-[400] text-[#7a7470]">(comma-separated)</span>
            </label>
            <input name="conditions" value={form.conditions} onChange={handleChange} placeholder="Depression, Anxiety, OCD" className={inputClass} style={{ color: "#3a3530" }} />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-[12px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>Display Order</label>
              <input type="number" name="displayOrder" value={form.displayOrder} onChange={handleChange} className={inputClass} style={{ color: "#3a3530" }} />
            </div>
            <div className="flex items-center gap-2 mt-5">
              <input type="checkbox" name="isActive" id="isActive" checked={form.isActive} onChange={handleChange} className="w-4 h-4 accent-[#5b7a5e]" />
              <label htmlFor="isActive" className="text-[13px] font-[600]" style={{ color: "#3a3530" }}>Active</label>
            </div>
          </div>

          {error && (
            <p className="text-[13px] font-[600]" style={{ color: "#dc2626" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full py-3 rounded-[10px] text-white text-[14px] font-[700] transition-all duration-200"
            style={{
              background: (loading || uploading) ? "#9ca3af" : "linear-gradient(135deg, #3d5a40, #5b7a5e)",
              cursor: (loading || uploading) ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creating..." : uploading ? "Uploading photo..." : "Create Program"}
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}
