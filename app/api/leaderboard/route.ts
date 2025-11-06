import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabase-server'

export async function GET() {
  const { data: top } = await supabaseAdmin
    .from('User')
    .select('id, name, points')
    .order('points', { ascending: false })
    .limit(50)
  
  return NextResponse.json({ leaderboard: top })
}
