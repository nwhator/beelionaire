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
      <body className="bg-gray-50">
        <NavBar />
        <main className="container py-8">
          <AnimatedLayout>{children}</AnimatedLayout>
        </main>
        <footer className="border-t py-6 mt-12 bg-white">
          <div className="container text-center text-sm">© {new Date().getFullYear()} Beelionaire</div>
        </footer>
      </body>
    </html>
  )
}
