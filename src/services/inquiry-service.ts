// Inquiry API service layer

import { api } from "@/lib/api";
import type {
  InquiryFormData,
  SiteVisitFormData,
  ContactFormData,
  ApiResponse,
} from "@/types";

export const inquiryService = {
  /**
   * Submit a property inquiry
   */
  async submitInquiry(data: InquiryFormData) {
    return api.post<ApiResponse<null>>("/inquiries", data);
  },

  /**
   * Book a site visit
   */
  async bookSiteVisit(data: SiteVisitFormData) {
    return api.post<ApiResponse<null>>("/site-visits", data);
  },

  /**
   * Submit contact form
   */
  async submitContact(data: ContactFormData) {
    return api.post<ApiResponse<null>>("/contact", data);
  },
};
