export const dynamic = 'force-dynamic'

import { supabaseAdmin } from '../../lib/supabase-server'
import WalletSummary from '../../components/ui/WalletSummary'
import ReferralWidget from '../../components/ui/ReferralWidget'
import LeaderboardCard from '../../components/ui/LeaderboardCard'
import Card from '../../components/ui/Card'

export default async function DashboardPage() {
  // TODO: replace with session user id
  const { data: user } = await supabaseAdmin
    .from('User')
    .select('id, name, referralCode, walletBalance')
    .limit(1)
    .single()

  const { data: top } = await supabaseAdmin
    .from('User')
    .select('id, name, points')
    .order('points', { ascending: false })
    .limit(5)

  if (!user) return <div className="animate-fade-up">No user found</div>

  return (
    <section className="space-y-6 animate-fade-up">
      <header className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold animate-pop">Dashboard</h2>
        <div className="text-sm muted">Welcome back, {user?.name ?? 'Player'}</div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="animate-pop">
            <WalletSummary balance={user?.walletBalance ?? 0} />
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
            <ReferralWidget code={user?.referralCode ?? '—'} />
          </div>

          <Card>
            <h3 className="text-lg font-semibold mb-3">Leaderboard</h3>
            <div className="space-y-3 stagger">
              {top?.map((u: { id: string; name?: string | null; points: number }, i: number) => (
                <div key={u.id} className="animate-pop">
                  <LeaderboardCard rank={i + 1} user={{ name: u.name ?? undefined, points: u.points }} />
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </section>
  )
}
