import Link from 'next/link'

export function NavBar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-bold text-xl flex items-center gap-2">
            <span className="text-yellow-400">🐝</span>
            <span>Beelionaire</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/quiz">Play</Link>
          <Link href="/auth/login">Login</Link>
        </div>
      </div>
    </nav>
  )
}
