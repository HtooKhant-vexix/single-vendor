import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabaseAdmin
      .from('products')
      .select('*')
      .eq('is_active', true)
      .range(offset, offset + limit - 1)

    if (category) {
      query = query.eq('category', category)
    }

    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }

    if (search) {
      query = query.textSearch('name,description', search)
    }

    query = query.order('created_at', { ascending: false })

    const { data: products, error } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      )
    }

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Products fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      name,
      description,
      price,
      compare_at_price,
      category,
      subcategory,
      tags = [],
      images = [],
      inventory_count = 0,
      is_digital = false,
      digital_file_url,
      sku,
      weight,
      dimensions,
      is_featured = false,
      is_active = true,
      seo_title,
      seo_description,
    } = body

    // Validate required fields
    if (!name || !description || !price || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: name, description, price, category' },
        { status: 400 }
      )
    }

    // Create product in database
    const { data: product, error } = await supabaseAdmin
      .from('products')
      .insert({
        name,
        description,
        price,
        compare_at_price,
        category,
        subcategory,
        tags,
        images,
        inventory_count,
        is_digital,
        digital_file_url,
        sku,
        weight,
        dimensions,
        is_featured,
        is_active,
        seo_title: seo_title || name,
        seo_description: seo_description || description.substring(0, 160),
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      )
    }

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error('Product creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}