"use client"
import React from 'react'
import Card from './Card'
import Button from './Button'

type Task = {
  id: string
  title: string
  url: string
  reward: number
}

export default function TaskCard({ task, onComplete }: { task: Task, onComplete?: (id: string) => void }) {
  return (
    <Card className="flex items-center justify-between gap-4" role="article" aria-label={`Task: ${task.title}`}>
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <a href={task.url} target="_blank" rel="noreferrer" className="text-sm text-gray-500">Open task</a>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-700" aria-hidden>+{task.reward} pts</div>
        <Button onClick={() => onComplete?.(task.id)} variant="primary" aria-label={`Mark ${task.title} complete`}>Mark done</Button>
      </div>
    </Card>
  )
}
