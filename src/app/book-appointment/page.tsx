"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Star,
  X,
  ChevronDown,
  MapPin,
  Video,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProfessionals } from "@/lib/api/booking-client";
import type { TeamMember } from "@/types";
import { BookingModal } from "@/components/sections/booking-modal";
import { DoctorCardSkeleton } from "@/components/shared/skeleton";
import { PageTransition } from "@/components/shared/page-transition";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ROLE_TABS = [
  "All",
  "Psychiatrist",
  "Psychologist",
  "Therapist",
  "Yoga Therapist",
];

const EXPERTISE_OPTIONS = [
  "Depression",
  "Anxiety",
  "ADHD",
  "OCD",
  "Bipolar Disorder",
  "Schizophrenia",
  "Autism",
  "Child Psychiatry",
  "Trauma Therapy",
  "PTSD",
  "Family Therapy",
  "Couples Counseling",
  "CBT",
  "Psychotherapy",
  "Stress Management",
  "Mindfulness",
  "Yoga Therapy",
  "Personality Disorders",
  "Grief Counseling",
  "Learning Disabilities",
  "Neuropsychological Assessment",
];

const LANGUAGE_OPTIONS = [
  "Kannada",
  "English",
  "Hindi",
  "Tamil",
  "Malayalam",
];

const PRICE_RANGES: { label: string; range: [number, number] }[] = [
  { label: "Under ₹1000", range: [0, 999] },
  { label: "₹1000 - ₹1500", range: [1000, 1500] },
  { label: "₹1500 - ₹2000", range: [1500, 2000] },
  { label: "₹2000+", range: [2000, 100000] },
];

const GENDER_OPTIONS = ["Male", "Female"];

const modeIcons: Record<string, React.ReactNode> = {
  "in-person": <MapPin className="w-3.5 h-3.5" />,
  video: <Video className="w-3.5 h-3.5" />,
  audio: <Phone className="w-3.5 h-3.5" />,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BookAppointmentPage() {
  const [professionals, setProfessionals] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeRole, setActiveRole] = useState("All");
  const [expertise, setExpertise] = useState("");
  const [language, setLanguage] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [gender, setGender] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [bookingDoctor, setBookingDoctor] = useState<TeamMember | null>(null);

  // Fetch all professionals once
  useEffect(() => {
    getProfessionals().then((data) => {
      setProfessionals(data);
      setLoading(false);
    });
  }, []);

  const hasActiveFilters = expertise || language || priceRange || gender;

  const clearFilters = useCallback(() => {
    setExpertise("");
    setLanguage("");
    setPriceRange("");
    setGender("");
  }, []);

  // Client-side filtering
  const filtered = useMemo(() => {
    let results = professionals;

    // Role tab
    if (activeRole !== "All") {
      results = results.filter((m) => {
        const r = m.role.toLowerCase();
        if (activeRole === "Psychiatrist") return r.includes("psychiatr");
        if (activeRole === "Psychologist") return r.includes("psycholog") || r.includes("neuropsycholog");
        if (activeRole === "Therapist")
          return (
            r.includes("therapist") ||
            r.includes("psychotherap") ||
            r.includes("therapy")
          );
        if (activeRole === "Yoga Therapist") return r.includes("yoga");
        return r.includes(activeRole.toLowerCase());
      });
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.role.toLowerCase().includes(q) ||
          m.specializations.some((s) => s.toLowerCase().includes(q))
      );
    }

    // Expertise
    if (expertise) {
      const exp = expertise.toLowerCase();
      results = results.filter((m) =>
        m.specializations.some((s) => s.toLowerCase().includes(exp))
      );
    }

    // Language
    if (language) {
      results = results.filter((m) =>
        m.languages.some((l) => l.toLowerCase() === language.toLowerCase())
      );
    }

    // Price range
    if (priceRange) {
      const found = PRICE_RANGES.find((p) => p.label === priceRange);
      if (found) {
        const [min, max] = found.range;
        results = results.filter((m) => m.price >= min && m.price <= max);
      }
    }

    // Gender
    if (gender) {
      const g = gender.toLowerCase();
      results = results.filter((m) => {
        const name = m.name.toLowerCase();
        if (g === "male")
          return name.startsWith("mr.") || name.startsWith("mr ");
        return !(name.startsWith("mr.") || name.startsWith("mr "));
      });
    }

    return results;
  }, [professionals, activeRole, search, expertise, language, priceRange, gender]);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#fdf8f2] via-[#f5efe5] to-[#e8e0d4] pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#5b7a5e]/5 blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-64 h-64 rounded-full bg-[#c4956a]/5 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block mb-3 text-sm font-semibold uppercase tracking-widest text-[#c4956a]">
            Book an Appointment
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#3a3530] font-[var(--font-serif)] leading-tight">
            Find the Right Professional
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[#7a7470] max-w-2xl mx-auto leading-relaxed">
            Browse our team of NIMHANS-trained experts and book a session that
            fits your needs.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7a7470]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, specialization..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-[#e8e0d4] shadow-sm text-[#3a3530] placeholder:text-[#7a7470]/60 focus:outline-none focus:ring-2 focus:ring-[#5b7a5e]/40 focus:border-[#5b7a5e] transition-all text-base"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7a7470] hover:text-[#3a3530] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Role tabs + filters + results */}
      <section className="bg-[#fdf8f2] pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Role tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            {ROLE_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveRole(tab)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeRole === tab
                    ? "bg-[#5b7a5e] text-white shadow-md"
                    : "bg-white text-[#7a7470] hover:bg-[#5b7a5e]/10 hover:text-[#5b7a5e] border border-[#e8e0d4]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filter toggle (mobile) + filter bar */}
          <div className="mt-6">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="md:hidden flex items-center gap-2 text-sm font-semibold text-[#5b7a5e] mb-3 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              <ChevronDown
                className={`w-4 h-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`}
              />
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#c4956a]" />
              )}
            </button>

            <div
              className={`${filtersOpen ? "block" : "hidden"} md:block`}
            >
              <div className="flex flex-wrap gap-3 items-center">
                <FilterSelect
                  label="Expertise"
                  value={expertise}
                  onChange={setExpertise}
                  options={EXPERTISE_OPTIONS}
                />
                <FilterSelect
                  label="Language"
                  value={language}
                  onChange={setLanguage}
                  options={LANGUAGE_OPTIONS}
                />
                <FilterSelect
                  label="Price"
                  value={priceRange}
                  onChange={setPriceRange}
                  options={PRICE_RANGES.map((p) => p.label)}
                />
                <FilterSelect
                  label="Gender"
                  value={gender}
                  onChange={setGender}
                  options={GENDER_OPTIONS}
                />
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#c4956a] font-semibold hover:underline cursor-pointer"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="mt-6 text-sm text-[#7a7470] font-medium">
            Showing{" "}
            <span className="text-[#3a3530] font-bold">{filtered.length}</span>{" "}
            professional{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Results grid */}
          {loading ? (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <DoctorCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="mt-16 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#5b7a5e]/10 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-[#5b7a5e]" />
              </div>
              <h3 className="text-xl font-bold text-[#3a3530] font-[var(--font-serif)]">
                No professionals found
              </h3>
              <p className="mt-2 text-[#7a7470]">
                Try adjusting your search or filters to find the right match.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSearch("");
                  setActiveRole("All");
                  clearFilters();
                }}
              >
                Reset All
              </Button>
            </div>
          ) : (
            <motion.div
              className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
              layout
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((member) => (
                  <DoctorCard
                    key={member.id}
                    member={member}
                    onBook={() => setBookingDoctor(member)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Booking modal */}
      {bookingDoctor && (
        <BookingModal
          doctor={bookingDoctor}
          onClose={() => setBookingDoctor(null)}
        />
      )}
    </PageTransition>
  );
}

// ---------------------------------------------------------------------------
// FilterSelect
// ---------------------------------------------------------------------------

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none pl-3 pr-8 py-2.5 rounded-xl text-sm border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5b7a5e]/40 ${
          value
            ? "border-[#5b7a5e] bg-[#5b7a5e]/5 text-[#5b7a5e] font-semibold"
            : "border-[#e8e0d4] bg-white text-[#7a7470]"
        }`}
      >
        <option value="">{label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a7470] pointer-events-none" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// DoctorCard
// ---------------------------------------------------------------------------

function DoctorCard({
  member,
  onBook,
}: {
  member: TeamMember;
  onBook: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="p-5 sm:p-6">
        <div className="flex gap-4">
          {/* Photo */}
          <div className="shrink-0">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#e8e0d4]">
              <Image
                src={member.imageSrc}
                alt={member.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-[#3a3530] font-[var(--font-serif)] truncate">
              {member.name}
            </h3>
            <p className="text-sm text-[#7a7470] mt-0.5">{member.role}</p>

            {/* Rating + Experience */}
            <div className="flex items-center gap-3 mt-2 text-sm">
              <span className="flex items-center gap-1 text-[#c4956a] font-semibold">
                <Star className="w-3.5 h-3.5 fill-[#c4956a]" />
                {member.rating}
              </span>
              {member.experience && (
                <span className="text-[#7a7470]">{member.experience}</span>
              )}
            </div>

            {/* Languages */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {member.languages.map((lang) => (
                <span
                  key={lang}
                  className="text-xs px-2 py-0.5 rounded-full bg-[#5b7a5e]/8 text-[#5b7a5e] font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>

            {/* Specializations (max 3) */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {member.specializations.slice(0, 3).map((spec) => (
                <span
                  key={spec}
                  className="text-xs px-2 py-0.5 rounded-full bg-[#c4956a]/10 text-[#c4956a] font-medium"
                >
                  {spec}
                </span>
              ))}
              {member.specializations.length > 3 && (
                <span className="text-xs px-2 py-0.5 text-[#7a7470]">
                  +{member.specializations.length - 3} more
                </span>
              )}
            </div>

            {/* Available modes */}
            <div className="flex items-center gap-2 mt-2">
              {member.availableModes.map((mode) => (
                <span
                  key={mode}
                  className="flex items-center gap-1 text-xs text-[#7a7470]"
                >
                  {modeIcons[mode]}
                  <span className="capitalize hidden sm:inline">
                    {mode === "in-person" ? "In-person" : mode}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Price + Buttons */}
        <div className="mt-4 pt-4 border-t border-[#e8e0d4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-lg font-bold text-[#3a3530]">
            ₹{member.price.toLocaleString("en-IN")}{" "}
            <span className="text-sm font-normal text-[#7a7470]">
              / session
            </span>
          </p>
          <div className="flex gap-2 w-full sm:w-auto">
            <Link
              href={`/book-appointment/${member.slug}`}
              className="flex-1 sm:flex-initial"
            >
              <Button variant="outline" size="sm" className="w-full">
                View Profile
              </Button>
            </Link>
            <Button
              variant="secondary"
              size="sm"
              className="flex-1 sm:flex-initial"
              onClick={onBook}
            >
              Book Session
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
