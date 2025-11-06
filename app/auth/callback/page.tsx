'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

export default function AuthCallback() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Handle both URL params and hash fragments
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const searchParams = new URLSearchParams(window.location.search)
        
        const accessToken = hashParams.get('access_token') || searchParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token') || searchParams.get('refresh_token')
        const tokenHash = hashParams.get('token_hash') || searchParams.get('token_hash')
        const type = hashParams.get('type') || searchParams.get('type')
        
        console.log('Callback params:', { accessToken: !!accessToken, refreshToken: !!refreshToken, tokenHash: !!tokenHash, type })

        if (accessToken && refreshToken) {
          // Direct token in URL (from email confirmation)
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })
          
          if (error) {
            console.error('Error setting session:', error)
            setError('Failed to set session')
            setTimeout(() => router.push('/auth/login?error=session_failed'), 2000)
            return
          }
        } else if (tokenHash && type) {
          // Token hash (new Supabase format)
          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: type as any,
          })
          
          if (error) {
            console.error('Error verifying OTP:', error)
            setError('Failed to verify email')
            setTimeout(() => router.push('/auth/login?error=verification_failed'), 2000)
            return
          }
        }

        // Wait a bit for session to be set
        await new Promise(resolve => setTimeout(resolve, 500))

        // Check session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        console.log('Session check:', { hasSession: !!session, error: sessionError })

        if (sessionError || !session) {
          console.error('No session found:', sessionError)
          setError('No session found')
          setTimeout(() => router.push('/auth/login?error=no_session'), 2000)
          return
        }

        // Successfully authenticated, redirect based on type
        console.log('Auth successful, redirecting...')
        if (type === 'recovery') {
          router.push('/auth/reset-password')
        } else {
          router.push('/dashboard')
        }
      } catch (err) {
        console.error('Callback error:', err)
        setError('An error occurred')
        setTimeout(() => router.push('/auth/login'), 2000)
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        {error ? (
          <>
            <div className="text-4xl mb-4">❌</div>
            <p className="text-lg text-red-600">{error}</p>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bee mx-auto mb-4"></div>
            <p className="text-lg">Confirming your email...</p>
            <p className="text-sm text-gray-500">Please wait</p>
          </>
        )}
      </div>
    </div>
  )
}
