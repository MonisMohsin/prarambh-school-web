export interface User {
  _id?: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: "admin" | "staff" | "teacher"
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserData {
  email: string
  password: string
  firstName: string
  lastName: string
  role: "admin" | "staff" | "teacher"
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthUser {
  _id: string
  email: string
  firstName: string
  lastName: string
  role: string
}
