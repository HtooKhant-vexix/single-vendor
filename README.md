# Single-Vendor E-commerce Platform

A modern, full-stack e-commerce platform built with Next.js, Supabase, and Stripe for a single vendor to sell physical and digital products.

## 🚀 Features

### Frontend
- **Modern UI**: Built with Next.js 13+, TailwindCSS, and shadcn/ui
- **Responsive Design**: Mobile-first approach with optimized layouts
- **Product Catalog**: Advanced filtering, search, and categorization
- **Shopping Cart**: Persistent cart state with Zustand
- **Checkout Flow**: Streamlined checkout process with form validation
- **SEO Optimized**: Meta tags, structured data, and performance optimization

### Backend
- **Database**: PostgreSQL with Supabase for real-time features
- **Authentication**: Simple admin authentication system
- **API Routes**: RESTful API for products, orders, and admin operations
- **File Storage**: Supabase storage for product images
- **Row Level Security**: Secure data access with RLS policies

### Payments
- **Stripe Integration**: Secure payment processing
- **Order Management**: Complete order lifecycle tracking
- **Webhook Support**: Real-time payment status updates

### Admin Panel
- **Dashboard**: Analytics and performance metrics
- **Product Management**: Full CRUD operations for products
- **Order Management**: Order status updates and tracking
- **Inventory Tracking**: Stock level monitoring

## 🛠️ Tech Stack

- **Frontend**: Next.js 13+, React, TailwindCSS, TypeScript
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **State Management**: Zustand
- **UI Components**: shadcn/ui, Radix UI
- **Forms**: React Hook Form, Zod validation
- **Deployment**: Vercel (frontend), Supabase (backend)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.local` and fill in your credentials:
   ```bash
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

   # App Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ADMIN_EMAIL=admin@yourdomain.com
   ADMIN_PASSWORD=your_admin_password
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the migration file to set up the database schema
   - Configure Row Level Security policies
   - Set up authentication (email/password)

5. **Set up Stripe**
   - Create a Stripe account
   - Get your API keys from the dashboard
   - Configure webhook endpoints for payment events

6. **Run the development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Schema

### Products Table
- `id` (UUID, Primary Key)
- `name` (Text, Required)
- `description` (Text, Required)
- `price` (Decimal, Required)
- `compare_at_price` (Decimal, Optional)
- `category` (Text, Required)
- `subcategory` (Text, Optional)
- `tags` (Array, Optional)
- `images` (Array, Required)
- `inventory_count` (Integer, Default: 0)
- `is_digital` (Boolean, Default: false)
- `sku` (Text, Unique)
- `is_featured` (Boolean, Default: false)
- `is_active` (Boolean, Default: true)
- SEO fields and timestamps

### Orders Table
- `id` (UUID, Primary Key)
- `order_number` (Text, Unique)
- Customer information fields
- Address information (JSON)
- `order_items` (JSON Array)
- Pricing breakdown fields
- `payment_status` (Enum)
- `fulfillment_status` (Enum)
- Timestamps

### Categories Table
- `id` (UUID, Primary Key)
- `name` (Text, Required)
- `slug` (Text, Unique)
- `description` (Text, Optional)
- `image_url` (Text, Optional)
- `is_active` (Boolean, Default: true)
- `sort_order` (Integer)

## 🔒 Security Features

- **Row Level Security**: Database-level access control
- **Input Validation**: Zod schemas for form validation
- **CSRF Protection**: Built-in Next.js protection
- **Environment Variables**: Sensitive data protection
- **Secure Headers**: Security headers configuration
- **Payment Security**: PCI-compliant Stripe integration

## 📱 API Endpoints

### Products API
- `GET /api/products` - List products with filtering
- `POST /api/products` - Create new product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Orders API
- `GET /api/orders` - List orders (admin)
- `POST /api/orders` - Create new order
- `PUT /api/orders/[id]` - Update order status (admin)

### Payments API
- `POST /api/checkout` - Create payment intent
- `POST /api/webhooks/stripe` - Handle Stripe webhooks

## 🎨 Customization

### Styling
- Modify `tailwind.config.ts` for custom colors and themes
- Update `globals.css` for global styles
- Customize components in `components/ui/`

### Branding
- Update logo and brand name in `components/header.tsx`
- Modify metadata in `app/layout.tsx`
- Update footer information in `components/footer.tsx`

### Features
- Add new payment providers in `lib/stripe.ts`
- Extend database schema with migrations
- Add new API endpoints in `app/api/`

## 🚀 Deployment

### Vercel Deployment
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Supabase Setup
1. Your database is automatically managed by Supabase
2. Configure production environment variables
3. Set up webhook endpoints for Stripe

## 📊 Performance

- **Core Web Vitals**: Optimized for excellent user experience
- **Image Optimization**: Next.js Image component with proper sizing
- **Code Splitting**: Automatic code splitting with Next.js
- **Caching**: Efficient caching strategies for static content
- **Database Indexing**: Optimized queries with proper indexes

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

---

Built with ❤️ using modern web technologies for optimal performance and user experience.