'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CartItem } from '@/components/cart-item'
import { useCart } from '@/hooks/use-cart'
import { ShoppingBag, ArrowLeft } from 'lucide-react'

export default function CartPage() {
  const { items, getTotalPrice, getTotalItems } = useCart()
  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

  const taxRate = 0.08 // 8% tax rate
  const taxAmount = totalPrice * taxRate
  const shippingAmount = totalPrice > 50 ? 0 : 9.99
  const finalTotal = totalPrice + taxAmount + shippingAmount

  if (items.length === 0) {
    return (
      <div className="container-responsive py-6 sm:py-8">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="h-16 w-16 sm:h-24 sm:w-24 mx-auto text-muted-foreground mb-4 sm:mb-6" />
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild size="lg">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container-responsive py-6 sm:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Cart Items</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="px-4 sm:px-6">
                      <CartItem item={item} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="mt-4">
              <Button variant="outline" asChild className="text-sm sm:text-base">
                <Link href="/products">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4 mt-6 lg:mt-0">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Tax</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Shipping</span>
                  <span>
                    {shippingAmount === 0 ? 'FREE' : `$${shippingAmount.toFixed(2)}`}
                  </span>
                </div>
                
                {totalPrice < 50 && shippingAmount > 0 && (
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Add ${(50 - totalPrice).toFixed(2)} more for free shipping
                  </p>
                )}
                
                <Separator />
                
                <div className="flex justify-between font-bold text-base sm:text-lg">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
                
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout">
                    Proceed to Checkout
                  </Link>
                </Button>
                
                <p className="text-xs sm:text-sm text-muted-foreground text-center">
                  Secure checkout powered by Stripe
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}