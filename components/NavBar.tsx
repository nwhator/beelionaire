"use client"
import Link from 'next/link'
import React from 'react'
import Button from './ui/Button'

export default function NavBar() {
  return (
    <header className="site-header py-4 border-b">
      <div className="container flex items-center justify-between">
        <Link href="/" className="brand-badge text-lg">
          <span className="brand-dot" aria-hidden />
          <span>Beelionaire</span>
          <span className="sr-only">Home</span>
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-6">
          <Link href="/tasks" className="text-sm text-gray-600 hover:text-brand-700">Tasks</Link>
          <Link href="/quiz" className="text-sm text-gray-600 hover:text-brand-700">Quiz</Link>
          <Link href="/dashboard" className="text-sm text-gray-600 hover:text-brand-700">Dashboard</Link>
          <Button variant="primary">Connect</Button>
        </nav>
      </div>
    </header>
  )
}
