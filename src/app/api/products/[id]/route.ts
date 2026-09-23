import { NextRequest, NextResponse } from "next/server";
import { getProducts, saveProducts, ProductData } from "@/lib/storage";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) {
      return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();
    const products = getProducts();
    const index = products.findIndex((p) => p.id === numId);

    if (index === -1) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    const existing = products[index];
    const updated: ProductData = {
      ...existing,
      ...body,
      id: numId, // ensure id doesn't get mutated
    };

    products[index] = updated;
    saveProducts(products);

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) {
      return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
    }

    const products = getProducts();
    const filtered = products.filter((p) => p.id !== numId);

    if (filtered.length === products.length) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    saveProducts(filtered);
    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json({ success: false, message: "Deletion failed" }, { status: 500 });
  }
}
