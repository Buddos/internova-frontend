const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://internova-backend-production.up.railway.app';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      credentials: 'include', // Important: sends cookies
      ...options,
    };

    // Only set Content-Type for requests that have a body
    if (options.body) {
      config.headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      };
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      // For 204 No Content responses
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error');
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ message: string }>('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(data: {
    email: string;
    password: string;
    role: 'STUDENT' | 'COMPANY_REP';
    studentIdNumber?: string;
    departmentId?: string;
    companyName?: string;
    registrationNumber?: string;
    industry?: string;
  }) {
    return this.request<{ message: string }>('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCurrentUser() {
    return this.request<{
      email: string;
      role: string;
      status: string;
    }>('/api/v1/auth/me');
  }

  async refreshToken() {
    return this.request<{ message: string }>('/api/v1/auth/refresh', {
      method: 'POST',
    });
  }

  async logout() {
    return this.request<{ message: string }>('/api/v1/auth/logout', {
      method: 'POST',
    });
  }

  // Public vacancy endpoints
  async getVacancies(params?: { page?: number; size?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.page !== undefined) searchParams.set('page', params.page.toString());
    if (params?.size !== undefined) searchParams.set('size', params.size.toString());

    const query = searchParams.toString();
    return this.request<{
      vacancies: Array<{
        id: string;
        title: string;
        description: string;
        requirements: string;
        location: string;
        companyName: string;
        industry: string;
        isActive: boolean;
        createdAt: string;
      }>;
      totalPages: number;
      totalElements: number;
    }>(`/api/v1/vacancies${query ? `?${query}` : ''}`);
  }

  async getVacancy(id: string) {
    return this.request<{
      id: string;
      title: string;
      description: string;
      requirements: string;
      location: string;
      companyName: string;
      industry: string;
      isActive: boolean;
      createdAt: string;
    }>(`/api/v1/vacancies/${id}`);
  }

  async searchVacancies(keyword: string, params?: { page?: number; size?: number }) {
    const searchParams = new URLSearchParams();
    searchParams.set('keyword', keyword);
    if (params?.page !== undefined) searchParams.set('page', params.page.toString());
    if (params?.size !== undefined) searchParams.set('size', params.size.toString());

    return this.request<{
      vacancies: Array<{
        id: string;
        title: string;
        description: string;
        requirements: string;
        location: string;
        companyName: string;
        industry: string;
        isActive: boolean;
        createdAt: string;
      }>;
      totalPages: number;
      totalElements: number;
    }>(`/api/v1/vacancies/search?${searchParams.toString()}`);
  }

  // Student endpoints
  async getStudentProfile() {
    return this.request<{
      id: string;
      email: string;
      studentIdNumber: string;
      course: string;
      cvUrl: string;
      profileCompletion: number;
      department: string;
      status: string;
    }>('/api/v1/students/profile');
  }

  async updateStudentProfile(data: { course?: string; cvUrl?: string }) {
    return this.request<{ message: string }>('/api/v1/students/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getProfileCompletion() {
    return this.request<{
      completionPercentage: number;
      completionStatus: {
        hasBasicInfo: boolean;
        hasCourse: boolean;
        hasCv: boolean;
        hasProfilePicture: boolean;
      };
      message: string;
    }>('/api/v1/students/profile-completion');
  }

  async getVacancyFeed(departmentId: string) {
    return this.request<{
      vacancies: Array<{
        id: string;
        title: string;
        description: string;
        requirements: string;
        location: string;
        companyName: string;
        industry: string;
        isActive: boolean;
        createdAt: string;
      }>;
    }>(`/api/v1/vacancies/feed/${departmentId}`);
  }

  async applyToVacancy(vacancyId: string) {
    return this.request<{
      id: string;
      vacancyTitle: string;
      companyName: string;
      status: string;
      appliedAt: string;
      updatedAt: string;
    }>('/api/v1/applications', {
      method: 'POST',
      body: JSON.stringify({ vacancyId }),
    });
  }

  async getMyApplications(params?: { page?: number; size?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.page !== undefined) searchParams.set('page', params.page.toString());
    if (params?.size !== undefined) searchParams.set('size', params.size.toString());

    const query = searchParams.toString();
    return this.request<{
      applications: Array<{
        id: string;
        vacancyTitle: string;
        companyName: string;
        status: string;
        appliedAt: string;
        updatedAt: string;
      }>;
      totalPages: number;
      totalElements: number;
    }>(`/api/v1/applications${query ? `?${query}` : ''}`);
  }

  async getApplication(id: string) {
    return this.request<{
      id: string;
      vacancyTitle: string;
      companyName: string;
      status: string;
      appliedAt: string;
      updatedAt: string;
    }>(`/api/v1/applications/${id}`);
  }

  async withdrawApplication(id: string) {
    return this.request<{ message: string }>(`/api/v1/applications/${id}`, {
      method: 'DELETE',
    });
  }

  async submitLogbookEntry(date: string, content: string, tags: string) {
    const searchParams = new URLSearchParams();
    searchParams.set('date', date);

    return this.request<{ message: string; id: string }>(
      `/api/v1/logbooks/submit?${searchParams.toString()}`,
      {
        method: 'POST',
        body: JSON.stringify({ content, tags }),
      }
    );
  }

  async getMyLogbookEntries() {
    return this.request<Array<{
      id: string;
      entryDate: string;
      content: string;
      tags: string;
      submittedAt: string;
      isStamped: boolean;
      supervisorRemarks: string | null;
      status: string;
    }>>('/api/v1/logbooks/my-logs');
  }

  // Company endpoints
  async getCompanyProfile() {
    return this.request<{
      id: string;
      email: string;
      companyName: string;
      registrationNumber: string;
      industry: string;
      isVerified: boolean;
      status: string;
    }>('/api/v1/company/profile');
  }

  async getCompanyVacancies() {
    return this.request<{
      vacancies: Array<{
        id: string;
        title: string;
        description: string;
        requirements: string;
        location: string;
        companyName: string;
        industry: string;
        isActive: boolean;
        createdAt: string;
      }>;
      count: number;
    }>('/api/v1/company/vacancies');
  }

  async postVacancy(data: {
    title: string;
    description: string;
    requirements: string;
    location?: string;
  }) {
    return this.request<{
      id: string;
      title: string;
      description: string;
      requirements: string;
      location: string;
      companyName: string;
      industry: string;
      isActive: boolean;
      createdAt: string;
    }>('/api/v1/vacancies', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateVacancy(id: string, data: {
    title?: string;
    description?: string;
    requirements?: string;
    location?: string;
  }) {
    return this.request<{
      id: string;
      title: string;
      description: string;
      requirements: string;
      location: string;
      companyName: string;
      industry: string;
      isActive: boolean;
      createdAt: string;
    }>(`/api/v1/vacancies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async updateApplicationStatus(applicationId: string, status: string) {
    return this.request<{ message: string }>(
      `/api/v1/applications/${applicationId}/status?status=${status}`,
      {
        method: 'PATCH',
      }
    );
  }

  async getVerificationStatus() {
    return this.request<{
      isVerified: boolean;
      status: string;
      message: string;
    }>('/api/v1/company/verification-status');
  }

  // Notification endpoints
  async getNotifications(params?: { page?: number; size?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.page !== undefined) searchParams.set('page', params.page.toString());
    if (params?.size !== undefined) searchParams.set('size', params.size.toString());

    const query = searchParams.toString();
    return this.request<{
      notifications: Array<{
        id: string;
        title: string;
        message: string;
        isRead: boolean;
        createdAt: string;
      }>;
      totalPages: number;
      totalElements: number;
      unreadCount: number;
    }>(`/api/v1/notifications${query ? `?${query}` : ''}`);
  }

  async getUnreadNotificationCount() {
    return this.request<{ unreadCount: number }>('/api/v1/notifications/unread/count');
  }

  async markNotificationAsRead(id: string) {
    return this.request<{ message: string }>(`/api/v1/notifications/${id}/read`, {
      method: 'PATCH',
    });
  }

  async markAllNotificationsAsRead() {
    return this.request<{ message: string }>('/api/v1/notifications/read-all', {
      method: 'PATCH',
    });
  }

  // Health check
  async healthCheck() {
    return this.request<{ status: string }>('/actuator/health');
  }
}

export const api = new ApiClient(API_BASE_URL);