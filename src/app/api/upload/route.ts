import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
    }

    // Validate type (images only)
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, message: "Only image files (JPG, PNG, WebP) are allowed." },
        { status: 400 }
      );
    }

    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueName = `products/${Date.now()}_${originalName}`;

    // 1. If Vercel Blob storage token is configured, upload directly to Vercel CDN
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(uniqueName, file, { access: "public" });
        return NextResponse.json({
          success: true,
          url: blob.url,
          filename: uniqueName,
        });
      } catch (blobError) {
        console.warn("Vercel Blob upload failed, falling back to base64:", blobError);
      }
    }

    // 2. Read file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 3. Try saving to public/uploads (works in local development / VPS)
    if (!process.env.VERCEL) {
      try {
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const localFileName = `${Date.now()}_${originalName}`;
        const filePath = path.join(uploadsDir, localFileName);
        fs.writeFileSync(filePath, buffer);

        return NextResponse.json({
          success: true,
          url: `/uploads/${localFileName}`,
          filename: localFileName,
        });
      } catch (fsErr) {
        console.warn("Filesystem write failed, falling back to base64 Data URL:", fsErr);
      }
    }

    // 4. Serverless Fallback: Return optimized base64 Data URL (stored in PostgreSQL TEXT column)
    const base64String = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64String}`;

    return NextResponse.json({
      success: true,
      url: dataUrl,
      filename: originalName,
    });
  } catch (error) {
    console.error("Upload route error:", error);
    return NextResponse.json({ success: false, message: "File upload failed" }, { status: 500 });
  }
}
