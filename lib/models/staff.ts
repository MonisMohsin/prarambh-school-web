export interface Staff {
  _id?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: "director" | "teacher" | "assistant" | "coordinator" | "admin"
  department: string
  hireDate: Date
  education: {
    degree: string
    institution: string
    year: number
  }
  experience: number // years of experience
  certifications?: string[]
  bio?: string
  profileImage?: string
  status: "active" | "inactive"
  createdAt: Date
  updatedAt: Date
}

export interface CreateStaffData {
  firstName: string
  lastName: string
  email: string
  phone: string
  role: "director" | "teacher" | "assistant" | "coordinator" | "admin"
  department: string
  hireDate: Date
  education: {
    degree: string
    institution: string
    year: number
  }
  experience: number
  certifications?: string[]
  bio?: string
  profileImage?: string
}
