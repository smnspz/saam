"use client";

import ButtonBrutalist from "@/components/ui/button-brutalist";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartItem, useCart } from "@/lib/providers/cart-provider";
import { Product } from "@/types/product";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { HelpButton } from "./product-help";

export default function ProductDescription({ product }: { product: Product }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [option, setOption] = useState("");
  const { isCartOpen, addToCart, setIsCartOpen } = useCart();

  const hasOption = !(option.length === 0);

  const handleAddToCart = () => {
    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0].src,
    };

    addToCart(item);
    setIsCartOpen(true);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [option]);

  const hasCategory = (category: string) =>
    product.categories.some((cat) => cat.name === category);

  return (
    <div className="max-w-md mx-auto px-4 py-8 flex flex-col items-center">
      <div className="text-center space-y-6">
        <p className="text-sm">New In</p>

        <h1 className="text-3xl md:text-4xl tracking-wide">{product.name}</h1>

        <p className="text-xl">{product.price}&#8364;</p>

        <div className="space-y-4">
          <div className="flex flex-col items-center gap-2">
            {product.attributes.map((attribute) => (
              <p key={attribute.name} className={`text-gray-700`}>
                {`${attribute.name}: `}
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                  <SheetTrigger asChild>
                    <span className="text-gray-700 inline-flex items-center cursor-pointer">
                      {hasOption
                        ? option
                        : `Seleziona ${attribute.name.toLowerCase()}`}
                    </span>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-[300px] sm:w-[400px] px-10 pt-10"
                  >
                    <h1>{`Seleziona ${attribute.name.toLowerCase()}`}</h1>
                    <RadioGroup onValueChange={setOption} value={option}>
                      {attribute.options.map((opt) => (
                        <div className="flex flex-col space-y-2" key={opt}>
                          <div className="flex space-x-2">
                            <RadioGroupItem value={opt} id={opt} />
                            <Label htmlFor={opt}>{opt}</Label>
                          </div>
                          <Separator
                            className={`mt-2 ${
                              attribute.options.length === 1 && "hidden"
                            }`}
                          />
                        </div>
                      ))}
                    </RadioGroup>
                  </SheetContent>
                </Sheet>
              </p>
            ))}
          </div>

          <Sheet
            open={hasOption ? isCartOpen : isMenuOpen}
            onOpenChange={hasOption ? setIsCartOpen : setIsMenuOpen}
          >
            <SheetTrigger>
              <ButtonBrutalist
                onClick={() => {
                  if (option) {
                    handleAddToCart();
                  } else {
                    setIsMenuOpen(true);
                  }
                }}
              >
                {option ? "Aggiungi al carrello" : "Scegli l'opzione"}
              </ButtonBrutalist>
            </SheetTrigger>
          </Sheet>
        </div>

        <div className="flex sm:justify-center sm:flex-row flex-col gap-6 pt-4">
          <HelpButton>Dettagli prodotto</HelpButton>
          <HelpButton>Guida alle taglie</HelpButton>
          <HelpButton>Spedizione</HelpButton>
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
  );
}
