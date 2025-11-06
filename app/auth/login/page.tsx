"use client"
import React, { useState, Suspense } from 'react'
import { useAuth } from '../../../lib/auth-context'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetSent, setResetSent] = useState(false)
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
      // Check if it's an email confirmation issue
      if (error.message.includes('Email not confirmed') || 
          error.message.includes('email_not_confirmed') ||
          error.message.includes('not confirmed')) {
        setError('Please check your email and click the confirmation link before logging in. Check your spam folder if you don\'t see it.')
      } else {
        setError(error.message)
      }
      setLoading(false)
    } else {
      // Double check session is set
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.push(redirect)
      } else {
        setError('Login successful but session not set. Please try again.')
        setLoading(false)
      }
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first')
      return
    }

    setError('')
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/auth/reset-password`,
    })

    if (error) {
      setError(error.message)
    } else {
      setResetSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Log in</h2>
      <form onSubmit={handleSubmit} className="space-y-4 card">
        {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{error}</div>}
        {resetSent && (
          <div className="text-sm text-green-600 bg-green-50 p-3 rounded">
            Password reset link sent! Check your email.
          </div>
        )}
        
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
            placeholder="Password" 
            type={showPassword ? "text" : "password"}
            className="input pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-bee hover:underline"
            disabled={loading}
          >
            Forgot password?
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
      
      <p className="text-center mt-4 text-sm text-gray-600">
        Don't have an account?{' '}
        <a href="/auth/register" className="text-bee hover:underline">Sign up</a>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="max-w-md mx-auto">
        <div className="card">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
