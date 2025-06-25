'use client'

import { useState } from 'react'

export default function StripePage() {
  const [apiKey, setApiKey] = useState('')
  const [webhookSecret, setWebhookSecret] = useState('')
  const [isConfigured, setIsConfigured] = useState(false)

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault()
    // This would typically save to environment variables or database
    setIsConfigured(true)
    alert('Stripe configuration saved! (This is a placeholder - actual implementation would save to your environment)')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Stripe Integration</h1>
        <p className="text-gray-400">Configure Stripe for payment processing</p>
      </div>

      <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4">
        <div className="flex items-center">
          <span className="text-yellow-400 mr-2">⚠️</span>
          <p className="text-yellow-200">
            This is a placeholder setup. In production, you&aposll need to properly configure Stripe with environment variables and secure API handling.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Configuration Form */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Stripe Configuration</h2>
          
          <form onSubmit={handleSaveConfig} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stripe Secret Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-faded-gold focus:outline-none text-white"
                placeholder="sk_test_..."
              />
              <p className="text-xs text-gray-400 mt-1">
                Your Stripe secret key from the Stripe Dashboard
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Webhook Endpoint Secret
              </label>
              <input
                type="password"
                value={webhookSecret}
                onChange={(e) => setWebhookSecret(e.target.value)}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-faded-gold focus:outline-none text-white"
                placeholder="whsec_..."
              />
              <p className="text-xs text-gray-400 mt-1">
                Webhook secret for secure event verification
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-faded-gold text-black py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              Save Configuration
            </button>
          </form>

          {isConfigured && (
            <div className="mt-4 bg-green-900/20 border border-green-600 rounded-lg p-3">
              <p className="text-green-200 text-sm">✅ Stripe configuration saved successfully!</p>
            </div>
          )}
        </div>

        {/* Setup Instructions */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Setup Instructions</h2>
          
          <div className="space-y-4 text-sm text-gray-300">
            <div>
              <h3 className="font-semibold text-faded-gold mb-2">1. Create Stripe Account</h3>
              <p>Sign up at <a href="https://stripe.com" target="_blank" className="text-blue-400 hover:underline">stripe.com</a> and complete your account setup.</p>
            </div>

            <div>
              <h3 className="font-semibold text-faded-gold mb-2">2. Get API Keys</h3>
              <p>Navigate to Developers → API keys in your Stripe Dashboard to find your secret key.</p>
            </div>

            <div>
              <h3 className="font-semibold text-faded-gold mb-2">3. Configure Webhooks</h3>
              <p>Set up webhook endpoints to handle payment events securely.</p>
            </div>

            <div>
              <h3 className="font-semibold text-faded-gold mb-2">4. Test Integration</h3>
              <p>Use Stripe&aposs test mode to verify your payment flow before going live.</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-900 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Environment Variables Needed:</h4>
            <code className="text-xs text-gray-400 block">
              STRIPE_SECRET_KEY=sk_test_...<br/>
              STRIPE_WEBHOOK_SECRET=whsec_...<br/>
              NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
            </code>
          </div>
        </div>
      </div>

      {/* Payment Features */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Payment Features to Implement</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-faded-gold mb-2">Event Bookings</h3>
            <p className="text-sm text-gray-400">Accept payments for ghost hunts and paranormal events</p>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-faded-gold mb-2">Service Payments</h3>
            <p className="text-sm text-gray-400">Process payments for tarot readings, reiki healing, etc.</p>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-faded-gold mb-2">Subscription Plans</h3>
            <p className="text-sm text-gray-400">Offer monthly memberships for exclusive content</p>
          </div>
        </div>
      </div>
    </div>
  )
}