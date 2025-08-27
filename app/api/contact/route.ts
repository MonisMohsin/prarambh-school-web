import { type NextRequest, NextResponse } from "next/server"
import { ContactService } from "@/lib/services/contact-service"
import type { CreateContactInquiryData } from "@/lib/models/contact-inquiry"

export async function GET() {
  try {
    const inquiries = await ContactService.getAllInquiries()
    return NextResponse.json({ success: true, data: inquiries })
  } catch (error) {
    console.error("Error fetching contact inquiries:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch contact inquiries" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "phone", "message"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const inquiryData: CreateContactInquiryData = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      childAge: body.childAge,
      message: body.message,
    }

    const inquiry = await ContactService.createInquiry(inquiryData)
    return NextResponse.json({ success: true, data: inquiry }, { status: 201 })
  } catch (error) {
    console.error("Error creating contact inquiry:", error)
    return NextResponse.json({ success: false, error: "Failed to create contact inquiry" }, { status: 500 })
  }
}
