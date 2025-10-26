import { prisma } from '../../lib/prisma'
import WalletSummary from '../../components/ui/WalletSummary'
import ReferralWidget from '../../components/ui/ReferralWidget'

export default async function DashboardPage() {
  // TODO: replace with session user id
  const user = await prisma.user.findFirst({ where: {}, select: { id: true, name: true, referralCode: true, walletBalance: true } })

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <WalletSummary balance={user?.walletBalance ?? 0} />
        </div>
        <div>
          <ReferralWidget code={user?.referralCode ?? '—'} />
        </div>
      </div>
    </section>
  )
}
