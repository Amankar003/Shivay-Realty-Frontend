// API client for communicating with the FastAPI backend

import { SITE_CONFIG } from "./constants";
import type { ApiError } from "@/types";

const API_BASE = SITE_CONFIG.apiUrl;

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

/**
 * Build URL with query parameters
 */
function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  const url = new URL(`${API_BASE}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        url.searchParams.append(key, String(value));
      }
    });
  }
  return url.toString();
}

/**
 * Parse API error response
 */
async function parseError(response: Response): Promise<ApiError> {
  try {
    const data = await response.json();
    return {
      message: data.detail || data.message || "An unexpected error occurred",
      statusCode: response.status,
      details: data.details,
    };
  } catch {
    return {
      message: `Request failed with status ${response.status}`,
      statusCode: response.status,
    };
  }
}

/**
 * Core fetch wrapper with error handling
 */
async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;
  const url = buildUrl(endpoint, params);

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    cache: "no-store",
    ...fetchOptions,
    headers: {
      ...defaultHeaders,
      ...fetchOptions.headers,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = await parseError(response);
    throw error;
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

/**
 * API methods
 */
export const api = {
  get<T>(endpoint: string, params?: Record<string, string | number | boolean | undefined>, customOptions?: RequestInit) {
    return request<T>(endpoint, { method: "GET", params, ...customOptions });
  },

  post<T>(endpoint: string, body?: unknown) {
    return request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  put<T>(endpoint: string, body?: unknown) {
    return request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  delete<T>(endpoint: string) {
    return request<T>(endpoint, { method: "DELETE" });
  },

  /**
   * Upload files via multipart/form-data
   */
  upload<T>(endpoint: string, formData: FormData) {
    return request<T>(endpoint, {
      method: "POST",
      body: formData,
      headers: {}, // Let browser set Content-Type with boundary
    });
  },
};
