'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      // Handle both URL params and hash fragments
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const searchParams = new URLSearchParams(window.location.search)
      
      const accessToken = hashParams.get('access_token') || searchParams.get('access_token')
      const refreshToken = hashParams.get('refresh_token') || searchParams.get('refresh_token')
      const tokenHash = hashParams.get('token_hash') || searchParams.get('token_hash')
      const type = hashParams.get('type') || searchParams.get('type')
      
      if (accessToken && refreshToken) {
        // Direct token in URL (from email confirmation)
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        
        if (error) {
          console.error('Error setting session:', error)
          router.push('/auth/login?error=session_failed')
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
          router.push('/auth/login?error=verification_failed')
          return
        }
      }

      // Check session
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error || !session) {
        console.error('Error getting session:', error)
        router.push('/auth/login?error=callback_failed')
        return
      }

      // Successfully authenticated, redirect based on type
      if (type === 'recovery') {
        router.push('/auth/reset-password')
      } else {
        router.push('/dashboard')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bee mx-auto mb-4"></div>
        <p className="text-lg">Confirming your email...</p>
      </div>
    </div>
  )
}
