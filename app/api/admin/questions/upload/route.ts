import { NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!Array.isArray(body.questions)) return NextResponse.json({ error: 'questions must be an array' }, { status: 400 })

    const data = body.questions.map((q: any) => ({
      category: q.category ?? 'spelling',
      question: q.question,
      options: JSON.stringify(q.options ?? []),
      answer: q.answer,
    }))

    await prisma.question.createMany({ data })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
