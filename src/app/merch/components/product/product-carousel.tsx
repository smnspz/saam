import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Product as ProductType } from "@/types/product";
import Image from "next/image";

export default function ProductCarousel({ product }: { product: ProductType }) {
  return (
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
  );
}
