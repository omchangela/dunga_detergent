import { NextRequest, NextResponse } from "next/server";
import { getAllInquiries, createInquiry } from "@/lib/db";

export async function GET() {
  const inquiries = await getAllInquiries();
  return NextResponse.json(inquiries);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, city, inquiryType, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, message: "Name, phone, and message are required." },
        { status: 400 }
      );
    }

    const newInquiry = await createInquiry({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : undefined,
      city: city ? city.trim() : "Unspecified",
      inquiryType: inquiryType || "General Product Enquiry",
      message: message.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been submitted successfully to Monagodu 501.",
        inquiry: newInquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/inquiries error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit inquiry." },
      { status: 500 }
    );
  }
}
