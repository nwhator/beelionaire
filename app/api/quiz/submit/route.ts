import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase-server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, questionId, answer } = body

    const { data: question } = await supabaseAdmin
      .from('Question')
      .select('*')
      .eq('id', questionId)
      .single()
    
    if (!question) return NextResponse.json({ error: 'Question not found' }, { status: 404 })

    const isCorrect = question.correctAnswer === answer

    await supabaseAdmin
      .from('Quiz')
      .insert({ 
        userId, 
        questionId, 
        selectedAnswer: answer,
        isCorrect,
        pointsEarned: isCorrect ? 10 : 0
      })

    return NextResponse.json({ isCorrect })
  } catch (err) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
