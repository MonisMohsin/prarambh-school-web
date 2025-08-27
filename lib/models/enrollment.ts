export interface Enrollment {
  _id?: string
  studentId: string
  programId: string
  enrollmentDate: Date
  startDate: Date
  endDate?: Date
  status: "active" | "completed" | "withdrawn" | "pending"
  tuitionPaid: boolean
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateEnrollmentData {
  studentId: string
  programId: string
  startDate: Date
  endDate?: Date
  notes?: string
}
