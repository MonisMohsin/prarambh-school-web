export interface Activity {
  _id?: string
  title: string
  description: string
  category: "arts" | "outdoor" | "music" | "science" | "reading" | "cooking" | "physical"
  ageGroups: string[] // program IDs
  duration: number // minutes
  materials?: string[]
  instructions?: string
  images?: string[]
  staffId: string
  status: "active" | "inactive"
  createdAt: Date
  updatedAt: Date
}

export interface CreateActivityData {
  title: string
  description: string
  category: "arts" | "outdoor" | "music" | "science" | "reading" | "cooking" | "physical"
  ageGroups: string[]
  duration: number
  materials?: string[]
  instructions?: string
  images?: string[]
  staffId: string
}
