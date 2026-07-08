"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Video,
  Phone,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Star,
} from "lucide-react";
import { SuccessAnimation } from "@/components/shared/success-animation";
import { Button } from "@/components/ui/button";
import {
  getAvailableSlots,
  bookAppointment,
} from "@/lib/api/booking-client";
import { consultationModes } from "@/data/mock/booking-data";
import { getNext7Days, formatDateLabel } from "@/data/mock/booking-data";
import type { TeamMember, BookingSlot } from "@/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BookingModalProps {
  doctor: TeamMember;
  onClose: () => void;
}

type Step = "mode" | "datetime" | "details" | "success";

const STEP_ORDER: Step[] = ["mode", "datetime", "details"];

const modeIconMap: Record<string, typeof MapPin> = {
  MapPin,
  Video,
  Phone,
};

const stepLabels: Record<Step, string> = {
  mode: "Mode",
  datetime: "Date & Time",
  details: "Your Details",
  success: "Done",
};

// ---------------------------------------------------------------------------
// BookingModal
// ---------------------------------------------------------------------------

export function BookingModal({ doctor, onClose }: BookingModalProps) {
  const [step, setStep] = useState<Step>("mode");
  const [direction, setDirection] = useState(1);

  // Booking state
  const [mode, setMode] = useState<"in-person" | "video" | "audio">(
    doctor.availableModes[0] || "in-person"
  );
  const [selectedDate, setSelectedDate] = useState(getNext7Days()[0]);
  const [slots, setSlots] = useState<BookingSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");

  // Patient form
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("");

  // Submission
  const [submitting, setSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [formError, setFormError] = useState("");

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Fetch slots when entering datetime step or date changes
  useEffect(() => {
    if (step !== "datetime") return;
    setSlotsLoading(true);
    setSelectedSlot("");
    getAvailableSlots(doctor.id, selectedDate).then((data) => {
      setSlots(data);
      setSlotsLoading(false);
    });
  }, [doctor.id, selectedDate, step]);

  const goNext = useCallback(() => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx < STEP_ORDER.length - 1) {
      setDirection(1);
      setStep(STEP_ORDER[idx + 1]);
    }
  }, [step]);

  const goBack = useCallback(() => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx > 0) {
      setDirection(-1);
      setStep(STEP_ORDER[idx - 1]);
    }
  }, [step]);

  const handleSubmit = useCallback(async () => {
    setFormError("");

    if (!patientName.trim() || patientName.trim().length < 2) {
      setFormError("Please enter a valid name (at least 2 characters).");
      return;
    }
    if (!/^[+]?[\d\s-]{10,15}$/.test(patientPhone)) {
      setFormError("Please enter a valid phone number.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientEmail)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    const age = parseInt(patientAge, 10);
    if (!age || age < 1 || age > 120) {
      setFormError("Please enter a valid age (1-120).");
      return;
    }
    if (!patientGender) {
      setFormError("Please select a gender.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await bookAppointment({
        professionalId: doctor.id,
        date: selectedDate,
        time: selectedSlot,
        mode,
        patientName: patientName.trim(),
        patientPhone,
        patientEmail,
        patientAge: age,
        patientGender,
      });
      setBookingId(result.bookingId);
      setDirection(1);
      setStep("success");
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [
    doctor.id,
    selectedDate,
    selectedSlot,
    mode,
    patientName,
    patientPhone,
    patientEmail,
    patientAge,
    patientGender,
  ]);

  const currentStepIdx = STEP_ORDER.indexOf(step);
  const next7Days = getNext7Days();

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-white rounded-2xl sm:rounded-3xl w-[calc(100%-24px)] sm:w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white rounded-t-3xl border-b border-[#e8e0d4] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#e8e0d4] shrink-0">
              <Image
                src={doctor.imageSrc}
                alt={doctor.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-[#3a3530] text-sm truncate">
                {doctor.name}
              </p>
              <p className="text-xs text-[#7a7470] flex items-center gap-1">
                <Star className="w-3 h-3 fill-[#c4956a] text-[#c4956a]" />
                {doctor.rating}
                <span className="mx-1">|</span>
                ₹{doctor.price.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#fdf8f2] flex items-center justify-center hover:bg-[#e8e0d4] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-[#7a7470]" />
          </button>
        </div>

        {/* Progress indicator */}
        {step !== "success" && (
          <div className="px-6 pt-4">
            <div className="flex items-center gap-1">
              {STEP_ORDER.map((s, i) => (
                <div key={s} className="flex items-center gap-1 flex-1">
                  <div
                    className={`h-1.5 rounded-full flex-1 transition-colors duration-300 ${
                      i <= currentStepIdx ? "bg-[#5b7a5e]" : "bg-[#e8e0d4]"
                    }`}
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-[#7a7470] mt-2 font-medium">
              Step {currentStepIdx + 1} of {STEP_ORDER.length}:{" "}
              {stepLabels[step]}
            </p>
          </div>
        )}

        {/* Step content */}
        <div className="px-6 py-5 min-h-[320px]">
          <AnimatePresence mode="wait" custom={direction}>
            {/* Step 1: Mode */}
            {step === "mode" && (
              <motion.div
                key="mode"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-bold text-[#3a3530] font-[var(--font-serif)]">
                  Choose Consultation Mode
                </h3>
                <div className="space-y-3">
                  {consultationModes
                    .filter((cm) => doctor.availableModes.includes(cm.id))
                    .map((cm) => {
                      const IconComp = modeIconMap[cm.icon];
                      return (
                        <button
                          key={cm.id}
                          onClick={() => setMode(cm.id)}
                          className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                            mode === cm.id
                              ? "border-[#5b7a5e] bg-[#5b7a5e]/5"
                              : "border-[#e8e0d4] hover:border-[#5b7a5e]/30"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              mode === cm.id
                                ? "bg-[#5b7a5e] text-white"
                                : "bg-[#fdf8f2] text-[#7a7470]"
                            }`}
                          >
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-[#3a3530]">
                              {cm.label}
                            </p>
                            <p className="text-xs text-[#7a7470]">
                              {cm.id === "in-person"
                                ? "Visit the clinic in Jayanagar, Bengaluru"
                                : cm.id === "video"
                                  ? "Face-to-face via secure video link"
                                  : "Consultation over phone call"}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Date & Time */}
            {step === "datetime" && (
              <motion.div
                key="datetime"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <h3 className="text-lg font-bold text-[#3a3530] font-[var(--font-serif)]">
                  Pick Date & Time
                </h3>

                {/* Date cards */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {next7Days.map((day) => {
                    const date = new Date(day + "T00:00:00");
                    const dayNum = date.getDate();
                    const label = formatDateLabel(day);
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDate(day)}
                        className={`shrink-0 flex flex-col items-center px-3 py-2.5 rounded-2xl text-sm transition-all cursor-pointer min-w-[64px] ${
                          selectedDate === day
                            ? "bg-[#5b7a5e] text-white shadow-md"
                            : "bg-[#fdf8f2] text-[#7a7470] hover:bg-[#5b7a5e]/10 border border-[#e8e0d4]"
                        }`}
                      >
                        <span className="text-xs font-medium">{label}</span>
                        <span className="text-base font-bold mt-0.5">
                          {dayNum}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Slots */}
                {slotsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-[#5b7a5e]" />
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot.time)}
                        className={`px-2 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          !slot.available
                            ? "bg-[#e8e0d4]/50 text-[#7a7470]/40 cursor-not-allowed line-through"
                            : selectedSlot === slot.time
                              ? "bg-[#c4956a] text-white shadow-md"
                              : "bg-[#fdf8f2] text-[#3a3530] hover:bg-[#c4956a]/10 border border-[#e8e0d4]"
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 3: Patient Details */}
            {step === "details" && (
              <motion.div
                key="details"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-bold text-[#3a3530] font-[var(--font-serif)]">
                  Your Details
                </h3>

                {/* Summary card */}
                <div className="bg-[#fdf8f2] rounded-2xl p-3 text-sm">
                  <p className="font-semibold text-[#3a3530]">
                    {formatDateLabel(selectedDate)}, {selectedSlot}
                  </p>
                  <p className="text-[#7a7470] capitalize">
                    {mode === "in-person" ? "In-Person" : mode} | ₹
                    {doctor.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <ModalInput
                  label="Full Name"
                  value={patientName}
                  onChange={setPatientName}
                  placeholder="Enter your full name"
                />
                <ModalInput
                  label="Phone Number"
                  value={patientPhone}
                  onChange={setPatientPhone}
                  placeholder="+91 XXXXX XXXXX"
                  type="tel"
                />
                <ModalInput
                  label="Email Address"
                  value={patientEmail}
                  onChange={setPatientEmail}
                  placeholder="you@example.com"
                  type="email"
                />
                <div className="grid grid-cols-2 gap-3">
                  <ModalInput
                    label="Age"
                    value={patientAge}
                    onChange={setPatientAge}
                    placeholder="25"
                    type="number"
                  />
                  <div>
                    <label className="block text-sm font-semibold text-[#3a3530] mb-1">
                      Gender
                    </label>
                    <select
                      value={patientGender}
                      onChange={(e) => setPatientGender(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#e8e0d4] bg-white text-sm text-[#3a3530] focus:outline-none focus:ring-2 focus:ring-[#5b7a5e]/40 transition-all cursor-pointer"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>
                </div>

                {formError && (
                  <p className="text-sm text-red-600 font-medium">
                    {formError}
                  </p>
                )}
              </motion.div>
            )}

            {/* Success */}
            {step === "success" && (
              <motion.div
                key="success"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
                className="text-center py-6"
              >
                <div className="mx-auto mb-4">
                  <SuccessAnimation size={72} color="#5b7a5e" />
                </div>
                <h3 className="text-2xl font-bold text-[#3a3530] font-[var(--font-serif)]">
                  Appointment Booked!
                </h3>
                <p className="mt-3 text-[#7a7470]">
                  Booking ID:{" "}
                  <span className="font-bold text-[#3a3530]">{bookingId}</span>
                </p>
                <p className="mt-2 text-[#7a7470]">
                  We will send a confirmation to your email.
                </p>
                <Button
                  variant="primary"
                  className="mt-6"
                  onClick={onClose}
                >
                  Done
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer navigation */}
        {step !== "success" && (
          <div className="sticky bottom-0 bg-white border-t border-[#e8e0d4] rounded-b-3xl px-6 py-4 flex items-center justify-between">
            {currentStepIdx > 0 ? (
              <button
                onClick={goBack}
                className="flex items-center gap-1.5 text-sm font-semibold text-[#7a7470] hover:text-[#3a3530] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            {step === "details" ? (
              <Button
                variant="secondary"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Booking...
                  </span>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  if (step === "datetime" && !selectedSlot) {
                    setFormError("Please select a time slot.");
                    return;
                  }
                  setFormError("");
                  goNext();
                }}
              >
                <span className="flex items-center gap-1.5">
                  Next
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// ModalInput helper
// ---------------------------------------------------------------------------

function ModalInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#3a3530] mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-xl border border-[#e8e0d4] bg-white text-sm text-[#3a3530] placeholder:text-[#7a7470]/50 focus:outline-none focus:ring-2 focus:ring-[#5b7a5e]/40 transition-all"
      />
    </div>
  );
}
