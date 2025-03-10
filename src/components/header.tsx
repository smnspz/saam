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
import { useCart } from "@/lib/providers/cart-provider";
import CartSheet from "./cart-sheet";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsCartOpen, itemCount } = useCart();

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
          <Link href="/merch" className="flex items-center gap-2">
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCartOpen(true)}
            className="relative"
          >
            <ShoppingCart className="h-8 w-8" color="#1D71B8" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
            <span className="sr-only">Open cart</span>
          </Button>
        </div>
      </div>

      {/* Cart Sheet Component */}
      <CartSheet />
    </header>
  );
};

export default Header;
