'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '../../lib/auth-context'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import WalletSummary from '../../components/ui/WalletSummary'
import ReferralWidget from '../../components/ui/ReferralWidget'
import LeaderboardCard from '../../components/ui/LeaderboardCard'
import Card from '../../components/ui/Card'

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [topUsers, setTopUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check auth
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/dashboard')
      return
    }

    if (user) {
      loadData()
    }
  }, [user, authLoading, router])

  const loadData = async () => {
    try {
      // Get current user data
      const { data: currentUser } = await supabase
        .from('User')
        .select('id, name, referralCode, balance')
        .eq('id', user?.id)
        .single()

      // Get top users
      const { data: top } = await supabase
        .from('User')
        .select('id, name, points')
        .order('points', { ascending: false })
        .limit(5)

      setUserData(currentUser)
      setTopUsers(top || [])
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bee mx-auto"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect
  }

  return (
    <section className="space-y-6 animate-fade-up">
      <header className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold animate-pop">Dashboard</h2>
        <div className="text-sm muted">Welcome back, {userData?.name || user.email}</div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="animate-pop">
            <WalletSummary balance={userData?.balance ?? 0} />
          </div>

          <Card className="animate-pop">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Quick Play</h3>
              <div className="text-sm muted">Try today's quiz</div>
            </div>
            <div>
              <a href="/quiz" className="btn btn-primary">Play Quiz</a>
            </div>
          </Card>
        </div>

        <aside className="space-y-4">
          <div className="animate-pop">
            <ReferralWidget code={userData?.referralCode ?? '—'} />
          </div>

          <Card>
            <h3 className="text-lg font-semibold mb-3">Leaderboard</h3>
            <div className="space-y-3">
              {topUsers.map((u, i) => (
                <div key={u.id} className="animate-pop">
                  <LeaderboardCard rank={i + 1} user={{ name: u.name, points: u.points }} />
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </section>
  )
}
