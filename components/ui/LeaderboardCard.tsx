import React from 'react'
import Card from './Card'

export default function LeaderboardCard({ rank, user }: { rank: number, user: { name?: string, points: number } }) {
  const medalClass = rank === 1 ? 'rank-gold' : rank === 2 ? 'rank-silver' : rank === 3 ? 'rank-bronze' : ''

  return (
    <Card className="flex items-center justify-between gap-4 tile-press" role="listitem">
      <div className="flex items-center gap-3">
        <div className={`rank ${medalClass}`}>{rank}</div>
        <div>
          <div className="font-semibold">{user.name ?? 'Anonymous'}</div>
          <div className="text-sm badge-bee">{user.points} pts</div>
        </div>
      </div>
      <div className="text-sm muted">&nbsp;</div>
    </Card>
  )
}
