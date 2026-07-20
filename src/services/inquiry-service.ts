// Inquiry API service layer

import { api } from "@/lib/api";
import type {
  InquiryFormData,
  SiteVisitFormData,
  ContactFormData,
  ApiResponse,
} from "@/types";

function toSnakeCasePayload(data: any) {
  return {
    name: data.name,
    email: data.email,
    phone: data.phone,
    property_id: data.propertyId,
    property_title: data.propertyTitle || data.propertyName,
    message: data.message,
    inquiry_type: data.inquiryType || 'other',
    preferred_date: data.preferredDate,
  };
}

export const inquiryService = {
  /**
   * Submit a property inquiry
   */
  async submitInquiry(data: InquiryFormData) {
    return api.post<ApiResponse<null>>("/inquiries", toSnakeCasePayload({...data, inquiryType: 'sales'}));
  },

  /**
   * Book a site visit
   */
  async bookSiteVisit(data: SiteVisitFormData) {
    return api.post<ApiResponse<null>>("/inquiries", toSnakeCasePayload({...data, inquiryType: 'site-visit'}));
  },

  /**
   * Submit contact form
   */
  async submitContact(data: ContactFormData) {
    return api.post<ApiResponse<null>>("/inquiries", toSnakeCasePayload({...data, inquiryType: data.subject || 'contact'}));
  },
};
