"use client"
import React, { useEffect, useState } from 'react'
import QuizCard from '../../components/ui/QuizCard'
import Card from '../../components/ui/Card'

type Q = { id: string; question: string; options: string[] }

export default function QuizPage() {
  const [q, setQ] = useState<Q | null>(null)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/quiz/next-question')
    const data = await res.json()
    if (data.question) {
      const parsed = { id: data.question.id, question: data.question.question, options: JSON.parse(data.question.options) }
      setQ(parsed)
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  if (loading) return <div className="muted">Loading...</div>
  if (!q) return <div className="muted">No questions available</div>

  const handleAnswer = async (opt: string) => {
    const res = await fetch('/api/quiz/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: 'anon', questionId: q.id, answer: opt }) })
    const data = await res.json()
    alert(data.isCorrect ? 'Correct!' : 'Wrong!')
    load()
  }

  return (
    <section className="space-y-6 animate-fade-up">
      <header className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold animate-pop">Quiz</h2>
        <div className="text-sm muted">Test your knowledge — quick rounds</div>
      </header>

      <Card className="animate-pop">
        <QuizCard question={q} onAnswer={handleAnswer} />
      </Card>
    </section>
  )
}
