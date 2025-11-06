'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'

interface Stats {
  totalUsers: number
  totalQuestions: number
  totalTasks: number
  totalCompletions: number
  recentUsers: any[]
  recentCompletions: any[]
}

export default function AdminDashboard() {
  const router = useRouter()
  const [questions, setQuestions] = useState('')
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [stats, setStats] = useState<Stats | null>(null)
  const [activeTab, setActiveTab] = useState<'upload' | 'stats' | 'users'>('stats')

  useEffect(() => {
    // Check admin auth
    const isAdmin = localStorage.getItem('adminAuth')
    if (!isAdmin) {
      router.push('/admin/login?redirect=/admin/dashboard')
    } else {
      loadStats()
    }
  }, [router])

  const loadStats = async () => {
    try {
      const res = await fetch('/api/admin/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (err) {
      console.error('Failed to load stats:', err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin/login')
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setUploading(true)

    try {
      // Parse JSON
      const parsedQuestions = JSON.parse(questions)
      
      // Validate structure
      if (!Array.isArray(parsedQuestions)) {
        throw new Error('Questions must be an array')
      }

      // Upload to API
      const res = await fetch('/api/admin/questions/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions: parsedQuestions }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setMessage(`✅ Successfully uploaded ${data.count} questions!`)
      setQuestions('')
    } catch (err: any) {
      setError(err.message || 'Invalid JSON format')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">🔧 Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage your Beelionaire platform</p>
          </div>
          <Button onClick={handleLogout} variant="ghost">
            Logout
          </Button>
        </div>
        
        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === 'stats'
                  ? 'border-[var(--bee)] text-[var(--bee)]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📊 Statistics
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === 'users'
                  ? 'border-[var(--bee)] text-[var(--bee)]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              👥 Users
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === 'upload'
                  ? 'border-[var(--bee)] text-[var(--bee)]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 Upload Questions
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="max-w-7xl mx-auto p-4 pb-20">
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <div className="text-3xl font-bold text-[var(--bee)]">
                  {stats?.totalUsers ?? '-'}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Users</div>
              </Card>
              <Card>
                <div className="text-3xl font-bold text-[var(--duo)]">
                  {stats?.totalQuestions ?? '-'}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Questions</div>
              </Card>
              <Card>
                <div className="text-3xl font-bold text-[var(--trio)]">
                  {stats?.totalTasks ?? '-'}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Tasks</div>
              </Card>
              <Card>
                <div className="text-3xl font-bold text-green-600">
                  {stats?.totalCompletions ?? '-'}
                </div>
                <div className="text-sm text-gray-600 mt-1">Task Completions</div>
              </Card>
            </div>

            <Card>
              <h2 className="text-xl font-semibold mb-4">📈 Recent Activity</h2>
              <div className="space-y-3">
                {stats?.recentCompletions?.slice(0, 10).map((completion: any, i: number) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--bee)] bg-opacity-20 flex items-center justify-center text-sm">
                        {completion.user?.username?.[0]?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <div className="font-medium">{completion.user?.username || 'Unknown'}</div>
                        <div className="text-xs text-gray-500">completed a task</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(completion.completedAt).toLocaleDateString()}
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-8 text-gray-500">
                    No recent activity
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'users' && (
          <Card>
            <h2 className="text-xl font-semibold mb-4">👥 All Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Username</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Balance</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentUsers?.map((user: any) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{user.username}</td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className="text-[var(--bee)] font-semibold">
                          🐝 {user.balance?.toFixed(2) || '0.00'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-gray-500">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'upload' && (
          <div className="space-y-6">

            <Card>
              <h2 className="text-xl font-semibold mb-4">📝 Upload Questions (JSON)</h2>
              
              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Paste JSON array of questions
                  </label>
                  <textarea
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                    className="input w-full min-h-[300px] font-mono text-sm"
                    placeholder={`[\n  {\n    "question": "What is 2+2?",\n    "options": ["3", "4", "5", "6"],\n    "correctAnswer": "4",\n    "difficulty": "EASY",\n    "category": "Math"\n  }\n]`}
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm">
                    {message}
                  </div>
                )}

                <Button type="submit" disabled={uploading} className="w-full">
                  {uploading ? 'Uploading...' : 'Upload Questions'}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">📋 JSON Format:</h3>
                <pre className="text-xs overflow-auto">
{`[
  {
    "question": "Question text here?",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctAnswer": "Option 2",
    "difficulty": "EASY",
    "category": "General"
  }
]`}
                </pre>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
