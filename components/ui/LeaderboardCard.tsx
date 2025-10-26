import React from 'react'
import Card from './Card'

export default function LeaderboardCard({ rank, user }: { rank: number, user: { name?: string, points: number } }) {
  return (
    <Card className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold w-8 text-center">#{rank}</div>
        <div>
          <div className="font-semibold">{user.name ?? 'Anonymous'}</div>
          <div className="text-sm text-gray-500">{user.points} pts</div>
        </div>
      </div>
      <div className="text-sm text-gray-600">&nbsp;</div>
    </Card>
  )
}
