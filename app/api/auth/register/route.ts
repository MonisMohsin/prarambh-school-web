import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/services/auth-service"
import type { CreateUserData } from "@/lib/models/user"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["email", "password", "firstName", "lastName", "role"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const userData: CreateUserData = {
      email: body.email,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
      role: body.role,
    }

    const user = await AuthService.createUser(userData)

    // Remove password from response
    const { password, ...userResponse } = user

    return NextResponse.json({ success: true, user: userResponse }, { status: 201 })
  } catch (error: any) {
    console.error("Registration error:", error)
    return NextResponse.json({ success: false, error: error.message || "Registration failed" }, { status: 500 })
  }
}
