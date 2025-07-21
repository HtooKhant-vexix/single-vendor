const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://mroifwdkadjochaiwazz.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key-here'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const sampleProducts = [
  {
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.",
    price: 299.99,
    compare_at_price: 399.99,
    category: "Electronics",
    subcategory: "Audio",
    tags: ["wireless", "noise-cancelling", "premium", "bluetooth"],
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    inventory_count: 50,
    is_digital: false,
    sku: "WH-001",
    weight: 0.8,
    dimensions: { length: 20, width: 18, height: 8 },
    is_featured: true,
    is_active: true,
    seo_title: "Premium Wireless Headphones - Noise Cancelling",
    seo_description: "Experience premium sound quality with our wireless noise-cancelling headphones. 30-hour battery life and superior comfort."
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt. Available in multiple colors and sizes. Perfect for everyday wear.",
    price: 29.99,
    compare_at_price: 39.99,
    category: "Clothing",
    subcategory: "T-Shirts",
    tags: ["organic", "cotton", "sustainable", "comfortable"],
    images: [
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    inventory_count: 100,
    is_digital: false,
    sku: "TS-001",
    weight: 0.2,
    dimensions: { length: 30, width: 25, height: 1 },
    is_featured: true,
    is_active: true,
    seo_title: "Organic Cotton T-Shirt - Sustainable Fashion",
    seo_description: "Comfortable organic cotton t-shirt made from sustainable materials. Perfect for everyday wear."
  },
  {
    name: "Smart Home Security Camera",
    description: "Advanced security camera with 4K recording, night vision, motion detection, and smartphone app integration. Keep your home secure 24/7.",
    price: 199.99,
    compare_at_price: 249.99,
    category: "Electronics",
    subcategory: "Security",
    tags: ["security", "4k", "smart-home", "night-vision"],
    images: [
      "https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    inventory_count: 25,
    is_digital: false,
    sku: "SC-001",
    weight: 0.5,
    dimensions: { length: 12, width: 8, height: 8 },
    is_featured: true,
    is_active: true,
    seo_title: "Smart Home Security Camera - 4K Recording",
    seo_description: "Advanced 4K security camera with night vision and smart home integration. Monitor your property 24/7."
  },
  {
    name: "Ceramic Coffee Mug Set",
    description: "Beautiful set of 4 ceramic coffee mugs with elegant design. Perfect for your morning coffee or as a gift for coffee lovers.",
    price: 49.99,
    compare_at_price: null,
    category: "Home & Garden",
    subcategory: "Kitchen",
    tags: ["ceramic", "coffee", "kitchen", "gift-set"],
    images: [
      "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    inventory_count: 30,
    is_digital: false,
    sku: "MUG-001",
    weight: 1.2,
    dimensions: { length: 25, width: 20, height: 15 },
    is_featured: false,
    is_active: true,
    seo_title: "Ceramic Coffee Mug Set - 4 Piece Collection",
    seo_description: "Elegant ceramic coffee mug set perfect for daily use or as a thoughtful gift for coffee enthusiasts."
  },
  {
    name: "Digital Marketing Course",
    description: "Comprehensive digital marketing course covering SEO, social media marketing, email marketing, and analytics. Includes lifetime access and certificates.",
    price: 149.99,
    compare_at_price: 299.99,
    category: "Digital Products",
    subcategory: "Courses",
    tags: ["digital", "marketing", "course", "online-learning"],
    images: [
      "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    inventory_count: 999,
    is_digital: true,
    digital_file_url: "https://example.com/course-access",
    sku: "COURSE-001",
    weight: null,
    dimensions: null,
    is_featured: true,
    is_active: true,
    seo_title: "Digital Marketing Course - Complete Training Program",
    seo_description: "Master digital marketing with our comprehensive course. Learn SEO, social media, email marketing and more."
  },
  {
    name: "Yoga Mat Premium",
    description: "High-quality yoga mat with superior grip and cushioning. Made from eco-friendly materials. Perfect for yoga, pilates, and fitness exercises.",
    price: 79.99,
    compare_at_price: 99.99,
    category: "Home & Garden",
    subcategory: "Fitness",
    tags: ["yoga", "fitness", "eco-friendly", "exercise"],
    images: [
      "https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    inventory_count: 40,
    is_digital: false,
    sku: "YM-001",
    weight: 1.5,
    dimensions: { length: 183, width: 61, height: 0.6 },
    is_featured: false,
    is_active: true,
    seo_title: "Premium Yoga Mat - Eco-Friendly Exercise Mat",
    seo_description: "High-quality yoga mat with superior grip and cushioning. Made from eco-friendly materials for your fitness routine."
  },
  {
    name: "Bestselling Novel - Digital Edition",
    description: "Award-winning fiction novel available as instant digital download. A captivating story that will keep you reading all night.",
    price: 12.99,
    compare_at_price: 24.99,
    category: "Books",
    subcategory: "Fiction",
    tags: ["digital", "ebook", "fiction", "bestseller"],
    images: [
      "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/159866/books-book-pages-read-159866.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    inventory_count: 999,
    is_digital: true,
    digital_file_url: "https://example.com/ebook-download",
    sku: "BOOK-001",
    weight: null,
    dimensions: null,
    is_featured: false,
    is_active: true,
    seo_title: "Bestselling Novel - Digital Edition Download",
    seo_description: "Award-winning fiction novel available for instant digital download. A captivating story you won't put down."
  },
  {
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and overcharge protection.",
    price: 39.99,
    compare_at_price: 59.99,
    category: "Electronics",
    subcategory: "Accessories",
    tags: ["wireless", "charging", "qi-compatible", "fast-charging"],
    images: [
      "https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4219653/pexels-photo-4219653.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    inventory_count: 75,
    is_digital: false,
    sku: "WC-001",
    weight: 0.3,
    dimensions: { length: 10, width: 10, height: 1 },
    is_featured: false,
    is_active: true,
    seo_title: "Fast Wireless Charging Pad - Qi Compatible",
    seo_description: "Fast wireless charging pad with sleek design and overcharge protection. Compatible with all Qi-enabled devices."
  }
]

async function seedProducts() {
  try {
    console.log('Starting to seed products...')
    
    for (const product of sampleProducts) {
      const { data, error } = await supabase
        .from('products')
        .insert(product)
        .select()
      
      if (error) {
        console.error('Error inserting product:', product.name, error)
      } else {
        console.log('Successfully inserted:', product.name)
      }
    }
    
    console.log('Finished seeding products!')
  } catch (error) {
    console.error('Error seeding products:', error)
  }
}

// Run the seeding function
seedProducts()