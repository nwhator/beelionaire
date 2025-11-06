"use client"
import React, { useState } from 'react'
import { useAuth } from '../../../lib/auth-context'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await signIn(email, password)
    
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push(redirect)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Log in</h2>
      <form onSubmit={handleSubmit} className="space-y-4 card">
        {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>}
        
        <input 
          placeholder="Email" 
          type="email" 
          className="input" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          placeholder="Password" 
          type="password" 
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  )
}
