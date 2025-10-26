export const dynamic = 'force-dynamic'

import { prisma } from '../../lib/prisma'
import LeaderboardCard from '../../components/ui/LeaderboardCard'

export default async function LeaderboardPage() {
  const top: { id: string; name: string | null; points: number }[] = await prisma.user.findMany({ orderBy: { points: 'desc' }, take: 50, select: { id: true, name: true, points: true } })

  return (
    <section className="space-y-6 animate-fade-up">
      <header className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold animate-pop">Leaderboard</h2>
        <div className="text-sm muted">Top players</div>
      </header>

      <div className="space-y-3 stagger">
        {top.map((u, i) => (
          <div key={u.id} className="animate-pop">
            <LeaderboardCard rank={i + 1} user={{ name: u.name ?? undefined, points: u.points }} />
          </div>
        ))}
      </div>
    </section>
  )
}
