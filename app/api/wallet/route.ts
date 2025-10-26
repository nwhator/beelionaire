import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET() {
  // Return simple wallet summary (placeholder)
  const users = await prisma.user.findMany({ select: { id: true, walletBalance: true } })
  return NextResponse.json({ users })
}

export async function POST(request: Request) {
  try {
    const { userId, amount } = await request.json()
    // This would create a withdraw request; for now just decrement balance
    const u = await prisma.user.update({ where: { id: userId }, data: { walletBalance: { decrement: amount } } })
    return NextResponse.json({ ok: true, user: u })
  } catch (err) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
