export interface ContactInquiry {
  _id?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  childAge?: string
  message: string
  status: "new" | "contacted" | "scheduled" | "enrolled" | "closed"
  followUpDate?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateContactInquiryData {
  firstName: string
  lastName: string
  email: string
  phone: string
  childAge?: string
  message: string
}
