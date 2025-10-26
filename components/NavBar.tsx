"use client"
import Link from 'next/link'
import React from 'react'
import Button from './ui/Button'

export default function NavBar() {
  return (
    <div className="py-3 border-b bg-white">
      <div className="container flex items-center justify-between">
        <Link href="/" className="font-bold">Beelionaire 🐝</Link>
        <div className="flex items-center gap-4">
          <Link href="/tasks" className="text-sm">Tasks</Link>
          <Link href="/quiz" className="text-sm">Quiz</Link>
          <Link href="/dashboard" className="text-sm">Dashboard</Link>
          <Button variant="ghost">Connect</Button>
        </div>
      </div>
    </div>
  )
}
