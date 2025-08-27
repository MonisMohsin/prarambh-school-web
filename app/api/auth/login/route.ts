import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/services/auth-service"
import type { LoginCredentials } from "@/lib/models/user"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.email || !body.password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    const credentials: LoginCredentials = {
      email: body.email,
      password: body.password,
    }

    const result = await AuthService.login(credentials)

    if (!result) {
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 })
    }

    // Set HTTP-only cookie for token
    const response = NextResponse.json({
      success: true,
      user: result.user,
      token: result.token,
    })

    response.cookies.set("auth-token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "Login failed" }, { status: 500 })
  }
}
