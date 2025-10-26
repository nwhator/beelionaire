import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function POST(request: Request) {
  try {
    const { userId, taskId } = await request.json()
    const tc = await prisma.taskCompletion.create({ data: { userId, taskId, completed: true } })
    return NextResponse.json({ ok: true, tc })
  } catch (err) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
