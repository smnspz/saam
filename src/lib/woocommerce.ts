import { Category, Product } from "@/types/product";

/**
 * Utility functions for interacting with the WooCommerce API
 * Creates a WooCommerce API client with authentication headers
 */
export function createWooCommerceClient() {
  const baseUrl = process.env.BASE_URL;
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  if (!baseUrl || !consumerKey || !consumerSecret) {
    throw new Error("WooCommerce API credentials are not properly configured");
  }

  const authHeader = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );

  /**
   * Get products from WooCommerce API
   */
  const getProducts = async (
    params?: Record<string, string>
  ): Promise<Product[]> => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${baseUrl}/wp-json/wc/v3/products/?${queryParams ?? ""}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${authHeader}`,
      },
      next: {
        // Adjust based on your caching needs
        revalidate: 60, // revalidate every 60 seconds
      },
    });

    if (!response.ok) {
      throw new Error(`WooCommerce API error: ${response.status}`);
    }

    return await response.json();
  };

  /**
   * Get product categories
   */
  const getCategories = async (
    params?: Record<string, string>
  ): Promise<Category[]> => {
    const queryParams = params
      ? new URLSearchParams(params)
      : new URLSearchParams();
    const url = `${baseUrl}/wp-json/wc/v3/products/categories${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600, // Cache for longer since categories change less frequently
      },
    });

    if (!response.ok) {
      throw new Error(`WooCommerce API error: ${response.status}`);
    }

    return await response.json();
  };

  const getProductsByCategory = async (
    category: string
  ): Promise<Product[]> => {
    const categories = await getCategories();
    const categoryId = categories.find(
      (cat: Category) => cat.name === category
    )?.id;
    return await getProducts({ category: categoryId?.toString() ?? "" });
  };

  return {
    getProducts,
    getCategories,
  };
}

export const wooCommerceClient = createWooCommerceClient();
