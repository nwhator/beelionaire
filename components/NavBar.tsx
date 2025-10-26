"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import Button from './ui/Button'

export default function NavBar() {
  const [open, setOpen] = useState(false)

  return (
  <header className="site-header">
      <div className="container flex items-center justify-between">
        <Link href="/" className="brand-badge">
          <span className="brand-dot" aria-hidden />
          <span className="text-lg">Beelionaire</span>
          <span className="sr-only">Home</span>
        </Link>

  <nav aria-label="Main navigation" className="hidden sm:flex items-center gap-6">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/tasks" className="nav-link">Tasks</Link>
          <Link href="/quiz" className="nav-link">Quiz</Link>
          <Link href="/dashboard" className="nav-link">Dashboard</Link>
          <Link href="/leaderboard" className="nav-link">Leaderboard</Link>
          <div>
            <button className="btn btn-pill btn-duo">Connect</button>
          </div>
        </nav>

  <div className="sm:hidden flex items-center">
          <button onClick={() => setOpen((s) => !s)} aria-label="Toggle menu" className="p-2 rounded-md bg-white/70 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} /></svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
  <div className="sm:hidden border-t bg-white/80 backdrop-blur-sm">
          <div className="container py-4 flex flex-col gap-3">
            <Link href="/" className="text-sm text-[rgb(var(--ink))]">Home</Link>
            <Link href="/tasks" className="text-sm text-[rgb(var(--ink))]">Tasks</Link>
            <Link href="/quiz" className="text-sm text-[rgb(var(--ink))]">Quiz</Link>
            <Link href="/dashboard" className="text-sm text-[rgb(var(--ink))]">Dashboard</Link>
            <Link href="/leaderboard" className="text-sm text-[rgb(var(--ink))]">Leaderboard</Link>
            <div className="pt-2">
              <button className="btn btn-duo w-full">Connect</button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
