import { wooCommerceClient } from "@/lib/woocommerce";
import { Product } from "@/types/product";

export async function generateStaticParams() {
  const products = await wooCommerceClient.getProducts();
  return products.map((product: Product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await wooCommerceClient.getProducts({ slug: slug });

  return (
    <div>
      <h1>{product.name}</h1>
      <h1>{product.price}</h1>
    </div>
  );
}
