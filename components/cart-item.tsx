'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'

interface CartItemProps {
  item: {
    id: string
    name: string
    price: number
    image: string
    quantity: number
    sku?: string
  }
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex items-center gap-3 sm:gap-4 py-3 sm:py-4 border-b">
      <div className="relative h-12 w-12 sm:h-16 sm:w-16 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 48px, 64px"
        />
      </div>
      
      <div className="flex-1">
        <h3 className="font-semibold text-sm sm:text-base line-clamp-2">{item.name}</h3>
        {item.sku && (
          <p className="text-xs sm:text-sm text-muted-foreground">SKU: {item.sku}</p>
        )}
        <p className="font-bold text-sm sm:text-base">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="h-8 w-8 sm:h-10 sm:w-10"
        >
          <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
        
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
          className="w-12 sm:w-16 text-center text-sm"
          min="1"
        />
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="h-8 w-8 sm:h-10 sm:w-10"
        >
          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2">
        <span className="font-bold min-w-[60px] sm:min-w-[80px] text-right text-sm sm:text-base">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 sm:h-10 sm:w-10"
        >
          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </div>
  )
}