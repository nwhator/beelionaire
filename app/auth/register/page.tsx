"use client"
import React, { useState } from 'react'
import { useAuth } from '../../../lib/auth-context'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    const { error } = await signUp(email, password, name)
    
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto">
        <div className="card space-y-4 text-center">
          <div className="text-6xl">📧</div>
          <h2 className="text-2xl font-semibold">Check your email!</h2>
          <p className="text-gray-600">
            We've sent a confirmation link to <strong>{email}</strong>
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-left">
            <p className="font-semibold mb-2">📝 Next steps:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Check your email inbox</li>
              <li>Click the confirmation link</li>
              <li>You'll be automatically logged in</li>
            </ol>
          </div>
          <p className="text-sm text-gray-500">
            💡 Can't find it? Check your spam folder or{' '}
            <button 
              onClick={() => setSuccess(false)} 
              className="text-bee hover:underline"
            >
              try again
            </button>
          </p>
        </div>
      </div>
    )
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
        
        <div className="relative">
          <input 
            placeholder="Password (min. 6 characters)" 
            type={showPassword ? "text" : "password"}
            className="input pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        
        <input placeholder="Referral code (optional)" className="input" />
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </div>
      </form>
      
      <p className="text-center mt-4 text-sm text-gray-600">
        Already have an account?{' '}
        <a href="/auth/login" className="text-bee hover:underline">Log in</a>
      </p>
    </div>
  )
}
