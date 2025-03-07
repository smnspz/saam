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
    
    const categories = await wooCommerceClient.getCategories(params);
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}