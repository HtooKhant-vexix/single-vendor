import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container-responsive py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-lg sm:text-xl">YourStore</h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Your trusted partner for quality products and exceptional service.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-semibold text-base sm:text-lg">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-muted-foreground text-sm sm:text-base">
              <Link href="/products" className="hover:text-primary">Products</Link>
              <Link href="/categories" className="hover:text-primary">Categories</Link>
              <Link href="/about" className="hover:text-primary">About Us</Link>
              <Link href="/contact" className="hover:text-primary">Contact</Link>
            </nav>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-semibold text-base sm:text-lg">Customer Service</h4>
            <nav className="flex flex-col gap-2 text-muted-foreground text-sm sm:text-base">
              <Link href="/shipping" className="hover:text-primary">Shipping Info</Link>
              <Link href="/returns" className="hover:text-primary">Returns</Link>
              <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
            </nav>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-semibold text-base sm:text-lg">Contact Info</h4>
            <div className="space-y-2 text-muted-foreground text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@yourstore.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>123 Store St, City, ST 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t text-center text-muted-foreground text-sm sm:text-base">
          <p>&copy; 2024 YourStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}