export interface Student {
  _id?: string
  firstName: string
  lastName: string
  dateOfBirth: Date
  age: number
  parentName: string
  parentEmail: string
  parentPhone: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }
  programId: string
  enrollmentDate: Date
  medicalInfo?: {
    allergies?: string[]
    medications?: string[]
    specialNeeds?: string
  }
  status: "active" | "inactive" | "pending"
  createdAt: Date
  updatedAt: Date
}

export interface CreateStudentData {
  firstName: string
  lastName: string
  dateOfBirth: Date
  parentName: string
  parentEmail: string
  parentPhone: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }
  programId: string
  medicalInfo?: {
    allergies?: string[]
    medications?: string[]
    specialNeeds?: string
  }
}
