import { NextRequest, NextResponse } from "next/server";
import { getInquiries, saveInquiries, InquiryData } from "@/lib/storage";

export async function GET() {
  const inquiries = getInquiries();
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

    const inquiries = getInquiries();
    const newInquiry: InquiryData = {
      id: `inq-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : undefined,
      city: city ? city.trim() : "Unspecified",
      inquiryType: inquiryType || "General Product Enquiry",
      message: message.trim(),
      status: "new",
      createdAt: new Date().toISOString(),
    };

    inquiries.unshift(newInquiry);
    saveInquiries(inquiries);

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
