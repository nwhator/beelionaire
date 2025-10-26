"use client"
import React, { useState } from 'react'
import TaskCard from './TaskCard'

type Task = { id: string; title: string; url: string; reward: number }

export default function TasksList({ tasks }: { tasks: Task[] }) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({})

  const handleComplete = async (id: string) => {
    try {
      const res = await fetch('/api/tasks/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'anonymous', taskId: id })
      })
      if (!res.ok) throw new Error('Failed')
      setCompleted((s) => ({ ...s, [id]: true }))
    } catch (e) {
      console.error(e)
      alert('Could not mark task complete')
    }
  }

  return (
    <div className="space-y-3">
      {tasks.map((t) => (
        <TaskCard
          key={t.id}
          task={t}
          onComplete={handleComplete}
        />
      ))}
    </div>
  )
}
