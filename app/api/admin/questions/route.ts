import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase-server'

export async function GET() {
  const { data: questions } = await supabaseAdmin
    .from('Question')
    .select('*')
  
  return NextResponse.json({ questions })
}

export async function POST(request: Request) {
  try {
    const { category, question, options, correctAnswer, difficulty } = await request.json()
    
    const { data: q, error } = await supabaseAdmin
      .from('Question')
      .insert({ category, question, options, correctAnswer, difficulty })
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json({ ok: true, q })
  } catch (err) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
