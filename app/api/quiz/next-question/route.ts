import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET() {
  // Simple next-question stub: return a random question from DB
  try {
    // Return the first available question. `Question` model does not have createdAt field.
    const question = await prisma.question.findFirst({
      orderBy: { id: 'asc' },
    })
    return NextResponse.json({ question })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
