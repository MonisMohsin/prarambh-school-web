import { type NextRequest, NextResponse } from "next/server"
import { ContactService } from "@/lib/services/contact-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const inquiry = await ContactService.getInquiryById(params.id)

    if (!inquiry) {
      return NextResponse.json({ success: false, error: "Contact inquiry not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: inquiry })
  } catch (error) {
    console.error("Error fetching contact inquiry:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch contact inquiry" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const inquiry = await ContactService.updateInquiry(params.id, body)

    if (!inquiry) {
      return NextResponse.json({ success: false, error: "Contact inquiry not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: inquiry })
  } catch (error) {
    console.error("Error updating contact inquiry:", error)
    return NextResponse.json({ success: false, error: "Failed to update contact inquiry" }, { status: 500 })
  }
}
