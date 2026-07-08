export interface TeamMember {
  id: string;
  name: string;
  role: string;
  qualification: string;
  institution: string;
  imageSrc: string;
  specializations: string[];
  languages: string[];
  price: number;
  rating: number;
  experience: string;
  availableModes: ("in-person" | "video" | "audio")[];
  bio: string;
  slug: string;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  conditions: string[];
  icon: string; // lucide icon name
  image: string; // program image path
}

export interface Belief {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  image: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  mapUrl: string;
  hours: string;
  social: {
    instagram: string;
    linkedin: string;
    twitter: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  gender: string;
  message: string;
}

export interface BookingSlot {
  time: string;
  available: boolean;
}

export interface BookingRequest {
  professionalId: string;
  date: string;
  time: string;
  mode: "in-person" | "video" | "audio";
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientAge: number;
  patientGender: string;
}
