'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      const { error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error during auth callback:', error)
        router.push('/auth/login?error=callback_failed')
        return
      }

      // Successfully authenticated, redirect to dashboard
      router.push('/dashboard')
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
