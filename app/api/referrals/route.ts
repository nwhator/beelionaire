import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'Missing code' }, { status: 400 })

  const ref = await prisma.user.findUnique({ where: { referralCode: code }, include: { referrals: true } })
  if (!ref) return NextResponse.json({ error: 'Referral not found' }, { status: 404 })

  return NextResponse.json({ referrer: ref.email, referrals: ref.referrals.length })
}

export async function POST(request: Request) {
  try {
    const { referrerId, referredId } = await request.json()
    const r = await prisma.referral.create({ data: { referrerId, referredId, bonus: 10 } })
    return NextResponse.json({ ok: true, r })
  } catch (err) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
