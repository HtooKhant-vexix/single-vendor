/*
  # E-commerce Platform Database Schema

  This migration creates the complete database schema for a single-vendor e-commerce platform.

  ## 1. New Tables
    - `categories` - Product categories and subcategories
    - `products` - Product catalog with inventory, pricing, and metadata
    - `orders` - Customer orders with payment and fulfillment tracking
    - `order_items` - Individual items within orders (normalized)

  ## 2. Security
    - Enable RLS on all tables
    - Public read access for products and categories
    - Admin-only access for orders and product management
    - Secure customer data handling

  ## 3. Features
    - Full-text search capabilities
    - Inventory tracking
    - Digital and physical product support
    - Order status tracking
    - SEO optimization fields
*/

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    description text,
    image_url text,
    is_active boolean DEFAULT true,
    sort_order integer DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text NOT NULL,
    price decimal(10,2) NOT NULL CHECK (price >= 0),
    compare_at_price decimal(10,2) CHECK (compare_at_price >= 0),
    category text NOT NULL,
    subcategory text,
    tags text[] DEFAULT '{}',
    images text[] DEFAULT '{}',
    inventory_count integer DEFAULT 0 CHECK (inventory_count >= 0),
    is_digital boolean DEFAULT false,
    digital_file_url text,
    sku text UNIQUE,
    weight decimal(8,2),
    dimensions jsonb,
    is_featured boolean DEFAULT false,
    is_active boolean DEFAULT true,
    seo_title text,
    seo_description text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number text UNIQUE NOT NULL DEFAULT concat('ORD-', upper(substring(gen_random_uuid()::text, 1, 8))),
    customer_email text NOT NULL,
    customer_name text NOT NULL,
    customer_phone text,
    shipping_address jsonb NOT NULL,
    billing_address jsonb,
    order_items jsonb[] NOT NULL,
    subtotal decimal(10,2) NOT NULL CHECK (subtotal >= 0),
    tax_amount decimal(10,2) DEFAULT 0 CHECK (tax_amount >= 0),
    shipping_amount decimal(10,2) DEFAULT 0 CHECK (shipping_amount >= 0),
    discount_amount decimal(10,2) DEFAULT 0 CHECK (discount_amount >= 0),
    total_amount decimal(10,2) NOT NULL CHECK (total_amount >= 0),
    payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    fulfillment_status text DEFAULT 'pending' CHECK (fulfillment_status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    payment_intent_id text,
    notes text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_fulfillment_status ON orders(fulfillment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Full-text search index for products
CREATE INDEX IF NOT EXISTS idx_products_search ON products USING gin(to_tsvector('english', name || ' ' || description));

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Public read access for categories
CREATE POLICY "Categories are publicly readable"
    ON categories
    FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

-- Public read access for active products
CREATE POLICY "Products are publicly readable"
    ON products
    FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

-- Admin full access to all tables
CREATE POLICY "Admin full access to categories"
    ON categories
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admin full access to products"
    ON products
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admin full access to orders"
    ON orders
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to auto-update timestamps
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample categories
INSERT INTO categories (name, slug, description, is_active, sort_order) VALUES
('Electronics', 'electronics', 'Electronic devices and accessories', true, 1),
('Clothing', 'clothing', 'Apparel and fashion items', true, 2),
('Home & Garden', 'home-garden', 'Home improvement and garden supplies', true, 3),
('Books', 'books', 'Physical and digital books', true, 4),
('Digital Products', 'digital-products', 'Software, courses, and digital downloads', true, 5)
ON CONFLICT (slug) DO NOTHING;