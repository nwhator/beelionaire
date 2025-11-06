'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '../../lib/auth-context'
import { useRouter } from 'next/navigation'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

type AccountType = 'bank' | 'mobile_money'

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    accountType: 'bank' as AccountType,
    accountName: '',
    accountNumber: '',
    bankName: '',
    phoneNumber: '',
  })

  useEffect(() => {
    if (user) {
      // Fetch user profile
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    if (!user) return

    try {
      const res = await fetch(`/api/user/profile?userId=${user.id}`)
      const data = await res.json()
      
      if (data.profile) {
        setFormData({
          name: data.profile.name || '',
          email: data.profile.email || '',
          accountType: data.profile.accountType || 'bank',
          accountName: data.profile.accountName || '',
          accountNumber: data.profile.accountNumber || '',
          bankName: data.profile.bankName || '',
          phoneNumber: data.profile.phoneNumber || '',
        })
      }
    } catch (err) {
      console.error('Failed to fetch profile', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          ...formData,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Update failed')
      }

      setMessage('✅ Profile updated successfully!')
    } catch (err: any) {
      setError(err.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">👤 My Profile</h1>
        <Button onClick={() => router.push('/dashboard')} variant="ghost">
          ← Dashboard
        </Button>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              className="input w-full bg-gray-100"
              disabled
            />
          </div>

          <div className="border-t pt-4 mt-6">
            <h3 className="font-semibold mb-3">💰 Withdrawal Account Details</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Account Type</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="bank"
                    checked={formData.accountType === 'bank'}
                    onChange={(e) => setFormData({ ...formData, accountType: 'bank' })}
                    className="mr-2"
                  />
                  Bank Account
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="mobile_money"
                    checked={formData.accountType === 'mobile_money'}
                    onChange={(e) => setFormData({ ...formData, accountType: 'mobile_money' })}
                    className="mr-2"
                  />
                  Mobile Money
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Account Name</label>
              <input
                type="text"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                className="input w-full"
                placeholder="John Doe"
              />
            </div>

            {formData.accountType === 'bank' ? (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    className="input w-full"
                    placeholder="First Bank"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Account Number</label>
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    className="input w-full"
                    placeholder="1234567890"
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="input w-full"
                  placeholder="+234 123 456 7890"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm">
              {message}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Saving...' : 'Save Profile'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
