export const dynamic = 'force-dynamic'

import { supabaseAdmin } from '../../lib/supabase-server'
import LeaderboardCard from '../../components/ui/LeaderboardCard'

export default async function LeaderboardPage() {
  const { data: top } = await supabaseAdmin
    .from('User')
    .select('id, name, points')
    .order('points', { ascending: false })
    .limit(50)

  return (
    <section className="space-y-6 animate-fade-up">
      <header className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold animate-pop">Leaderboard</h2>
        <div className="text-sm muted">Top players</div>
      </header>

      <div className="space-y-3 stagger">
        {top?.map((u, i) => (
          <div key={u.id} className="animate-pop">
            <LeaderboardCard rank={i + 1} user={{ name: u.name ?? undefined, points: u.points }} />
          </div>
        ))}
      </div>
    </section>
  )
}
