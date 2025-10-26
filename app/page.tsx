import React from 'react'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center">
        <h1 className="text-4xl font-extrabold mb-4">Who Wants to Be a Beelionaire 🐝💰</h1>
        <p className="text-lg text-gray-700 mb-8">Play spelling & grammar quizzes, earn points, and refer friends to boost rewards.</p>
        <div className="flex justify-center gap-4">
          <a href="/auth/register" className="px-6 py-3 bg-[rgb(var(--brand))] text-black rounded-2xl font-semibold">Get Started</a>
          <a href="/quiz" className="px-6 py-3 border border-gray-200 rounded-2xl">Play Demo</a>
        </div>
      </section>
    </div>
  )
}
