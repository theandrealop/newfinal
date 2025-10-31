export const STRIPE_PLANS = {
  premium: {
    name: 'Premium',
    monthly: {
      price: 4.90,
      priceId: 'price_1RkqssLhwgrXzl4cHffnRCCn',
      checkoutUrl: 'https://buy.stripe.com/28EbJ2chK8S20LycPF9AA06'
    },
    yearly: {
      price: 49.90,
      priceId: 'price_1Rlt5sLhwgrXzl4cjs4vicMF',
      checkoutUrl: 'https://buy.stripe.com/eVq00ka9C8S2dyk9Dt9AA05'
    }
  },
  elite: {
    name: 'Elite',
    monthly: {
      price: 19.90,
      priceId: 'price_1RkssfLhwgrXzl4cMXVOdKdW',
      checkoutUrl: 'https://buy.stripe.com/14A8wQa9CfgqbqceXN9AA03'
    },
    yearly: {
      price: 199.90,
      priceId: 'price_1Rlt6ELhwgrXzl4cO1G0R5y7',
      checkoutUrl: 'https://buy.stripe.com/8x214odlO6JU2TG3f59AA04'
    }
  }
}

export const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  secretKey: process.env.STRIPE_SECRET_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET
}