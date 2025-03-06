import { Product } from "@/types/product";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.BASE_URL}/wp-json/wc/v3/products`, {
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
      ).toString("base64")}`,
    },
  });
  const data = await res.json();
  return data.map((product: Product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(
    `${process.env.BASE_URL}/wp-json/wc/v3/products?slug=${slug}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
        ).toString("base64")}`,
      },
    }
  );
  const product: Product = await res.json();

  return (
    <div>
      <h1>{product.name}</h1>
      <h1>{product.price}</h1>
    </div>
  );
}
