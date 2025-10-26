export const dynamic = 'force-dynamic'

import { prisma } from '../../lib/prisma'
import TaskCard from '../../components/ui/TaskCard'
import Card from '../../components/ui/Card'

export default async function TasksPage() {
  const tasks = (await prisma.task.findMany({})) as Array<{ id: string; title: string; url: string; reward: number }>

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold">Tasks</h2>
        <div className="text-sm text-gray-500">Complete tasks to earn points</div>
      </header>

      <Card>
        <div className="space-y-3">
          {tasks.map((task) => (
            // TaskCard is a client component; pass primitives as props
            <TaskCard
              key={task.id}
              task={{ id: task.id, title: task.title, url: task.url, reward: task.reward }}
              onComplete={async (id) => {
                // POST to API to mark complete — this handler won't run on server component; it's placeholder
                await fetch('/api/tasks/complete', { method: 'POST', body: JSON.stringify({ userId: 'anonymous', taskId: id }), headers: { 'Content-Type': 'application/json' } })
                // no-op on server components; in a real app this would be a client-side action
              }}
            />
          ))}
        </div>
      </Card>
    </section>
  )
}
