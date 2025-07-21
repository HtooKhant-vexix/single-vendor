"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, User, Search, Menu } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

export function Header() {
  const { getTotalItems } = useCart();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-responsive flex h-14 sm:h-16 items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-semibold mb-4">
                  Home
                </Link>
                <Link href="/products" className="text-lg">
                  Products
                </Link>
                <Link href="/categories" className="text-lg">
                  Categories
                </Link>
                <Link href="/about" className="text-lg">
                  About
                </Link>
                <Link href="/contact" className="text-lg">
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="font-bold text-lg sm:text-xl">
            YourStore
          </Link>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 ml-4">
            <Link
              href="/products"
              className="hover:underline text-sm xl:text-base"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="hover:underline text-sm xl:text-base"
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="hover:underline text-sm xl:text-base"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:underline text-sm xl:text-base"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              className="pl-10 w-48 lg:w-64"
            />
          </div>

          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <User className="h-5 w-5" />
          </Button>

          <Link
            href="/cart"
            className="relative flex items-center justify-center h-10 w-10"
          >
            <ShoppingCart className="h-5 w-5" />
            {mounted && totalItems > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {totalItems}
              </Badge>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
