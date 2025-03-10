"use client";

import { useCart } from "@/lib/providers/cart-provider";
import { Button } from "../../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../../components/ui/sheet";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import Link from "next/link";
import ButtonBrutalist from "../../../components/ui/button-brutalist";

export default function CartSheet() {
  const {
    isCartOpen,
    setIsCartOpen,
    items,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent
        showCloseButton={false}
        side="right"
        className="w-[350px] sm:w-[400px]"
      >
        <SheetHeader>
          <SheetTitle>Il tuo carrello</SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col gap-2 text-center">
              <p>Il tuo carrello è vuoto</p>
              <Button
                onClick={() => setIsCartOpen(false)}
                className="mx-auto mt-4 w-fit"
              >
                Continua lo shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-[60vh] overflow-auto pr-4">
                {items.map((item) => (
                  <div key={item.id} className="flex p-2 border-b pb-4">
                    {item.image && (
                      <div className="w-20 h-20 relative mr-4">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">{item.price}€</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 border rounded-full cursor-pointer"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 border rounded-full cursor-pointer"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto p-4">
                <div className="flex justify-between font-medium">
                  <span>Totale</span>
                  <span>{cartTotal.toFixed(2)}€</span>
                </div>
                <Link href="/checkout">
                  <ButtonBrutalist
                    className="w-full"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Procedi al checkout
                  </ButtonBrutalist>
                </Link>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
