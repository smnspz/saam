import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { wooCommerceClient } from "@/lib/woocommerce";
import { Product } from "@/types/product";
import { ChevronRight, Mail } from "lucide-react";
import Image from "next/image";

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
  const product: Product = (
    await wooCommerceClient.getProducts({ slug: slug })
  )[0];

  return (
    // Left side
    <div className="flex flex-col sm:flex-row mx-2 my-2">
      <ScrollArea className="w-full sm:w-1/2 whitespace-nowrap rounded sm:h-screen md:h-[calc(100vh-2rem)] lg:h-[calc(100vh-8rem)]">
        <div className="flex sm:flex-col w-max sm:w-full space-x-4 sm:space-x-0 sm:space-y-2 ">
          {product.images.map((image) => (
            <figure key={image.name} className="shrink-0 sm:w-full">
              <div className="overflow-hidden rounded-md">
                <Image
                  src={image.src}
                  alt={image.name}
                  className="aspect-[3/4] sm:aspect-square w-[80vw] sm:w-full object-cover"
                  width={600}
                  height={800}
                />
              </div>
            </figure>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="max-w-md mx-auto px-4 py-8 flex flex-col items-center">
        <div className="text-center space-y-6">
          <p className="text-sm">New In</p>

          <h1 className="text-3xl md:text-4xl tracking-wide">
            {product.name.toUpperCase()}
          </h1>

          <p className="text-xl">{product.price}&#8364;</p>

          <div className="space-y-4">
            <div className="flex flex-col items-center gap-2">
              <p className="text-gray-700">
                Colore:{" "}
                <span className="inline-block w-3 h-3 rounded-full bg-amber-100 ml-1"></span>{" "}
                Crema
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <p className="text-gray-700">
                Taglia:{" "}
                <button className="text-gray-700 inline-flex items-center cursor-pointer">
                  Seleziona taglia <ChevronRight className="h-4 w-4" />
                </button>
              </p>
            </div>

            <button className="w-full hover:bg-[#1D71B8] bg-[#1D71B8]/30 hover:text-white py-3 px-4 rounded-full transition cursor-pointer">
              Seleziona taglia
            </button>
          </div>

          <div className="flex justify-center gap-6 pt-4">
            <button className="inline-flex items-center text-sm cursor-pointer">
              Dettagli prodotto
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center text-sm cursor-pointer">
              Guida alle taglie
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center text-sm cursor-pointer">
              Spedizione
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center">
          <p className="text-gray-700 mb-4">Serve assistenza?</p>
          <div className="flex gap-6">
            <button className="inline-flex items-center gap-2 cursor-pointer">
              <Mail className="h-4 w-4" />
              Mandaci una mail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
