import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../../lib/supabase-server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!Array.isArray(body.questions)) {
      return NextResponse.json({ error: 'questions must be an array' }, { status: 400 })
    }

    const data = body.questions.map((q: any) => ({
      category: q.category ?? 'General',
      question: q.question,
      options: q.options ?? [],
      correctAnswer: q.correctAnswer || q.answer,
      difficulty: q.difficulty ?? 'EASY',
    }))

    const { error } = await supabaseAdmin
      .from('Question')
      .insert(data)
    
    if (error) throw error
    
    return NextResponse.json({ ok: true, count: data.length })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Bad request' }, { status: 400 })
  }
}
