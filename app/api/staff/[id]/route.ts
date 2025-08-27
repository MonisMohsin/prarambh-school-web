import { type NextRequest, NextResponse } from "next/server"
import { StaffService } from "@/lib/services/staff-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const staff = await StaffService.getStaffById(params.id)

    if (!staff) {
      return NextResponse.json({ success: false, error: "Staff member not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: staff })
  } catch (error) {
    console.error("Error fetching staff:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch staff" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    // Convert hireDate string to Date object if provided
    if (body.hireDate) {
      body.hireDate = new Date(body.hireDate)
    }

    const staff = await StaffService.updateStaff(params.id, body)

    if (!staff) {
      return NextResponse.json({ success: false, error: "Staff member not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: staff })
  } catch (error) {
    console.error("Error updating staff:", error)
    return NextResponse.json({ success: false, error: "Failed to update staff" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await StaffService.deleteStaff(params.id)

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Staff member not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Staff member deleted successfully" })
  } catch (error) {
    console.error("Error deleting staff:", error)
    return NextResponse.json({ success: false, error: "Failed to delete staff" }, { status: 500 })
  }
}
