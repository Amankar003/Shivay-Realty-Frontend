// Zod validation schemas for all forms

import { z } from "zod";

const phoneRegex = /^[+]?[0-9\s\-()]{10,15}$/;

export const inquiryFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(phoneRegex, "Please enter a valid phone number"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be under 1000 characters"),
  propertyId: z.string().optional(),
  propertyTitle: z.string().optional(),
});

export const siteVisitFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(phoneRegex, "Please enter a valid phone number"),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  propertyId: z.string().min(1, "Property is required"),
  propertyTitle: z.string().min(1, "Property is required"),
  message: z.string().max(500, "Message must be under 500 characters").optional(),
});

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(phoneRegex, "Please enter a valid phone number"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must be under 200 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
});

export const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export type InquiryFormValues = z.infer<typeof inquiryFormSchema>;
export type SiteVisitFormValues = z.infer<typeof siteVisitFormSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type LoginFormValues = z.infer<typeof loginFormSchema>;
