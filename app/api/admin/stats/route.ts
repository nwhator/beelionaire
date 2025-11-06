import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase-server'

export async function GET() {
  try {
    // Get total users
    const { count: totalUsers } = await supabaseAdmin
      .from('User')
      .select('*', { count: 'exact', head: true })

    // Get total questions
    const { count: totalQuestions } = await supabaseAdmin
      .from('Question')
      .select('*', { count: 'exact', head: true })

    // Get total tasks
    const { count: totalTasks } = await supabaseAdmin
      .from('Task')
      .select('*', { count: 'exact', head: true })

    // Get total completions
    const { count: totalCompletions } = await supabaseAdmin
      .from('TaskCompletion')
      .select('*', { count: 'exact', head: true })

    // Get recent users
    const { data: recentUsers } = await supabaseAdmin
      .from('User')
      .select('*')
      .order('createdAt', { ascending: false })
      .limit(50)

    // Get recent completions with user info
    const { data: recentCompletions } = await supabaseAdmin
      .from('TaskCompletion')
      .select(`
        *,
        user:userId (
          username,
          email
        )
      `)
      .order('completedAt', { ascending: false })
      .limit(20)

    return NextResponse.json({
      totalUsers: totalUsers || 0,
      totalQuestions: totalQuestions || 0,
      totalTasks: totalTasks || 0,
      totalCompletions: totalCompletions || 0,
      recentUsers: recentUsers || [],
      recentCompletions: recentCompletions || [],
    })
  } catch (error: any) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
