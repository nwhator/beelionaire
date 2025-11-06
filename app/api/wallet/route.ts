import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabase-server'

export async function GET() {
  // Return simple wallet summary (placeholder)
  const { data: users } = await supabaseAdmin
    .from('User')
    .select('id, walletBalance')
  
  return NextResponse.json({ users })
}

export async function POST(request: Request) {
  try {
    const { userId, amount } = await request.json()
    
    // This would create a withdraw request; for now just decrement balance
    const { data: u, error } = await supabaseAdmin
      .from('User')
      .update({ walletBalance: amount })
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json({ ok: true, user: u })
  } catch (err) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
