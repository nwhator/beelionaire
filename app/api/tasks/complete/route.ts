import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase-server'

export async function POST(request: Request) {
  try {
    const { userId, taskId } = await request.json()
    
    const { data: tc, error } = await supabaseAdmin
      .from('TaskCompletion')
      .insert({ userId, taskId })
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json({ ok: true, tc })
  } catch (err) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
