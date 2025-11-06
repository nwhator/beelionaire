'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Hardcoded admin credentials
    if (username === 'justbee' && password === 'Beelionaire@01') {
      // Store admin session
      localStorage.setItem('adminAuth', 'true')
      router.push('/admin/dashboard')
    } else {
      setError('Invalid username or password')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-pop">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">🔐 Admin Login</h1>
          <p className="muted">Access admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input w-full"
              placeholder="Enter admin username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login as Admin'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <a href="/auth/login" className="text-sm muted hover:text-[var(--bee)]">
            ← Back to user login
          </a>
        </div>
      </Card>
    </div>
  )
}
