"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Logo from "./svg/logo";
import { merchMenuItemContact, merchMenuItems } from "@/constants/menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-8 w-8" color="#1D71B8" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            {/* TODO: sidebar content here */}
          </SheetContent>
        </Sheet>

        <nav className="hidden md:flex md:gap-6 lg:gap-10">
          {merchMenuItems.map((item) => {
            return (
              <Link
                key={item.name}
                href={item.url}
                className="text-sm font-semibold transition-colors hover:text-primary text-[#1D71B8]"
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logo - Centered */}
        <div className="absolute left-1/2 -translate-x-1/2 mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <Logo color="#1D71B8" className="h-20 w-20" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={merchMenuItemContact.url}
            className="hidden font-semibold text-sm transition-colors hover:text-primary md:block text-[#1D71B8]"
          >
            {merchMenuItemContact.name}
          </Link>

          {/* Cart Trigger */}
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-8 w-8" color="#1D71B8" />
                <span className="sr-only">Open cart</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2 text-center">
                  <p>Your cart is empty</p>
                  <Button
                    onClick={() => setIsCartOpen(false)}
                    className="mx-auto mt-4 w-fit"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
