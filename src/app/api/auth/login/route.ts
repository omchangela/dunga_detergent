import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const trimmedEmail = (email || "").trim().toLowerCase();
    const trimmedPass = (password || "").trim();

    // Default authorized credentials
    if (trimmedEmail === "admin@monagodu501.com" && trimmedPass === "admin123") {
      const response = NextResponse.json({
        success: true,
        user: {
          name: "Managing Director",
          email: "admin@monagodu501.com",
          role: "Super Admin",
        },
      });

      // Set session cookie
      response.cookies.set("admin_session", "authenticated_token_501", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        httpOnly: false,
        sameSite: "lax",
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Invalid email address or password. Please verify credentials." },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
