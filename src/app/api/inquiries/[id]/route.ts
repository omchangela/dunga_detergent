import { NextRequest, NextResponse } from "next/server";
import { getInquiries, saveInquiries } from "@/lib/storage";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!["new", "contacted", "closed"].includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid status value" }, { status: 400 });
    }

    const inquiries = getInquiries();
    const index = inquiries.findIndex((i) => i.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: "Inquiry not found" }, { status: 404 });
    }

    inquiries[index].status = status;
    saveInquiries(inquiries);

    return NextResponse.json({ success: true, inquiry: inquiries[index] });
  } catch (error) {
    console.error("PATCH /api/inquiries/[id] error:", error);
    return NextResponse.json({ success: false, message: "Failed to update inquiry." }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const inquiries = getInquiries();
    const filtered = inquiries.filter((i) => i.id !== id);

    if (filtered.length === inquiries.length) {
      return NextResponse.json({ success: false, message: "Inquiry not found" }, { status: 404 });
    }

    saveInquiries(filtered);
    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  } catch (error) {
    console.error("DELETE /api/inquiries/[id] error:", error);
    return NextResponse.json({ success: false, message: "Failed to delete inquiry." }, { status: 500 });
  }
}
