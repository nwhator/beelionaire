import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase-server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const { data: profile, error } = await supabaseAdmin
      .from('User')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error

    return NextResponse.json({ profile })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, name, accountType, accountName, accountNumber, bankName, phoneNumber } = body

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('User')
      .update({
        name,
        accountType,
        accountName,
        accountNumber,
        bankName,
        phoneNumber,
        updatedAt: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, profile: data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
