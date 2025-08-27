import { type NextRequest, NextResponse } from "next/server"
import { StaffService } from "@/lib/services/staff-service"
import type { CreateStaffData } from "@/lib/models/staff"

export async function GET() {
  try {
    const staff = await StaffService.getAllStaff()
    return NextResponse.json({ success: true, data: staff })
  } catch (error) {
    console.error("Error fetching staff:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch staff" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "role",
      "department",
      "hireDate",
      "education",
      "experience",
    ]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Convert hireDate string to Date object
    const staffData: CreateStaffData = {
      ...body,
      hireDate: new Date(body.hireDate),
    }

    const staff = await StaffService.createStaff(staffData)
    return NextResponse.json({ success: true, data: staff }, { status: 201 })
  } catch (error) {
    console.error("Error creating staff:", error)
    return NextResponse.json({ success: false, error: "Failed to create staff" }, { status: 500 })
  }
}
