import { Product as ProductType } from "@/types/product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <div className="group flex flex-col items-center">
      <div className="flex flex-col items-center p-4 bg-blue-300/50 rounded">
        {product.images.length > 1 ? (
          <Carousel className="flex w-full">
            <Link href={`merch/product/${product.slug}`}>
              <CarouselContent className="max-w-xs">
                {product.images.map((image, index) => (
                  <CarouselItem key={index} className="flex justify-center">
                    <Image
                      key={image.name}
                      src={image.src}
                      alt={product.name}
                      width={300}
                      height={500}
                      className="object-cover rounded aspect-2/3"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Link>
            <CarouselPrevious
              variant="ghost"
              className="absolute left-10 top-125"
            />
            <CarouselNext
              variant="ghost"
              className="absolute top-125 right-10"
            />
          </Carousel>
        ) : (
          <Link href={`merch/product/${product.slug}`}>
            <Image
              key={product.images[0].name}
              src={product.images[0].src}
              alt={product.name}
              width={300}
              height={500}
              className="object-cover rounded aspect-2/3"
            />
          </Link>
        )}
      </div>
      <span className="group-hover:opacity-100 transition-opacity lg:opacity-0 mt-1">
        {product.attributes[0]?.options.join(" ")}
      </span>
      <span>{product.name}</span>
      <span>{product.price}&#8364;</span>
    </div>
  );
};

export default ProductCard;
