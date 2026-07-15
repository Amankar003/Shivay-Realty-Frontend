// Inquiry and lead-related type definitions

export type LeadType = "inquiry" | "contact" | "site-visit";

export type LeadStatus = "new" | "contacted" | "closed";

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  propertyTitle?: string;
}

export interface SiteVisitFormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  propertyId: string;
  propertyTitle: string;
  message?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId?: string;
  propertyTitle?: string;
  message: string;
  type: LeadType;
  preferredDate?: string;
  status: LeadStatus;
  createdAt: string;
}
