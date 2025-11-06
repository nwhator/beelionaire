'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'

export default function AdminDashboard() {
  const router = useRouter()
  const [questions, setQuestions] = useState('')
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Check admin auth
    const isAdmin = localStorage.getItem('adminAuth')
    if (!isAdmin) {
      router.push('/admin/login')
    }
  }, [router])

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
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">🔧 Admin Dashboard</h1>
        <Button onClick={handleLogout} variant="ghost">
          Logout
        </Button>
      </div>

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

      <Card>
        <h2 className="text-xl font-semibold mb-3">📊 Quick Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-[var(--bee)]">-</div>
            <div className="text-sm muted">Total Users</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-[var(--duo)]">-</div>
            <div className="text-sm muted">Total Questions</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
