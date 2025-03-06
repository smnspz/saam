/**
 * Utility functions for interacting with the WooCommerce API
 * Creates a WooCommerce API client with authentication headers
 */
export function createWooCommerceClient() {
    const baseUrl = process.env.BASE_URL;
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;
  
    if (!baseUrl || !consumerKey || !consumerSecret) {
      throw new Error('WooCommerce API credentials are not properly configured');
    }
  
    const authHeader = Buffer.from(
      `${consumerKey}:${consumerSecret}`
    ).toString('base64');
  
    /**
     * Get products from WooCommerce API
     */
    const getProducts = async (params?: Record<string, string>) => {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${baseUrl}/wp-json/wc/v3/products/?${queryParams ?? ''}`;
  
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
  
    return {
      getProducts,
    };
  }
  
  export const wooCommerceClient = createWooCommerceClient();