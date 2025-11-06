import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabase-server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'Missing code' }, { status: 400 })

  const { data: ref } = await supabaseAdmin
    .from('User')
    .select('email, id')
    .eq('referralCode', code)
    .single()
  
  if (!ref) return NextResponse.json({ error: 'Referral not found' }, { status: 404 })

  const { data: referrals } = await supabaseAdmin
    .from('Referral')
    .select('*')
    .eq('referrerId', ref.id)

  return NextResponse.json({ referrer: ref.email, referrals: referrals?.length || 0 })
}

export async function POST(request: Request) {
  try {
    const { referrerId, referredUserId } = await request.json()
    
    const { data: r, error } = await supabaseAdmin
      .from('Referral')
      .insert({ referrerId, referredUserId, rewardAmount: 10 })
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json({ ok: true, r })
  } catch (err) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
