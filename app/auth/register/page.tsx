"use client"
import React, { useState } from 'react'
import { useAuth } from '../../../lib/auth-context'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await signUp(email, password, name)
    
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create account</h2>
      <form onSubmit={handleSubmit} className="space-y-4 card">
        {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>}
        
        <input 
          placeholder="Name" 
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          minLength={6}
        />
        <input placeholder="Referral code (optional)" className="input" />
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </div>
      </form>
    </div>
  )
}
