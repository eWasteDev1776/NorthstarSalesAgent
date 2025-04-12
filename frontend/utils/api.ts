/**
 * API Utility for Northstar
 * Handles all requests to the backend with error handling and consistent formatting
 */

type ApiResponse<T = any> = {
  data?: T;
  error?: string;
  status: number;
};

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
};

// Base API URL - would normally be from env variables
const API_BASE_URL = '/api';

/**
 * Fetch wrapper with consistent error handling and typing
 */
export async function fetchApi<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { 
    method = 'GET',
    body,
    headers = {},
  } = options;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      return {
        error: data?.message || 'An error occurred while fetching data',
        status: response.status,
      };
    }

    return {
      data,
      status: response.status,
    };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      status: 500,
    };
  }
}

/**
 * API endpoints as methods for better type safety and consistency
 */
export const api = {
  // Lead endpoints
  leads: {
    search: (query: string) => fetchApi('/leads/search', { 
      method: 'POST', 
      body: { query } 
    }),
    getAll: () => fetchApi('/leads'),
    getById: (id: string) => fetchApi(`/leads/${id}`),
    update: (id: string, data: any) => fetchApi(`/leads/${id}`, {
      method: 'PUT',
      body: data,
    }),
    addTag: (id: string, tag: string) => fetchApi(`/leads/${id}/tags`, {
      method: 'POST',
      body: { tag },
    }),
    export: (filters?: any) => fetchApi('/leads/export', { 
      method: 'POST', 
      body: filters 
    }),
  },

  // Messaging endpoints
  messages: {
    generate: (leadId: string) => fetchApi('/messaging/generate', {
      method: 'POST',
      body: { leadId },
    }),
    saveTemplate: (template: any) => fetchApi('/templates', {
      method: 'POST',
      body: template,
    }),
    getTemplates: () => fetchApi('/templates'),
  },

  // Strategy and insight endpoints
  strategy: {
    getInsights: () => fetchApi('/strategy/insights'),
    getMemory: () => fetchApi('/strategy/memory'),
    chat: (message: string) => fetchApi('/strategy/chat', {
      method: 'POST',
      body: { message },
    }),
  },

  // Profile and settings
  profile: {
    get: () => fetchApi('/profile'),
    update: (data: any) => fetchApi('/profile', {
      method: 'PUT',
      body: data,
    }),
    uploadLogo: async (file: File) => {
      const formData = new FormData();
      formData.append('logo', file);
      
      const response = await fetch(`${API_BASE_URL}/profile/logo`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      return {
        data,
        status: response.status,
        error: !response.ok ? data?.message : undefined,
      };
    },
  },

  // Agent logs
  logs: {
    get: (limit = 50) => fetchApi(`/logs?limit=${limit}`),
    stream: () => new EventSource(`${API_BASE_URL}/logs/stream`),
  },
};
