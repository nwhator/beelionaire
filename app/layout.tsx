import './globals.css'
import React from 'react'
import NavBar from '../components/NavBar'
import AnimatedLayout from '../components/AnimatedLayout'

export const metadata = {
  title: 'Who Wants to Be a Beelionaire',
  description: 'Gamified spelling & grammar quizzes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-[rgb(var(--text))]">
        {/* Decorative background shapes - purely visual */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <svg className="absolute left-[-10%] top-0 w-[60vw] opacity-40" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="rgba(255,179,25,0.18)" />
                <stop offset="100%" stopColor="rgba(52,200,74,0.06)" />
              </linearGradient>
            </defs>
            <g transform="translate(50,50)">
              <circle cx="200" cy="120" r="220" fill="url(#g1)" />
            </g>
          </svg>

          <svg className="absolute right-[-8%] bottom-0 w-[48vw] opacity-30" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0,0)">
              <ellipse cx="360" cy="360" rx="260" ry="180" fill="rgba(52,200,74,0.06)" />
            </g>
          </svg>
        </div>

        <NavBar />

        <main className="container py-12">
          <AnimatedLayout>{children}</AnimatedLayout>
        </main>

        <footer className="border-t py-6 mt-12 bg-white/60 backdrop-blur-sm">
          <div className="container text-center text-sm">© {new Date().getFullYear()} Beelionaire</div>
        </footer>
      </body>
    </html>
  )
}
