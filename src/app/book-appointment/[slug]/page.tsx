"use client";

import { use, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MapPin,
  Video,
  Phone,
  ArrowLeft,
  GraduationCap,
  Building2,
  Clock,
  CheckCircle2,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getProfessionalBySlug,
  getAvailableSlots,
  bookAppointment,
} from "@/lib/api/booking-client";
import { consultationModes, formatDateLabel } from "@/data/mock/booking-data";
import type { TeamMember, BookingSlot } from "@/types";

// ---------------------------------------------------------------------------
// Mode icon map
// ---------------------------------------------------------------------------

const modeIconMap: Record<string, typeof MapPin> = {
  MapPin,
  Video,
  Phone,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DoctorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [doctor, setDoctor] = useState<TeamMember | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  // Booking state
  const [mode, setMode] = useState<"in-person" | "video" | "audio">(
    "in-person"
  );
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });
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
  const [success, setSuccess] = useState<{
    bookingId: string;
    message: string;
  } | null>(null);
  const [formError, setFormError] = useState("");

  // Fetch doctor data
  useEffect(() => {
    getProfessionalBySlug(slug).then((data) => {
      if (!data) {
        setNotFound(true);
      } else {
        setDoctor(data);
        // Set default mode to first available mode
        if (data.availableModes.length > 0) {
          setMode(data.availableModes[0]);
        }
      }
      setLoading(false);
    });
  }, [slug]);

  // Fetch slots when date changes
  useEffect(() => {
    if (!doctor) return;
    setSlotsLoading(true);
    setSelectedSlot("");
    getAvailableSlots(doctor.id, selectedDate).then((data) => {
      setSlots(data);
      setSlotsLoading(false);
    });
  }, [doctor, selectedDate]);

  const handleBooking = useCallback(async () => {
    if (!doctor) return;
    setFormError("");

    // Validation
    if (!selectedSlot) {
      setFormError("Please select a time slot.");
      return;
    }
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
      setSuccess({ bookingId: result.bookingId, message: result.message });
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [
    doctor,
    selectedSlot,
    selectedDate,
    mode,
    patientName,
    patientPhone,
    patientEmail,
    patientAge,
    patientGender,
  ]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdf8f2] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#5b7a5e]" />
      </div>
    );
  }

  // 404
  if (notFound || !doctor) {
    return (
      <div className="min-h-screen bg-[#fdf8f2] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-[#3a3530] font-[var(--font-serif)]">
            Professional Not Found
          </h1>
          <p className="mt-3 text-[#7a7470]">
            The professional you are looking for does not exist.
          </p>
          <Link href="/book-appointment">
            <Button variant="primary" className="mt-6">
              Browse All Professionals
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#fdf8f2] via-[#f5efe5] to-[#e8e0d4] pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#5b7a5e]/5 blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-64 h-64 rounded-full bg-[#c4956a]/5 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/book-appointment"
            className="inline-flex items-center gap-1.5 text-sm text-[#5b7a5e] font-semibold hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All Professionals
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Photo */}
            <div className="shrink-0">
              <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-3xl overflow-hidden bg-[#e8e0d4] shadow-lg">
                <Image
                  src={doctor.imageSrc}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                  sizes="208px"
                  priority
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-4xl font-bold text-[#3a3530] font-[var(--font-serif)]">
                {doctor.name}
              </h1>
              <p className="text-[#7a7470] mt-1 text-lg">{doctor.role}</p>

              <div className="flex flex-wrap items-center gap-4 mt-4">
                <span className="flex items-center gap-1 text-[#c4956a] font-bold">
                  <Star className="w-4 h-4 fill-[#c4956a]" />
                  {doctor.rating}
                </span>
                {doctor.experience && (
                  <span className="flex items-center gap-1.5 text-[#7a7470]">
                    <Clock className="w-4 h-4" />
                    {doctor.experience}
                  </span>
                )}
                <span className="text-lg font-bold text-[#3a3530]">
                  ₹{doctor.price.toLocaleString("en-IN")}{" "}
                  <span className="text-sm font-normal text-[#7a7470]">
                    / session
                  </span>
                </span>
              </div>

              {/* Languages */}
              <div className="flex flex-wrap gap-2 mt-4">
                {doctor.languages.map((lang) => (
                  <span
                    key={lang}
                    className="text-sm px-3 py-1 rounded-full bg-[#5b7a5e]/10 text-[#5b7a5e] font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <a href="#booking-section">
                  <Button variant="secondary" size="lg">
                    Book Session
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content sections */}
      <section className="bg-[#fdf8f2] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* About */}
          <div>
            <h2 className="text-2xl font-bold text-[#3a3530] font-[var(--font-serif)] mb-4">
              About
            </h2>
            <p className="text-[#7a7470] leading-relaxed text-lg">
              {doctor.bio}
            </p>
          </div>

          {/* Expertise */}
          <div>
            <h2 className="text-2xl font-bold text-[#3a3530] font-[var(--font-serif)] mb-4">
              Areas of Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {doctor.specializations.map((spec) => (
                <span
                  key={spec}
                  className="px-4 py-2 rounded-full bg-[#c4956a]/10 text-[#c4956a] font-semibold text-sm"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Qualifications */}
          <div>
            <h2 className="text-2xl font-bold text-[#3a3530] font-[var(--font-serif)] mb-4">
              Qualifications
            </h2>
            <div className="flex flex-col sm:flex-row gap-6">
              {doctor.qualification && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#5b7a5e]/10 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 text-[#5b7a5e]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#3a3530]">
                      {doctor.qualification}
                    </p>
                    <p className="text-sm text-[#7a7470]">Degree</p>
                  </div>
                </div>
              )}
              {doctor.institution && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#5b7a5e]/10 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-[#5b7a5e]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#3a3530]">
                      {doctor.institution}
                    </p>
                    <p className="text-sm text-[#7a7470]">Institution</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Available Modes */}
          <div>
            <h2 className="text-2xl font-bold text-[#3a3530] font-[var(--font-serif)] mb-4">
              Consultation Modes
            </h2>
            <div className="flex flex-wrap gap-4">
              {consultationModes.map((cm) => {
                const isAvailable = doctor.availableModes.includes(cm.id);
                const IconComp = modeIconMap[cm.icon];
                return (
                  <div
                    key={cm.id}
                    className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all ${
                      isAvailable
                        ? "border-[#5b7a5e]/30 bg-[#5b7a5e]/5 text-[#5b7a5e]"
                        : "border-[#e8e0d4] bg-white text-[#7a7470] opacity-50"
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                    <span className="font-semibold text-sm">{cm.label}</span>
                    {!isAvailable && (
                      <span className="text-xs">(Unavailable)</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Booking section */}
      <section
        id="booking-section"
        className="bg-white py-16 border-t border-[#e8e0d4]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#3a3530] font-[var(--font-serif)] mb-2">
            Book Your Session
          </h2>
          <p className="text-[#7a7470] mb-8">
            Select your preferred mode, date, and time slot below.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Slot selection */}
            <div className="space-y-6">
              {/* Mode selector */}
              <div>
                <label className="block text-sm font-semibold text-[#3a3530] mb-2">
                  Consultation Mode
                </label>
                <div className="flex gap-2">
                  {consultationModes
                    .filter((cm) => doctor.availableModes.includes(cm.id))
                    .map((cm) => {
                      const IconComp = modeIconMap[cm.icon];
                      return (
                        <button
                          key={cm.id}
                          onClick={() => setMode(cm.id)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                            mode === cm.id
                              ? "bg-[#5b7a5e] text-white shadow-md"
                              : "bg-[#fdf8f2] text-[#7a7470] hover:bg-[#5b7a5e]/10 border border-[#e8e0d4]"
                          }`}
                        >
                          <IconComp className="w-4 h-4" />
                          {cm.label}
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Calendar date picker */}
              <div>
                <label className="block text-sm font-semibold text-[#3a3530] mb-2">
                  Select Date
                </label>
                <MiniCalendar
                  selectedDate={selectedDate}
                  onSelect={setSelectedDate}
                />
              </div>

              {/* Time slots */}
              <div>
                <label className="block text-sm font-semibold text-[#3a3530] mb-2">
                  Available Slots
                </label>
                {slotsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-[#5b7a5e]" />
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot.time)}
                        className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
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
              </div>
            </div>

            {/* Right: Patient form */}
            <div className="bg-[#fdf8f2] rounded-3xl p-6 sm:p-8 h-fit">
              <h3 className="text-lg font-bold text-[#3a3530] font-[var(--font-serif)] mb-5">
                Patient Details
              </h3>
              <div className="space-y-4">
                <InputField
                  label="Full Name"
                  value={patientName}
                  onChange={setPatientName}
                  placeholder="Enter your full name"
                />
                <InputField
                  label="Phone Number"
                  value={patientPhone}
                  onChange={setPatientPhone}
                  placeholder="+91 XXXXX XXXXX"
                  type="tel"
                />
                <InputField
                  label="Email Address"
                  value={patientEmail}
                  onChange={setPatientEmail}
                  placeholder="you@example.com"
                  type="email"
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Age"
                    value={patientAge}
                    onChange={setPatientAge}
                    placeholder="25"
                    type="number"
                  />
                  <div>
                    <label className="block text-sm font-semibold text-[#3a3530] mb-1.5">
                      Gender
                    </label>
                    <select
                      value={patientGender}
                      onChange={(e) => setPatientGender(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#e8e0d4] bg-white text-sm text-[#3a3530] focus:outline-none focus:ring-2 focus:ring-[#5b7a5e]/40 focus:border-[#5b7a5e] transition-all cursor-pointer"
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

                {/* Summary */}
                {selectedSlot && (
                  <div className="bg-white rounded-2xl p-4 border border-[#e8e0d4] mt-2">
                    <p className="text-sm text-[#7a7470] mb-1">
                      Booking Summary
                    </p>
                    <p className="font-semibold text-[#3a3530]">
                      {formatDateLabel(selectedDate)}, {selectedSlot}
                    </p>
                    <p className="text-sm text-[#7a7470] capitalize">
                      {mode === "in-person" ? "In-Person" : mode} consultation
                    </p>
                    <p className="text-sm font-bold text-[#c4956a] mt-1">
                      ₹{doctor.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                )}

                {formError && (
                  <p className="text-sm text-red-600 font-medium">
                    {formError}
                  </p>
                )}

                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full mt-2"
                  onClick={handleBooking}
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-[#5b7a5e]/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#5b7a5e]" />
              </div>
              <h3 className="text-2xl font-bold text-[#3a3530] font-[var(--font-serif)]">
                Appointment Booked!
              </h3>
              <p className="mt-3 text-[#7a7470]">
                Booking ID:{" "}
                <span className="font-bold text-[#3a3530]">
                  {success.bookingId}
                </span>
              </p>
              <p className="mt-2 text-[#7a7470]">
                We will send a confirmation to your email.
              </p>
              <div className="mt-6 flex gap-3 justify-center">
                <Link href="/book-appointment">
                  <Button variant="outline">Browse More</Button>
                </Link>
                <Button
                  variant="primary"
                  onClick={() => setSuccess(null)}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ---------------------------------------------------------------------------
// InputField helper
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// MiniCalendar
// ---------------------------------------------------------------------------

function MiniCalendar({
  selectedDate,
  onSelect,
}: {
  selectedDate: string;
  onSelect: (date: string) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const toDateStr = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  // Can't go to months before current month
  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  return (
    <div className="bg-[#fdf8f2] rounded-2xl p-4 border border-[#e8e0d4]">
      {/* Month/Year header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#e8e0d4] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-[#3a3530]" />
        </button>
        <span className="text-sm font-bold text-[#3a3530]">
          {monthNames[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#e8e0d4] transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 text-[#3a3530]" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map((d) => (
          <div
            key={d}
            className="text-center text-[11px] font-semibold text-[#7a7470] py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells before first day */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = toDateStr(viewYear, viewMonth, day);
          const dateObj = new Date(viewYear, viewMonth, day);
          const isPast = dateObj < today;
          const isToday = dateStr === todayStr;
          const isSelected = dateStr === selectedDate;
          const isSunday = dateObj.getDay() === 0;

          return (
            <button
              key={day}
              disabled={isPast}
              onClick={() => onSelect(dateStr)}
              className={`h-9 rounded-lg text-sm font-medium transition-all cursor-pointer
                ${isPast ? "text-[#7a7470]/30 cursor-not-allowed" : ""}
                ${isSelected ? "bg-[#5b7a5e] text-white shadow-md" : ""}
                ${isToday && !isSelected ? "bg-[#c4956a]/15 text-[#c4956a] font-bold" : ""}
                ${!isPast && !isSelected && !isToday ? "text-[#3a3530] hover:bg-[#5b7a5e]/10" : ""}
                ${isSunday && !isPast && !isSelected ? "!text-[#c4956a]" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Selected date label */}
      {selectedDate && (
        <div className="mt-3 pt-3 border-t border-[#e8e0d4] text-center">
          <span className="text-sm font-semibold text-[#5b7a5e]">
            {formatDateLabel(selectedDate)}
          </span>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// InputField helper
// ---------------------------------------------------------------------------

function InputField({
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
      <label className="block text-sm font-semibold text-[#3a3530] mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-xl border border-[#e8e0d4] bg-white text-sm text-[#3a3530] placeholder:text-[#7a7470]/50 focus:outline-none focus:ring-2 focus:ring-[#5b7a5e]/40 focus:border-[#5b7a5e] transition-all"
      />
    </div>
  );
}
