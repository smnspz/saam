import { wooCommerceClient } from "@/lib/woocommerce";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const params: Record<string, string> = {};
    
    // Convert searchParams to a regular object
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    
    const products = await wooCommerceClient.getProducts(params);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}