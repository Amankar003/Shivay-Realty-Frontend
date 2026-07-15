import { featuredProperties } from "@/data/properties";
import { Property, Admin } from "@/types";

// Mock API Client for Admin Dashboard
export const apiClient = {
  // Auth
  login: async (email: string, password: string): Promise<{ admin: Admin; token: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin@shivaayrealty.com" && password === "admin123") {
          resolve({
            admin: {
              id: "admin-1",
              email: "admin@shivaayrealty.com",
              name: "Admin User",
              lastLogin: new Date().toISOString(),
            },
            token: "mock-jwt-token-12345",
          });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  },

  // Properties
  getProperties: async (): Promise<Property[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(featuredProperties as unknown as Property[]); // Mock conversion
      }, 800);
    });
  },

  deleteProperty: async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500);
    });
  },

  // Dashboard Stats
  getDashboardStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalProperties: featuredProperties.length,
          publishedProperties: featuredProperties.length,
          totalLeads: 24,
          newLeads: 5,
        });
      }, 600);
    });
  },

  // Leads
  getLeads: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: "L1", name: "Rohan Desai", email: "rohan@example.com", phone: "+91 98765 43210", inquiryType: "sales", status: "new", createdAt: new Date().toISOString() },
          { id: "L2", name: "Ananya Sharma", email: "ananya@example.com", phone: "+91 91234 56789", inquiryType: "site-visit", status: "contacted", createdAt: new Date(Date.now() - 86400000).toISOString() },
          { id: "L3", name: "Vikram Singh", email: "vikram@example.com", phone: "+91 99887 76655", inquiryType: "partnership", status: "new", createdAt: new Date(Date.now() - 172800000).toISOString() },
        ]);
      }, 800);
    });
  }
};
