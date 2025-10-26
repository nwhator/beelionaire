"use client"
import React, { useState } from 'react'
import Card from '../../../../components/ui/Card'
import Button from '../../../../components/ui/Button'

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
    <section className="space-y-6 animate-fade-up">
      <h2 className="text-3xl font-extrabold animate-pop">Upload Questions (JSON)</h2>
      <Card className="animate-pop">
        <p className="text-sm muted mb-4">Upload an array of questions. Each item should have: category, question, options (array), answer.</p>
        <input className="input" type="file" accept="application/json" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <div className="mt-4">
          <Button onClick={handle} variant="primary">Upload</Button>
        </div>
        {status && <div className="mt-3 badge-duo">{status}</div>}
      </Card>
    </section>
  )
}
