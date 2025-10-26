import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, questionId, answer } = body

    const question = await prisma.question.findUnique({ where: { id: questionId } })
    if (!question) return NextResponse.json({ error: 'Question not found' }, { status: 404 })

    const isCorrect = question.answer === answer

    await prisma.quiz.create({ data: { userId, questionId, isCorrect } })

    return NextResponse.json({ isCorrect })
  } catch (err) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
