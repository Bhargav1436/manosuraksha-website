"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send, CheckCircle, User } from "lucide-react";

interface Comment {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
}

interface Props {
  programSlug: string;
  accentColor: string;
}

export function ProgramComments({ programSlug, accentColor }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [form, setForm] = useState({ authorName: "", authorEmail: "", content: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/comments?programSlug=${programSlug}`)
      .then((r) => r.json())
      .then((data) => setComments(Array.isArray(data) ? data : []))
      .catch(() => setComments([]))
      .finally(() => setLoadingComments(false));
  }, [programSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, programSlug }),
    });

    if (res.ok) {
      setSubmitted(true);
      setForm({ authorName: "", authorEmail: "", content: "" });
    } else {
      const data = await res.json();
      setError(data.error ?? "Failed to submit. Please try again.");
    }
    setSubmitting(false);
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-[10px] text-[14px] outline-none transition-all duration-200 bg-[#faf6f0]";
  const inputStyle = { border: "1.5px solid rgba(0,0,0,0.08)", color: "#3a3530" };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Approved Comments */}
      {!loadingComments && comments.length > 0 && (
        <div
          className="bg-white rounded-[24px] p-8 md:p-10"
          style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5" style={{ color: accentColor }} />
            <h2 className="text-[20px] font-serif font-bold" style={{ color: "#3a3530" }}>
              What People Say
            </h2>
            <span
              className="ml-1 text-[12px] font-[700] px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: accentColor }}
            >
              {comments.length}
            </span>
          </div>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-5 rounded-[16px]"
                style={{ backgroundColor: `${accentColor}06`, border: `1px solid ${accentColor}12` }}
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${accentColor}18` }}
                  >
                    <User className="w-4 h-4" style={{ color: accentColor }} />
                  </div>
                  <div>
                    <p className="text-[13px] font-[700]" style={{ color: "#3a3530" }}>
                      {comment.authorName}
                    </p>
                    <p className="text-[11px]" style={{ color: "#a09590" }}>
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>
                <p className="text-[14px] leading-[1.75]" style={{ color: "#5a5450" }}>
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comment Form */}
      <div
        className="bg-white rounded-[24px] p-8 md:p-10"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.04)" }}
      >
        <h2 className="text-[20px] font-serif font-bold mb-1" style={{ color: "#3a3530" }}>
          Share Your Experience
        </h2>
        <p className="text-[13px] mb-6" style={{ color: "#7a7470" }}>
          Your comment will be reviewed before being published.
        </p>

        {submitted ? (
          <div
            className="flex items-start gap-3 p-4 rounded-[14px]"
            style={{ backgroundColor: `${accentColor}0d`, border: `1px solid ${accentColor}25` }}
          >
            <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: accentColor }} />
            <div>
              <p className="text-[14px] font-[700]" style={{ color: "#3a3530" }}>
                Thank you for sharing!
              </p>
              <p className="text-[13px] mt-0.5" style={{ color: "#7a7470" }}>
                Your comment has been submitted and is pending review.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>
                  Name *
                </label>
                <input
                  value={form.authorName}
                  onChange={(e) => setForm((p) => ({ ...p, authorName: e.target.value }))}
                  placeholder="Your name"
                  required
                  minLength={2}
                  maxLength={100}
                  className={inputClass}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = accentColor)}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.08)")}
                />
              </div>
              <div>
                <label className="block text-[12px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>
                  Email * <span className="font-[400] text-[#a09590]">(not published)</span>
                </label>
                <input
                  type="email"
                  value={form.authorEmail}
                  onChange={(e) => setForm((p) => ({ ...p, authorEmail: e.target.value }))}
                  placeholder="your@email.com"
                  required
                  className={inputClass}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = accentColor)}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.08)")}
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-[700] mb-1.5" style={{ color: "#3a3530" }}>
                Comment *
              </label>
              <textarea
                value={form.content}
                onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                placeholder="Share your thoughts or experience with this program..."
                required
                minLength={10}
                maxLength={1000}
                rows={4}
                className={inputClass}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => (e.target.style.borderColor = accentColor)}
                onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.08)")}
              />
              <p className="text-[11px] mt-1 text-right" style={{ color: "#a09590" }}>
                {form.content.length}/1000
              </p>
            </div>

            {error && (
              <p className="text-[13px] font-[600]" style={{ color: "#dc2626" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[10px] text-white text-[14px] font-[700] transition-all duration-200"
              style={{
                background: submitting ? "#9ca3af" : `linear-gradient(135deg, ${accentColor}cc, ${accentColor})`,
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              <Send className="w-3.5 h-3.5" />
              {submitting ? "Submitting..." : "Submit Comment"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
