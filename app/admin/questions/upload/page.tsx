"use client"
import React, { useState } from 'react'

export default function UploadQuestionsPage() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  const handle = async () => {
    if (!file) return
    const text = await file.text()
    try {
      const data = JSON.parse(text)
      const res = await fetch('/api/admin/questions/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ questions: data }) })
      const j = await res.json()
      if (j.ok) setStatus('Uploaded successfully')
      else setStatus('Upload failed')
    } catch (err) {
      setStatus('Invalid JSON')
    }
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Upload Questions (JSON)</h2>
      <p className="text-sm text-gray-500 mb-4">Upload an array of questions. Each item should have: category, question, options (array), answer.</p>
      <input type="file" accept="application/json" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <div className="mt-4">
        <button onClick={handle} className="px-4 py-2 rounded-2xl bg-[rgb(var(--brand))]">Upload</button>
      </div>
      {status && <div className="mt-3">{status}</div>}
    </section>
  )
}
