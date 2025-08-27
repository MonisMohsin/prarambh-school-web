import { type NextRequest, NextResponse } from "next/server"
import { StudentService } from "@/lib/services/student-service"
import type { CreateStudentData } from "@/lib/models/student"

export async function GET() {
  try {
    const students = await StudentService.getAllStudents()
    return NextResponse.json({ success: true, data: students })
  } catch (error) {
    console.error("Error fetching students:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch students" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "dateOfBirth",
      "parentName",
      "parentEmail",
      "parentPhone",
      "address",
      "emergencyContact",
      "programId",
    ]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Convert dateOfBirth string to Date object
    const studentData: CreateStudentData = {
      ...body,
      dateOfBirth: new Date(body.dateOfBirth),
    }

    const student = await StudentService.createStudent(studentData)
    return NextResponse.json({ success: true, data: student }, { status: 201 })
  } catch (error) {
    console.error("Error creating student:", error)
    return NextResponse.json({ success: false, error: "Failed to create student" }, { status: 500 })
  }
}
