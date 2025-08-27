// API client utility for frontend to backend communication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error("API request failed:", error)
      return {
        success: false,
        error: "Network error occurred",
      }
    }
  }

  // Students API
  async getStudents() {
    return this.request<any[]>("/students")
  }

  async getStudent(id: string) {
    return this.request<any>(`/students/${id}`)
  }

  async createStudent(data: any) {
    return this.request<any>("/students", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateStudent(id: string, data: any) {
    return this.request<any>(`/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteStudent(id: string) {
    return this.request<any>(`/students/${id}`, {
      method: "DELETE",
    })
  }

  // Staff API
  async getStaff() {
    return this.request<any[]>("/staff")
  }

  async getStaffMember(id: string) {
    return this.request<any>(`/staff/${id}`)
  }

  async createStaff(data: any) {
    return this.request<any>("/staff", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateStaff(id: string, data: any) {
    return this.request<any>(`/staff/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteStaff(id: string) {
    return this.request<any>(`/staff/${id}`, {
      method: "DELETE",
    })
  }

  // Programs API
  async getPrograms() {
    return this.request<any[]>("/programs")
  }

  async getProgram(id: string) {
    return this.request<any>(`/programs/${id}`)
  }

  async createProgram(data: any) {
    return this.request<any>("/programs", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateProgram(id: string, data: any) {
    return this.request<any>(`/programs/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteProgram(id: string) {
    return this.request<any>(`/programs/${id}`, {
      method: "DELETE",
    })
  }

  // Contact API
  async getContactInquiries() {
    return this.request<any[]>("/contact")
  }

  async getContactInquiry(id: string) {
    return this.request<any>(`/contact/${id}`)
  }

  async createContactInquiry(data: any) {
    return this.request<any>("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateContactInquiry(id: string, data: any) {
    return this.request<any>(`/contact/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  // Activities API
  async getActivities() {
    return this.request<any[]>("/activities")
  }

  async getActivity(id: string) {
    return this.request<any>(`/activities/${id}`)
  }

  async createActivity(data: any) {
    return this.request<any>("/activities", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateActivity(id: string, data: any) {
    return this.request<any>(`/activities/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteActivity(id: string) {
    return this.request<any>(`/activities/${id}`, {
      method: "DELETE",
    })
  }
}

export const apiClient = new ApiClient()
