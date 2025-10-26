import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET() {
  const questions = await prisma.question.findMany()
  return NextResponse.json({ questions })
}

export async function POST(request: Request) {
  try {
    const { category, question, options, answer } = await request.json()
    const q = await prisma.question.create({ data: { category, question, options, answer } })
    return NextResponse.json({ ok: true, q })
  } catch (err) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
