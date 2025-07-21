import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Star, Shield, Truck, RefreshCw } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { supabase } from '@/lib/supabase'

async function getFeaturedProducts() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .eq('is_active', true)
    .limit(8)
  
  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
  
  return products || []
}

async function getCategories() {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .limit(6)
  
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  
  return categories || []
}

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories()
  ])

  return (
    <div className="space-y-8 sm:space-y-12 lg:space-y-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] min-h-[400px] sm:min-h-[500px] flex items-center justify-center bg-gradient-to-br from-primary to-primary-foreground text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center space-y-4 sm:space-y-6 max-w-4xl mx-auto px-4">
          <Badge variant="secondary" className="mb-4">
            Welcome to YourStore
          </Badge>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
            Discover Quality Products
          </h1>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-blue-100 max-w-2xl mx-auto">
            Curated collection of premium products with exceptional service and fast delivery
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/products">
                Shop Now <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-sm sm:text-base">
              <Link href="/categories">
                Browse Categories
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-responsive">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="text-center p-4 sm:p-6">
            <CardContent className="space-y-3 sm:space-y-4 p-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm sm:text-base">Free Shipping</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Free shipping on orders over $50
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-4 sm:p-6">
            <CardContent className="space-y-3 sm:space-y-4 p-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm sm:text-base">Secure Payment</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Your payment information is safe with us
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-4 sm:p-6">
            <CardContent className="space-y-3 sm:space-y-4 p-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm sm:text-base">Easy Returns</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                30-day return policy on all items
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-4 sm:p-6">
            <CardContent className="space-y-3 sm:space-y-4 p-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm sm:text-base">Quality Guarantee</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Premium products with quality assurance
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container-responsive">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="heading-responsive font-bold mb-3 sm:mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Explore our diverse range of categories to find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="group overflow-hidden card-hover">
              <Link href={`/categories/${category.slug}`}>
                <div className="relative aspect-video sm:aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.image_url || `https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800`}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2">{category.name}</h3>
                      {category.description && (
                        <p className="text-xs sm:text-sm opacity-90 px-2">{category.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container-responsive">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="heading-responsive font-bold mb-3 sm:mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Check out our handpicked selection of featured products
          </p>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid-responsive">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-muted-foreground text-sm sm:text-base">No featured products available at the moment.</p>
            <Button asChild className="mt-4">
              <Link href="/products">
                View All Products
              </Link>
            </Button>
          </div>
        )}

        <div className="text-center mt-8 sm:mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/products">
              <span className="text-sm sm:text-base">View All Products</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-muted/30 py-8 sm:py-12 lg:py-16">
        <div className="container-responsive text-center">
          <h2 className="heading-responsive font-bold mb-3 sm:mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
            Subscribe to our newsletter to get the latest updates on new products and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 sm:px-4 sm:py-2 border border-input bg-background rounded-md text-sm sm:text-base"
            />
            <Button className="text-sm sm:text-base">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}