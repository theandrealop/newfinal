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
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request) {
  if (!stripe || !endpointSecret) {
    console.error('Stripe or webhook secret not configured')
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 })
  }

  console.log('Received Stripe event:', event.type)

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object
      await handleSuccessfulPayment(session)
      break
    case 'invoice.payment_succeeded':
      const invoice = event.data.object
      await handleSuccessfulPayment(invoice)
      break
    case 'customer.subscription.created':
      const newSubscription = event.data.object
      await handleSubscriptionCreated(newSubscription)
      break
    case 'customer.subscription.updated':
      const updatedSubscription = event.data.object
      await handleSubscriptionUpdated(updatedSubscription)
      break
    case 'customer.subscription.deleted':
      const subscription = event.data.object
      await handleCancelledSubscription(subscription)
      break
    case 'invoice.payment_failed':
      const failedInvoice = event.data.object
      await handleFailedPayment(failedInvoice)
      break
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

async function handleSuccessfulPayment(session) {
  console.log('Payment successful:', session.id)
  try {
    // Qui puoi implementare la logica per:
    // 1. Attivare l'abbonamento nel database
    // 2. Inviare email di conferma
    // 3. Aggiornare lo stato dell'utente
    // 4. Log dell'evento
    
    // Esempio di implementazione base:
    // await updateUserSubscription(session.customer, session.subscription)
    // await sendConfirmationEmail(session.customer_email)
    
  } catch (error) {
    console.error('Error handling successful payment:', error)
  }
}

async function handleSubscriptionCreated(subscription) {
  console.log('Subscription created:', subscription.id)
  try {
    // Logica per gestire nuovo abbonamento
    // await activateUserSubscription(subscription.customer, subscription.id)
  } catch (error) {
    console.error('Error handling subscription creation:', error)
  }
}

async function handleSubscriptionUpdated(subscription) {
  console.log('Subscription updated:', subscription.id)
  try {
    // Logica per gestire aggiornamento abbonamento
    // await updateUserSubscriptionStatus(subscription.customer, subscription)
  } catch (error) {
    console.error('Error handling subscription update:', error)
  }
}

async function handleCancelledSubscription(subscription) {
  console.log('Subscription cancelled:', subscription.id)
  try {
    // Logica per gestire cancellazione abbonamento
    // await deactivateUserSubscription(subscription.customer, subscription.id)
    // await sendCancellationEmail(subscription.customer)
  } catch (error) {
    console.error('Error handling subscription cancellation:', error)
  }
}

async function handleFailedPayment(invoice) {
  console.log('Payment failed for invoice:', invoice.id)
  try {
    // Logica per gestire pagamento fallito
    // await notifyPaymentFailure(invoice.customer, invoice.id)
    // await sendPaymentFailureEmail(invoice.customer_email)
  } catch (error) {
    console.error('Error handling failed payment:', error)
  }
}