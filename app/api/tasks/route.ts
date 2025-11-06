import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabase-server'

export async function GET() {
  const { data: tasks } = await supabaseAdmin
    .from('Task')
    .select('*')
  
  return NextResponse.json({ tasks })
}
