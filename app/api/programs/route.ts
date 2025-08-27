import { type NextRequest, NextResponse } from "next/server"
import { ProgramService } from "@/lib/services/program-service"
import type { CreateProgramData } from "@/lib/models/program"

export async function GET() {
  try {
    const programs = await ProgramService.getAllPrograms()
    return NextResponse.json({ success: true, data: programs })
  } catch (error) {
    console.error("Error fetching programs:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch programs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "description", "ageRange", "capacity", "schedule", "tuition", "features"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const programData: CreateProgramData = {
      ...body,
      staffIds: body.staffIds || [],
    }

    const program = await ProgramService.createProgram(programData)
    return NextResponse.json({ success: true, data: program }, { status: 201 })
  } catch (error) {
    console.error("Error creating program:", error)
    return NextResponse.json({ success: false, error: "Failed to create program" }, { status: 500 })
  }
}
