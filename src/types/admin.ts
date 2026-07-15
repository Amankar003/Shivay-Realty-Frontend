// Admin and auth-related type definitions

export interface Admin {
  id: string;
  email: string;
  name: string;
  lastLogin: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  admin: Admin;
  accessToken: string;
}

export interface DashboardStats {
  totalProperties: number;
  publishedProperties: number;
  totalInquiries: number;
  pendingSiteVisits: number;
  recentInquiries: number;
  thisMonthLeads: number;
}
