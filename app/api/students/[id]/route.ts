import { type NextRequest, NextResponse } from "next/server"
import { StudentService } from "@/lib/services/student-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const student = await StudentService.getStudentById(params.id)

    if (!student) {
      return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: student })
  } catch (error) {
    console.error("Error fetching student:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch student" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    // Convert dateOfBirth string to Date object if provided
    if (body.dateOfBirth) {
      body.dateOfBirth = new Date(body.dateOfBirth)
    }

    const student = await StudentService.updateStudent(params.id, body)

    if (!student) {
      return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: student })
  } catch (error) {
    console.error("Error updating student:", error)
    return NextResponse.json({ success: false, error: "Failed to update student" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await StudentService.deleteStudent(params.id)

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Student deleted successfully" })
  } catch (error) {
    console.error("Error deleting student:", error)
    return NextResponse.json({ success: false, error: "Failed to delete student" }, { status: 500 })
  }
}
