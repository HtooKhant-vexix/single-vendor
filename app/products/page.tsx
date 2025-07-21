import { Suspense } from 'react'
import { ProductCard } from '@/components/product-card'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase'

async function getProducts() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  
  return products || []
}

async function getCategories() {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true })
  
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  
  return categories || []
}

function ProductSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square bg-muted animate-pulse" />
      <CardContent className="p-4">
        <div className="h-4 bg-muted animate-pulse rounded mb-2" />
        <div className="h-6 bg-muted animate-pulse rounded mb-2" />
        <div className="h-4 bg-muted animate-pulse rounded mb-3" />
        <div className="h-6 bg-muted animate-pulse rounded mb-3" />
        <div className="h-10 bg-muted animate-pulse rounded" />
      </CardContent>
    </Card>
  )
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ])

  return (
    <div className="container-responsive py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="heading-responsive font-bold mb-3 sm:mb-4">All Products</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Discover our complete collection of quality products
        </p>
      </div>

      {/* Categories Filter */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
            All Products
          </Badge>
          {categories.map((category) => (
            <Badge 
              key={category.id} 
              variant="outline" 
              className="cursor-pointer hover:bg-muted text-xs sm:text-sm"
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <Suspense fallback={
        <div className="grid-responsive">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      }>
        {products.length > 0 ? (
          <div className="grid-responsive">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Check back later for new products or contact us for specific requests.
            </p>
          </div>
        )}
      </Suspense>
    </div>
  )
}