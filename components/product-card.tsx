"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compare_at_price?: number;
  images: string[];
  category: string;
  is_featured: boolean;
  sku?: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "/placeholder-product.jpg",
      sku: product.sku,
    });

    toast.success(`${product.name} added to cart`);
  };

  const discountPercentage = product.compare_at_price
    ? Math.round(
        ((product.compare_at_price - product.price) /
          product.compare_at_price) *
          100
      )
    : null;

  return (
    <Card className="group overflow-hidden card-hover">
      <Link
        href={`/products/${product.id}`}
        className="relative aspect-square overflow-hidden"
      >
        <Image
          src={product.images[0] || "/placeholder-product.jpg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {product.is_featured && (
          <Badge className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-primary text-xs">
            Featured
          </Badge>
        )}
        {discountPercentage && (
          <Badge className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-500 text-xs">
            -{discountPercentage}%
          </Badge>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-1 right-1 sm:top-2 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 sm:h-10 sm:w-10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toast.info("Wishlist functionality coming soon!");
          }}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </Link>

      <CardContent className="p-3 sm:p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
        </div>
        <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex items-center gap-1 sm:gap-2 mb-3">
          <span className="font-bold text-sm sm:text-base lg:text-lg">
            ${product.price.toFixed(2)}
          </span>
          {product.compare_at_price && (
            <span className="text-muted-foreground line-through text-xs sm:text-sm">
              ${product.compare_at_price.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-3 sm:p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full text-xs sm:text-sm button-responsive"
        >
          <ShoppingCart className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Add to Cart</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
