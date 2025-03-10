import { wooCommerceClient } from "@/lib/woocommerce";
import { Product } from "@/types/product";
import ProductDescription from "../../components/product/product-description";
import { Metadata } from "next";
import ProductCarousel from "../../components/product/product-carousel";

export async function generateStaticParams() {
  const products = await wooCommerceClient.getProducts();
  return products.map((product: Product) => ({
    slug: product.slug,
  }));
}

type paramsType = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: paramsType;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = (await wooCommerceClient.getProducts({ slug: slug }))[0];

  return {
    title: product.name,
    description: product.short_description || product.description,
    openGraph: {
      images: product.images.map((image) => image.src),
    },
  };
}

export default async function ProductPage({ params }: { params: paramsType }) {
  const { slug } = await params;
  const product: Product = (
    await wooCommerceClient.getProducts({ slug: slug })
  )[0];

  return (
    // Left side
    <div className="flex flex-col sm:flex-row mx-2 my-2">
      <ProductCarousel product={product} />
      <ProductDescription product={product} />
    </div>
  );
}
