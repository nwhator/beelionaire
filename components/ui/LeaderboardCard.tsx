import React from 'react'
import Card from './Card'

export default function LeaderboardCard({ rank, user }: { rank: number, user: { name?: string, points: number } }) {
  return (
    <Card className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold shadow-md">{rank}</div>
        <div>
          <div className="font-semibold">{user.name ?? 'Anonymous'}</div>
          <div className="text-sm text-yellow-700">{user.points} pts</div>
        </div>
      </div>
      <div className="text-sm text-gray-600">&nbsp;</div>
    </Card>
  )
}
