export const dynamic = 'force-dynamic'

import { prisma } from '../../lib/prisma'
import WalletSummary from '../../components/ui/WalletSummary'
import ReferralWidget from '../../components/ui/ReferralWidget'
import LeaderboardCard from '../../components/ui/LeaderboardCard'
import Card from '../../components/ui/Card'

export default async function DashboardPage() {
  // TODO: replace with session user id
  const user = await prisma.user.findFirst({ where: {}, select: { id: true, name: true, referralCode: true, walletBalance: true } })
  const top = await prisma.user.findMany({ orderBy: { points: 'desc' }, take: 5, select: { id: true, name: true, points: true } })

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold">Dashboard</h2>
        <div className="text-sm text-gray-600">Welcome back, {user?.name ?? 'Player'}</div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <WalletSummary balance={user?.walletBalance ?? 0} />

          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Quick Play</h3>
              <div className="text-sm text-gray-500">Try today's quiz</div>
            </div>
            <div>
              <a href="/quiz" className="inline-block px-4 py-2 rounded-2xl bg-yellow-500 text-black font-semibold shadow">Play Quiz</a>
            </div>
          </Card>
        </div>

        <aside className="space-y-4">
          <ReferralWidget code={user?.referralCode ?? '—'} />

          <Card>
            <h3 className="text-lg font-semibold mb-3">Leaderboard</h3>
            <div className="space-y-3">
              {top.map((u: { id: string; name?: string | null; points: number }, i: number) => (
                <LeaderboardCard key={u.id} rank={i + 1} user={{ name: u.name ?? undefined, points: u.points }} />
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </section>
  )
}
