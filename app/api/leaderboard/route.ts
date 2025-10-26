import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET() {
  const top = await prisma.user.findMany({ orderBy: { points: 'desc' }, take: 50, select: { id: true, name: true, points: true } })
  return NextResponse.json({ leaderboard: top })
}
