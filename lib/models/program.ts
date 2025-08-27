export interface Program {
  _id?: string
  name: string
  description: string
  ageRange: {
    min: number // months
    max: number // months
  }
  capacity: number
  currentEnrollment: number
  schedule: {
    days: string[] // ['monday', 'tuesday', etc.]
    startTime: string // '08:00'
    endTime: string // '17:00'
  }
  tuition: {
    monthly: number
    registration: number
    materials: number
  }
  features: string[]
  staffIds: string[]
  status: "active" | "inactive"
  createdAt: Date
  updatedAt: Date
}

export interface CreateProgramData {
  name: string
  description: string
  ageRange: {
    min: number
    max: number
  }
  capacity: number
  schedule: {
    days: string[]
    startTime: string
    endTime: string
  }
  tuition: {
    monthly: number
    registration: number
    materials: number
  }
  features: string[]
  staffIds: string[]
}
