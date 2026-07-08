"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, AlertCircle } from "lucide-react";
import { contactFormSchema, type ContactFormSchema } from "@/lib/validators";
import { cn } from "@/lib/utils";
import { SuccessAnimation } from "@/components/shared/success-animation";

export const ContactForm = () => {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: undefined,
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormSchema) => {
    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 429) {
        setSubmitStatus("error");
        setErrorMessage(
          "Too many requests. Please wait a moment and try again."
        );
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        setSubmitStatus("error");
        setErrorMessage(
          errorData?.error || "Something went wrong. Please try again."
        );
        return;
      }

      setSubmitStatus("success");
      reset();
    } catch {
      setSubmitStatus("error");
      setErrorMessage(
        "Unable to submit the form. Please check your connection and try again."
      );
    }
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#3a3530",
    marginBottom: 6,
    display: "block",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: 14,
    border: "1px solid rgba(91,122,94,0.12)",
    backgroundColor: "#ffffff",
    padding: "12px 16px",
    fontSize: 14,
    color: "#3a3530",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  if (submitStatus === "success") {
    return (
      <div
        className="rounded-[24px] text-center"
        style={{
          backgroundColor: "#fdf8f2",
          padding: 36,
        }}
      >
        <div className="mx-auto mb-4">
          <SuccessAnimation size={72} color="#5b7a5e" />
        </div>
        <h3
          className="font-['Libre_Baskerville',serif] mb-3"
          style={{ fontSize: 22, color: "#3d5a40" }}
        >
          Thank You!
        </h3>
        <p
          className="max-w-md mx-auto"
          style={{ fontSize: 16, color: "#7a7470", lineHeight: 1.8 }}
        >
          We&apos;ll reach back to you soon to book your appointment.
        </p>
        <button
          type="button"
          onClick={() => setSubmitStatus("idle")}
          className="mt-6 underline underline-offset-4"
          style={{
            color: "#5b7a5e",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div
      className="rounded-[24px]"
      style={{
        background: "linear-gradient(145deg, #f5ede4, #fdf8f2, #f0e8de)",
        padding: 36,
        border: "1px solid rgba(196,149,106,0.2)",
        boxShadow: "0 8px 32px rgba(196,149,106,0.12), 0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div
        className="rounded-[16px] mb-6"
        style={{
          background: "linear-gradient(135deg, #3d5a40, #5b7a5e)",
          padding: "20px 24px",
        }}
      >
        <h3
          className="font-['Libre_Baskerville',serif] text-white"
          style={{ fontSize: 22 }}
        >
          Book an Appointment
        </h3>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
          Fill in your details and we&apos;ll get back to you shortly
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Row 1: Name + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label htmlFor="name" style={labelStyle}>
              Full Name <span style={{ color: "#e53e3e" }}>*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              style={inputStyle}
              className="focus:!border-[#5b7a5e] placeholder:text-[#7a7470]/50"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1.5 flex items-center gap-1" style={{ fontSize: 12, color: "#e53e3e" }}>
                <AlertCircle style={{ width: 14, height: 14 }} />
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="phone" style={labelStyle}>
              Phone Number <span style={{ color: "#e53e3e" }}>*</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              style={inputStyle}
              className="focus:!border-[#5b7a5e] placeholder:text-[#7a7470]/50"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="mt-1.5 flex items-center gap-1" style={{ fontSize: 12, color: "#e53e3e" }}>
                <AlertCircle style={{ width: 14, height: 14 }} />
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Email + Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label htmlFor="email" style={labelStyle}>
              Email Address <span style={{ color: "#e53e3e" }}>*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              style={inputStyle}
              className="focus:!border-[#5b7a5e] placeholder:text-[#7a7470]/50"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1.5 flex items-center gap-1" style={{ fontSize: 12, color: "#e53e3e" }}>
                <AlertCircle style={{ width: 14, height: 14 }} />
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="gender" style={labelStyle}>
              Gender <span style={{ color: "#e53e3e" }}>*</span>
            </label>
            <select
              id="gender"
              style={{
                ...inputStyle,
                appearance: "none",
                cursor: "pointer",
              }}
              className="focus:!border-[#5b7a5e]"
              defaultValue=""
              {...register("gender")}
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to specify</option>
            </select>
            {errors.gender && (
              <p className="mt-1.5 flex items-center gap-1" style={{ fontSize: 12, color: "#e53e3e" }}>
                <AlertCircle style={{ width: 14, height: 14 }} />
                {errors.gender.message}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="mb-5">
          <label htmlFor="message" style={labelStyle}>
            Message <span style={{ color: "#e53e3e" }}>*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Tell us how we can help you..."
            style={{
              ...inputStyle,
              resize: "vertical",
            }}
            className="focus:!border-[#5b7a5e] placeholder:text-[#7a7470]/50"
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1.5 flex items-center gap-1" style={{ fontSize: 12, color: "#e53e3e" }}>
              <AlertCircle style={{ width: 14, height: 14 }} />
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Error Message */}
        {submitStatus === "error" && errorMessage && (
          <div
            className="flex items-start gap-3 mb-5"
            style={{
              borderRadius: 14,
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              padding: 16,
            }}
          >
            <AlertCircle
              className="flex-shrink-0 mt-0.5"
              style={{ width: 20, height: 20, color: "#ef4444" }}
            />
            <p style={{ fontSize: 13, color: "#b91c1c" }}>{errorMessage}</p>
          </div>
        )}

        {/* Submit Button - Warm Gradient */}
        <button
          type="submit"
          disabled={submitStatus === "loading"}
          className="w-full inline-flex items-center justify-center text-white disabled:opacity-50 disabled:pointer-events-none"
          style={{
            background: "linear-gradient(135deg, #c4956a, #dbb894)",
            borderRadius: 14,
            fontSize: 14,
            fontWeight: 700,
            padding: "14px 24px",
            boxShadow: "0 4px 15px rgba(196,149,106,0.3)",
            transition: "all 0.3s ease",
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            if (submitStatus !== "loading") {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 25px rgba(196,149,106,0.4)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 4px 15px rgba(196,149,106,0.3)";
          }}
        >
          {submitStatus === "loading" ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>

        {/* Privacy Note */}
        <p
          className="text-center mt-4"
          style={{ fontSize: 13, color: "#7a7470", lineHeight: 1.6 }}
        >
          Your privacy is our priority. We will reach back to you very soon to
          book an appointment.
        </p>
      </form>
    </div>
  );
};
