"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Product } from "@/types/product";
import { ChevronRight, Mail } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProductDescription({ product }: { product: Product }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [option, setOption] = useState("");

  useEffect(() => {
    setIsMenuOpen(false);
  }, [option]);

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
                    <button className="text-gray-700 inline-flex items-center cursor-pointer">
                      {option
                        ? option
                        : `Seleziona ${attribute.name.toLowerCase()}`}
                    </button>
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

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger>
              <button className="w-full hover:bg-[#1D71B8] bg-[#1D71B8]/30 hover:text-white py-3 px-4 rounded-full transition cursor-pointer">
                {option ? "Aggiungi al carrello" : "Scegli l'opzione"}
              </button>
              {/* 
              TODO: posthog effect on the button hover
              <button className="bg-[#1D71B8] pb-3 hover:pb-4 transition-all rounded cursor-pointer">
                <span className="border-2 rounded px-4 py-2 bg-white">
                  {option ? "Aggiungi al carrello" : "Scegli l'opzione"}
                </span>
              </button> 
              */}
            </SheetTrigger>
          </Sheet>
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
  );
}
