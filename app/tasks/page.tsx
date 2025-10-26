export const dynamic = 'force-dynamic'

import { prisma } from '../../lib/prisma'
import TasksList from '../../components/ui/TasksList'
import Card from '../../components/ui/Card'

export default async function TasksPage() {
  const tasks = (await prisma.task.findMany({})) as Array<{ id: string; title: string; url: string; reward: number }>

  return (
    <section className="space-y-6 animate-fade-up">
      <header className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold animate-pop">Tasks</h2>
        <div className="text-sm muted">Complete tasks to earn points</div>
      </header>

      <Card className="animate-pop">
        <TasksList tasks={tasks} />
      </Card>
    </section>
  )
}
