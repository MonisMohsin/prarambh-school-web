import { type NextRequest, NextResponse } from "next/server"
import { ProgramService } from "@/lib/services/program-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const program = await ProgramService.getProgramById(params.id)

    if (!program) {
      return NextResponse.json({ success: false, error: "Program not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: program })
  } catch (error) {
    console.error("Error fetching program:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch program" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const program = await ProgramService.updateProgram(params.id, body)

    if (!program) {
      return NextResponse.json({ success: false, error: "Program not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: program })
  } catch (error) {
    console.error("Error updating program:", error)
    return NextResponse.json({ success: false, error: "Failed to update program" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await ProgramService.deleteProgram(params.id)

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Program not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Program deleted successfully" })
  } catch (error) {
    console.error("Error deleting program:", error)
    return NextResponse.json({ success: false, error: "Failed to delete program" }, { status: 500 })
  }
}
