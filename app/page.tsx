'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Handle hash-based auth redirects from Supabase emails
    if (window.location.hash.includes('access_token') || window.location.hash.includes('token_hash')) {
      router.push('/auth/callback' + window.location.hash)
    }
  }, [router])

  return (
    <main className="min-h-screen flex items-center justify-center py-20">
      <section className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="kicker">🐝 Beelionaire</div>
          <h1 className="hero-title">Who Wants to Be a Beelionaire?</h1>
          <p className="hero-sub max-w-2xl">A playful, competitive learning game. Play quick quizzes, complete tasks, earn points and climb the leaderboard — all with delightful micro-rewards.</p>

          <div className="flex items-center gap-4">
            <Link href="/auth/register" className="btn btn-primary">Sign up — it’s free</Link>
            <Link href="/auth/login" className="btn btn-ghost">Log in</Link>
          </div>

          <div className="mt-8 feature-grid">
            <div className="card tile-press">
              <div className="font-semibold">Quick quizzes</div>
              <div className="text-sm muted">Short rounds designed to be fast and fun.</div>
            </div>
            <div className="card tile-press">
              <div className="font-semibold">Earn rewards</div>
              <div className="text-sm muted">Complete tasks and redeem points for goodies.</div>
            </div>
            <div className="card tile-press">
              <div className="font-semibold">Leaderboards</div>
              <div className="text-sm muted">Compete with friends and climb the ranks.</div>
            </div>
          </div>
        </div>

        <div>
          <div className="w-full aspect-[16/10] hero hero-sm bg-gradient-to-br from-yellow-50 to-white rounded-2xl shadow-lg flex items-center justify-center">
            <div className="text-center p-6">
              <svg width="180" height="180" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4">
                <defs>
                  <linearGradient id="g2" x1="0" x2="1">
                    <stop offset="0%" stopColor="#FFE082" />
                    <stop offset="100%" stopColor="#FFB300" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="56" fill="url(#g2)" />
                <g transform="translate(0,0)">
                  <path d="M34 74c6-8 18-8 26 0" stroke="#09101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="46" y="36" width="28" height="16" rx="3" fill="#FFF" opacity="0.6" />
                </g>
              </svg>
              <div className="text-2xl font-bold">Quiz • Tasks • Rewards</div>
              <div className="mt-3 text-sm muted">Play quick rounds, complete tasks and redeem your points.</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
