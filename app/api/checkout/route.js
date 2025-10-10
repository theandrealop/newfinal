import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

const initializeStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    console.warn('STRIPE_SECRET_KEY not found in environment variables')
    return null
  }
  return new Stripe(secretKey, {
    apiVersion: '2023-10-16',
  })
}

const stripe = initializeStripe()

export async function POST(request) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
    }

    const { priceId, customerId, customerEmail } = await request.json()

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 })
    }

    // Crea una sessione di checkout Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/premium`,
      customer: customerId, // Opzionale: se hai già un customer ID
      customer_email: customerEmail, // Opzionale: se vuoi pre-compilare l'email
      metadata: {
        priceId: priceId,
      },
      subscription_data: {
        metadata: {
          priceId: priceId,
        },
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    )
  }
}