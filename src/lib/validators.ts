import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[+]?[\d\s-]{10,15}$/, "Please enter a valid phone number"),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"], "Please select a gender"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;

export const bookingFormSchema = z.object({
  professionalId: z.string().min(1, "Please select a professional"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please select a valid date"),
  time: z.string().min(1, "Please select a time slot"),
  mode: z.enum(["in-person", "video", "audio"], "Please select a consultation mode"),
  patientName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  patientPhone: z
    .string()
    .regex(/^[+]?[\d\s-]{10,15}$/, "Please enter a valid phone number"),
  patientEmail: z.string().email("Please enter a valid email address"),
  patientAge: z
    .number()
    .min(1, "Age must be at least 1")
    .max(120, "Please enter a valid age"),
  patientGender: z.enum(["male", "female", "other", "prefer-not-to-say"], "Please select a gender"),
});

export type BookingFormSchema = z.infer<typeof bookingFormSchema>;
