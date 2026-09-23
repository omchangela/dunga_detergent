import { NextRequest, NextResponse } from "next/server";
import { getProducts, saveProducts, ProductData } from "@/lib/storage";

export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, badge, badgeColor, img, desc, features, weights, formulation, phBalanced } = body;

    if (!name || !category || !desc) {
      return NextResponse.json(
        { success: false, message: "Product name, category, and description are required." },
        { status: 400 }
      );
    }

    const products = getProducts();
    const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

    const newProduct: ProductData = {
      id: newId,
      name: name.trim(),
      category: category.trim(),
      badge: badge ? badge.trim() : "Featured Formulation",
      badgeColor: badgeColor || "#16a34a",
      img: img || "/assets/dishwash_liquid.jpg",
      desc: desc.trim(),
      features: Array.isArray(features) ? features.filter(Boolean) : ["High concentration formula"],
      weights: Array.isArray(weights) ? weights.filter(Boolean) : ["500ml", "1L"],
      formulation: formulation ? formulation.trim() : undefined,
      phBalanced: Boolean(phBalanced),
    };

    products.unshift(newProduct);
    const saved = saveProducts(products);

    if (!saved) {
      return NextResponse.json({ success: false, message: "Failed to persist product." }, { status: 500 });
    }

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ success: false, message: "Failed to process request." }, { status: 500 });
  }
}
