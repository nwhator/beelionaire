"use client"
import React from 'react'
import Card from './Card'
import { motion } from 'framer-motion'

type Question = {
  id: string
  question: string
  options: string[]
}

export default function QuizCard({ question, onAnswer }: { question: Question, onAnswer: (opt: string) => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
      <Card role="region" aria-labelledby={`q-${question.id}`}>
        <div className="space-y-4">
          <div id={`q-${question.id}`} className="text-lg font-semibold">{question.question}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" role="list">
            {question.options.map((o) => (
              <button
                key={o}
                role="listitem"
                onClick={() => onAnswer(o)}
                className="text-left p-3 border rounded hover:bg-gray-50 focus-ring"
                aria-label={`Answer option: ${o}`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
