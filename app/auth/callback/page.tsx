'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

export default function AuthCallback() {
  const router = useRouter()
  const [status, setStatus] = useState<string>('Processing...')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setStatus('Reading confirmation link...')
        
        // Get the full URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const searchParams = new URLSearchParams(window.location.search)
        
        // Log everything for debugging
        console.log('=== AUTH CALLBACK DEBUG ===')
        console.log('Hash:', window.location.hash)
        console.log('Search:', window.location.search)
        console.log('Hash Params:', Object.fromEntries(hashParams))
        console.log('Search Params:', Object.fromEntries(searchParams))

        // Get tokens from either source
        const accessToken = hashParams.get('access_token') || searchParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token') || searchParams.get('refresh_token')
        const tokenHash = hashParams.get('token_hash') || searchParams.get('token_hash')
        const type = hashParams.get('type') || searchParams.get('type')
        const error_code = hashParams.get('error_code') || searchParams.get('error_code')
        const error_description = hashParams.get('error_description') || searchParams.get('error_description')

        // Check for errors from Supabase
        if (error_code || error_description) {
          console.error('Supabase error:', { error_code, error_description })
          setStatus(`Error: ${error_description || error_code}`)
          setTimeout(() => router.push('/auth/login'), 3000)
          return
        }

        // Method 1: Direct tokens (old Supabase format)
        if (accessToken && refreshToken) {
          console.log('Using direct token method')
          setStatus('Logging you in...')
          
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })
          
          if (error) {
            console.error('setSession error:', error)
            setStatus('Login failed. Redirecting...')
            setTimeout(() => router.push('/auth/login'), 2000)
            return
          }

          console.log('Session set successfully:', !!data.session)
          setStatus('Success! Redirecting to dashboard...')
          
          // Force a hard redirect to ensure cookies are set
          setTimeout(() => {
            window.location.href = '/dashboard'
          }, 500)
          return
        }

        // Method 2: Token hash (new Supabase format)
        if (tokenHash && type) {
          console.log('Using token hash method, type:', type)
          setStatus('Verifying your email...')
          
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: type as any,
          })
          
          if (error) {
            console.error('verifyOtp error:', error)
            setStatus('Verification failed. Redirecting...')
            setTimeout(() => router.push('/auth/login'), 2000)
            return
          }

          console.log('OTP verified successfully:', !!data.session)
          setStatus('Success! Redirecting...')
          
          // Redirect based on type
          setTimeout(() => {
            if (type === 'recovery') {
              window.location.href = '/auth/reset-password'
            } else {
              window.location.href = '/dashboard'
            }
          }, 500)
          return
        }

        // Method 3: Check if already logged in (race condition)
        setStatus('Checking authentication status...')
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session) {
          console.log('Already have session, redirecting')
          setStatus('Already logged in! Redirecting...')
          setTimeout(() => {
            window.location.href = '/dashboard'
          }, 500)
          return
        }

        // No valid authentication method found
        console.error('No valid auth method found')
        setStatus('Invalid confirmation link. Redirecting to login...')
        setTimeout(() => router.push('/auth/login'), 3000)

      } catch (err: any) {
        console.error('=== CALLBACK ERROR ===', err)
        setStatus(`Error: ${err.message || 'Unknown error'}`)
        setTimeout(() => router.push('/auth/login'), 3000)
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--bee)] to-[var(--duo)]">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center space-y-4">
          {status.includes('Error') || status.includes('failed') || status.includes('Invalid') ? (
            <>
              <div className="text-6xl mb-4">❌</div>
              <p className="text-lg font-semibold text-red-600">{status}</p>
              <div className="text-sm text-gray-500">
                <p>Don't worry! You can try:</p>
                <ul className="mt-2 space-y-1">
                  <li>• Logging in with your password</li>
                  <li>• Requesting a new confirmation email</li>
                </ul>
              </div>
            </>
          ) : status.includes('Success') ? (
            <>
              <div className="text-6xl mb-4">✅</div>
              <p className="text-lg font-semibold text-green-600">{status}</p>
            </>
          ) : (
            <>
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-[var(--bee)] border-t-transparent mx-auto mb-4"></div>
                <div className="absolute inset-0 flex items-center justify-center text-2xl">
                  🐝
                </div>
              </div>
              <p className="text-lg font-semibold">{status}</p>
              <p className="text-sm text-gray-500">This will only take a moment</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
