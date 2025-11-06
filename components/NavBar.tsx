"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useAuth } from '../lib/auth-context'

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const { user, signOut, loading } = useAuth()

  return (
    <header className="site-header">
      <div className="container flex items-center justify-between">
        <Link href="/" className="brand-badge">
          <span className="brand-dot" aria-hidden />
          <span className="text-lg">Beelionaire</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden sm:flex items-center gap-4">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/about" className="nav-link">About</Link>
          
          {loading ? (
            <div className="text-sm text-gray-400">Loading...</div>
          ) : user ? (
            <>
              <Link href="/dashboard" className="nav-link">Dashboard</Link>
              <Link href="/quiz" className="nav-link">Quiz</Link>
              <Link href="/tasks" className="nav-link">Tasks</Link>
              <Link href="/leaderboard" className="nav-link">Leaderboard</Link>
              <Link href="/profile" className="nav-link">Profile</Link>
              <button onClick={signOut} className="btn btn-ghost">Logout</button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="btn btn-ghost">Login</Link>
              <Link href="/auth/register" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </nav>

        <div className="sm:hidden flex items-center">
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="sm:hidden border-t bg-white/90 backdrop-blur">
          <div className="container py-3 flex flex-col gap-2">
            <Link href="/" className="nav-link" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/about" className="nav-link" onClick={() => setOpen(false)}>About</Link>
            
            {loading ? (
              <div className="text-sm text-gray-400 p-2">Loading...</div>
            ) : user ? (
              <>
                <Link href="/dashboard" className="nav-link" onClick={() => setOpen(false)}>Dashboard</Link>
                <Link href="/quiz" className="nav-link" onClick={() => setOpen(false)}>Quiz</Link>
                <Link href="/tasks" className="nav-link" onClick={() => setOpen(false)}>Tasks</Link>
                <Link href="/leaderboard" className="nav-link" onClick={() => setOpen(false)}>Leaderboard</Link>
                <Link href="/profile" className="nav-link" onClick={() => setOpen(false)}>Profile</Link>
                <button onClick={() => { signOut(); setOpen(false); }} className="btn btn-ghost w-full mt-2">Logout</button>
              </>
            ) : (
              <div className="flex gap-2 mt-2">
                <Link href="/auth/login" className="btn btn-ghost flex-1" onClick={() => setOpen(false)}>Login</Link>
                <Link href="/auth/register" className="btn btn-primary flex-1" onClick={() => setOpen(false)}>Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
