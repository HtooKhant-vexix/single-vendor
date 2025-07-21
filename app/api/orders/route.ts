import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      customer_email,
      customer_name,
      customer_phone,
      shipping_address,
      order_items,
      subtotal,
      tax_amount = 0,
      shipping_amount = 0,
      discount_amount = 0,
      total_amount,
    } = body

    // Validate required fields
    if (!customer_email || !customer_name || !shipping_address || !order_items || order_items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create order in database
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .insert({
        customer_email,
        customer_name,
        customer_phone,
        shipping_address,
        billing_address: shipping_address, // Use shipping as billing for now
        order_items,
        subtotal,
        tax_amount,
        shipping_amount,
        discount_amount,
        total_amount,
        payment_status: 'pending',
        fulfillment_status: 'pending',
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      )
    }

    // In a real implementation, create Stripe payment intent here
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: Math.round(total_amount * 100),
    //   currency: 'usd',
    //   metadata: { order_id: order.id }
    // })

    return NextResponse.json({
      order,
      clientSecret: 'mock_client_secret', // Replace with actual Stripe client secret
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    const status = searchParams.get('status')

    let query = supabaseAdmin
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) {
      query = query.eq('payment_status', status)
    }

    const { data: orders, error } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
      )
    }

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Orders fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}