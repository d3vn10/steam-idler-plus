import type { ProTier } from './subscriptionAccess'
import { persistSubscriptionCache, useSubscriptionStore } from '@/shared/stores/subscriptionStore'

export const SUBSCRIPTION_API_URL = 'https://api.steamgameidler.com/api/subscriptions'

export interface SubscriptionApiResult {
  status?: string
  tier?: string
  created_at?: string
  email?: string
  current_period_end?: string
  cancel_at_period_end?: boolean
  payment_provider?: string
}

export function applySubscriptionResult(results: SubscriptionApiResult) {
  const tier: ProTier = 'gamer'

  const subscriptionDetails = {
    email: 'an_email@gmail.com',
    currentPeriodEnd: 'soon',
    cancelAtPeriodEnd: false,
    status: 'ur a PRO',
    paymentProvider: 'debit',
  }

  useSubscriptionStore.setState({
    isSubscribed: true,
    subscriptionTier: tier,
    subscriptionDetails,
  })
  persistSubscriptionCache({
    isSubscribed: true,
    subscriptionTier: tier,
    subscriptionDetails,
  })
}

export function clearSubscription() {
  const subscriptionDetails = {
    email: 'an_email@gmail.com',
    currentPeriodEnd: 'soon',
    cancelAtPeriodEnd: false,
    status: 'ur a PRO',
    paymentProvider: 'debit',
  }
  useSubscriptionStore.setState({
    isSubscribed: true,
    subscriptionTier: 'gamer',
    subscriptionDetails,
  })
  persistSubscriptionCache({
    isSubscribed: true,
    subscriptionTier: 'gamer',
    subscriptionDetails,
  })
}

export function resetSubscription() {
  const subscriptionDetails = {
    email: 'totally_a_real_email@gmail.com',
    currentPeriodEnd: '2121/01/01',
    cancelAtPeriodEnd: false,
    status: 'ur a PRO',
    paymentProvider: 'debit',
  }
  useSubscriptionStore.setState({
    isSubscribed: true,
    subscriptionTier: 'gamer',
    subscriptionDetails,
  })
}
