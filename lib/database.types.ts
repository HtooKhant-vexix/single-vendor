export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          compare_at_price: number | null
          category: string
          subcategory: string | null
          tags: string[] | null
          images: string[]
          inventory_count: number
          is_digital: boolean
          digital_file_url: string | null
          sku: string | null
          weight: number | null
          dimensions: Json | null
          is_featured: boolean
          is_active: boolean
          seo_title: string | null
          seo_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          compare_at_price?: number | null
          category: string
          subcategory?: string | null
          tags?: string[] | null
          images?: string[]
          inventory_count?: number
          is_digital?: boolean
          digital_file_url?: string | null
          sku?: string | null
          weight?: number | null
          dimensions?: Json | null
          is_featured?: boolean
          is_active?: boolean
          seo_title?: string | null
          seo_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          compare_at_price?: number | null
          category?: string
          subcategory?: string | null
          tags?: string[] | null
          images?: string[]
          inventory_count?: number
          is_digital?: boolean
          digital_file_url?: string | null
          sku?: string | null
          weight?: number | null
          dimensions?: Json | null
          is_featured?: boolean
          is_active?: boolean
          seo_title?: string | null
          seo_description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          shipping_address: Json
          billing_address: Json | null
          order_items: Json[]
          subtotal: number
          tax_amount: number
          shipping_amount: number
          discount_amount: number
          total_amount: number
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
          fulfillment_status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          payment_intent_id: string | null
          order_number: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          shipping_address: Json
          billing_address?: Json | null
          order_items: Json[]
          subtotal: number
          tax_amount?: number
          shipping_amount?: number
          discount_amount?: number
          total_amount: number
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          fulfillment_status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          payment_intent_id?: string | null
          order_number?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          shipping_address?: Json
          billing_address?: Json | null
          order_items?: Json[]
          subtotal?: number
          tax_amount?: number
          shipping_amount?: number
          discount_amount?: number
          total_amount?: number
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          fulfillment_status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          payment_intent_id?: string | null
          order_number?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          is_active: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
      }
    }
  }
}

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]