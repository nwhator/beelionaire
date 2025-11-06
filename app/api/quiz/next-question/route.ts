import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase-server'

export async function GET() {
  // Simple next-question stub: return a random question from DB
  try {
    const { data: question } = await supabaseAdmin
      .from('Question')
      .select('*')
      .limit(1)
      .single()
    
    return NextResponse.json({ question })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
