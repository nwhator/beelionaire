'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import Card from '../../../components/ui/Card'

export default function AuthDebug() {
  const [session, setSession] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [cookies, setCookies] = useState<string>('')

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const { data: { user } } = await supabase.auth.getUser()
      
      setSession(session)
      setUser(user)
      setCookies(document.cookie)
    }

    checkAuth()

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, session)
      setSession(session)
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">🔍 Auth Debug Page</h1>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Session Status</h2>
          <div className="space-y-2">
            <p><strong>Has Session:</strong> {session ? '✅ Yes' : '❌ No'}</p>
            <p><strong>Has User:</strong> {user ? '✅ Yes' : '❌ No'}</p>
            {user && (
              <>
                <p><strong>User ID:</strong> {user.id}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Email Confirmed:</strong> {user.email_confirmed_at ? '✅' : '❌'}</p>
              </>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Session Details</h2>
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">User Details</h2>
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Cookies</h2>
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto whitespace-pre-wrap break-all">
            {cookies || 'No cookies found'}
          </pre>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Environment</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</p>
            <p><strong>Supabase Anon Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
            <p><strong>Site URL:</strong> {process.env.NEXT_PUBLIC_SITE_URL || 'Not set'}</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
